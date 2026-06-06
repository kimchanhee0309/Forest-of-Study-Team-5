import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./HabitPage.module.css";
import GNB from "../../components/common/GNB/GNB";
import HabitSection from "./HabitSection/HabitSection";
import HabitEditModal from "./HabitEditModal/HabitEditModal";
import icArrowRight from "../../assets/icons/ic_arrow_right.png";
import { BASE_URL } from "../../constants/api.js";

function HabitPage() {
  // react-router-dom의 useParams 훅을 사용하여 URL 파라미터에서 스터디 고유 ID를 추출
  const { studyId } = useParams();

  // 모달창의 활성화 상태와 API로 받아올 데이터를 상태(State)로 관리합니다.
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habits, setHabits] = useState([]);
  const [studyInfo, setStudyInfo] = useState({ nickname: "", title: "" });

  // 클라이언트 측에서 렌더링할 현재 시간 상태
  const [currentTime, setCurrentTime] = useState("");

  // 자바스크립트 내장 객체인 Date를 활용하여 현재 시간을 특정 포맷(YYYY-MM-DD 오전/오후 HH:MM)으로 가공하는 유틸 함수
  const formatCurrentTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "오후" : "오전";

    // 12시간제 표기를 위한 나머지 연산 처리
    hours = hours % 12 || 12;
    return `${year}-${month}-${day} ${ampm} ${hours}:${minutes}`;
  };

  // 백엔드 REST API를 호출하여 스터디방의 기본 정보(닉네임, 타이틀)를 가져오는 비동기 함수
  const fetchStudyInfo = async () => {
    try {
      const response = await fetch(`${BASE_URL}/studies/${studyId}`);
      if (response.ok) {
        const data = await response.json();
        setStudyInfo({
          nickname: data.nickname || "",
          title: data.title || "",
        });
      }
    } catch (error) {
      console.error("스터디 정보 불러오기 실패:", error);
    }
  };

  // 현재 진행 중인 습관 목록 데이터를 가져오는 비동기 함수
  const fetchHabits = async () => {
    try {
      const response = await fetch(`${BASE_URL}/studies/${studyId}/habits`);
      if (response.ok) {
        const data = await response.json();
        setHabits(data);
      }
    } catch (error) {
      console.error("습관 데이터 불러오기 실패:", error);
    }
  };

  // 컴포넌트 마운트 시점에 데이터를 초기화하고, setInterval을 활용해 1분마다 현재 시간을 갱신
  useEffect(() => {
    if (studyId) {
      fetchStudyInfo();
      fetchHabits();
    }

    setCurrentTime(formatCurrentTime());
    const timer = setInterval(() => {
      setCurrentTime(formatCurrentTime());
    }, 60000);

    // 컴포넌트 언마운트 시 타이머가 계속 동작하는 메모리 누수(Memory Leak)를 방지하기 위해 클린업 함수를 반환
    return () => clearInterval(timer);
  }, [studyId]);

  // 습관 완료 체크박스 클릭 시 실행되며, 백엔드 상태를 업데이트하는 PATCH 요청 함수
  const handleToggleHabit = async (habitId) => {
    const targetHabit = habits.find((h) => h.id === habitId);
    if (
      !targetHabit ||
      !targetHabit.habitLogs ||
      targetHabit.habitLogs.length === 0
    )
      return;

    const currentCheck = targetHabit.habitLogs[0].isChecked;

    try {
      const response = await fetch(`${BASE_URL}/habits/${habitId}/logs`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isChecked: !currentCheck }),
      });

      // 서버 요청이 성공 시 프론트엔드의 상태도 즉시 업데이트 UX 구현
      if (response.ok) {
        setHabits((prev) =>
          prev.map((h) =>
            h.id === habitId
              ? {
                  ...h,
                  habitLogs: [{ ...h.habitLogs[0], isChecked: !currentCheck }],
                }
              : h,
          ),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 모달창에서 변경된 습관 데이터(추가, 수정, 삭제)를 백엔드에 일괄 동기화하는 함수
  const handleSaveHabits = async (editHabits) => {
    // Array.prototype.filter 사용 기존 배열과 수정된 배열을 비교해 상태 변화를 감지
    const deleted = habits.filter(
      (h) => !editHabits.find((e) => e.id === h.id),
    );
    const added = editHabits.filter((e) => String(e.id).startsWith("new-"));
    const modified = editHabits.filter((e) => {
      if (String(e.id).startsWith("new-")) return false;
      const original = habits.find((h) => h.id === e.id);
      return original && original.title !== e.title;
    });

    try {
      // Promise.all을 활용 다수의 비동기 네트워크 요청 병렬로 처리 응답 대기 시간 최소화
      await Promise.all(
        deleted.map((h) =>
          fetch(`${BASE_URL}/habits/${h.id}/end`, {
            method: "PATCH",
          }),
        ),
      );
      await Promise.all(
        added.map((h) =>
          fetch(`${BASE_URL}/studies/${studyId}/habits`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: h.title }),
          }),
        ),
      );
      await Promise.all(
        modified.map((h) =>
          fetch(`${BASE_URL}/habits/${h.id}/name`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: h.title }),
          }),
        ),
      );

      // 데이터베이스 동기화 완료시 최신 목록을 다시 불러오고 모달 닫음
      await fetchHabits();
      setIsModalOpen(false);
    } catch (error) {
      console.error("저장 실패:", error);
    }
  };

  return (
    <div className={styles.layout}>
      <GNB showButton={false} showBorder={false} />

      <main className={styles.main}>
        <article className={styles.card}>
          <header className={styles.header}>
            <div className={styles.titleGroup}>
              <h1 className={styles.title}>
                {studyInfo.nickname && studyInfo.title
                  ? `${studyInfo.nickname}의 ${studyInfo.title}`
                  : "스터디 정보를 불러오는 중..."}
              </h1>
              <div className={styles.timeInfo}>
                <span className={styles.timeLabel}>현재 시간</span>
                <div className={styles.timeValue}>{currentTime}</div>
              </div>
            </div>

            <div className={styles.navButtons}>
              <Link
                to={`/studies/${studyId}/focus`}
                className={styles.navBtnActive}
              >
                오늘의 집중
                <img
                  src={icArrowRight}
                  alt="이동"
                  className={styles.arrowIcon}
                />
              </Link>
              <Link to={`/studies/${studyId}`} className={styles.navBtnActive}>
                돌아가기
                <img
                  src={icArrowRight}
                  alt="이동"
                  className={styles.arrowIcon}
                />
              </Link>
            </div>
          </header>

          {/* 자식 컴포넌트인 HabitSection에 데이터와 이벤트 핸들러를 Props로 전달 */}
          <HabitSection
            habits={habits}
            onOpenEdit={() => setIsModalOpen(true)}
            onToggle={handleToggleHabit}
          />
        </article>
      </main>

      {/* 논리 연산자(&&)를 이용한 조건부 렌더링으로, 상태가 true일 때만 모달 컴포넌트를 마운트 */}
      {isModalOpen && (
        <HabitEditModal
          habits={habits}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveHabits}
        />
      )}
    </div>
  );
}

export default HabitPage;
