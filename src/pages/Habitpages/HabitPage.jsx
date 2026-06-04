import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./HabitPage.module.css";
import GNB from "../../components/common/GNB/GNB";
import HabitSection from "./HabitSection/HabitSection";
import HabitEditModal from "./HabitEditModal/HabitEditModal";
import icArrowRight from "../../assets/icons/ic_arrow_right.png";

function HabitPage() {
  const { studyId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  // 1. 프론트엔드 하드코딩 데이터 제거 및 초기값 빈 배열 설정
  const [habits, setHabits] = useState([]);

  // 2. 당일 습관 조회 API 연동 (GET)
  const fetchHabits = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/studies/${studyId}/habits`,
      );
      if (response.ok) {
        const data = await response.json();
        setHabits(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 3. 페이지 최초 렌더링 시 습관 목록 불러오기
  useEffect(() => {
    if (studyId) {
      fetchHabits();
    }
  }, [studyId]);

  // 4. 당일 습관 달성 상태 업데이트 API 연동 (PATCH)
  const handleToggleHabit = async (habitId) => {
    // 4-1. 클릭한 습관의 현재 로그 데이터 찾기
    const targetHabit = habits.find((h) => h.id === habitId);
    if (
      !targetHabit ||
      !targetHabit.habitLogs ||
      targetHabit.habitLogs.length === 0
    )
      return;

    // 백엔드 필드명 통일: isCompleted -> isChecked
    const targetLog = targetHabit.habitLogs[0];
    const newIsChecked = !targetLog.isChecked;

    try {
      const response = await fetch(
        `http://localhost:3000/api/habits/${habitId}/logs`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isChecked: newIsChecked }),
        },
      );

      if (response.ok) {
        // 4-2. 서버 통신 성공 시 로컬 상태 업데이트
        setHabits((prevHabits) =>
          prevHabits.map((habit) =>
            habit.id === habitId
              ? {
                  ...habit,
                  habitLogs: [
                    { ...habit.habitLogs[0], isChecked: newIsChecked },
                  ],
                }
              : habit,
          ),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 5. 모달 수정 완료 시 일괄 API 처리 로직
  const handleSaveHabits = async (editHabits) => {
    // 5-1. 삭제된 습관 찾기 (기존 habits에는 있으나 editHabits에는 없는 객체)
    const deletedHabits = habits.filter(
      (h) => !editHabits.find((e) => e.id === h.id),
    );

    // 5-2. 새로 추가된 습관 찾기 (임시 ID 식별자를 가진 객체)
    const addedHabits = editHabits.filter((e) =>
      String(e.id).startsWith("new-"),
    );

    // 5-3. 이름이 수정된 습관 찾기 (임시 ID가 아니며 기존과 title이 다른 객체)
    const modifiedHabits = editHabits.filter((e) => {
      if (String(e.id).startsWith("new-")) return false;
      const original = habits.find((h) => h.id === e.id);
      return original && original.title !== e.title;
    });

    try {
      // 5-4. 습관 종료 API 호출 (PATCH)
      await Promise.all(
        deletedHabits.map((h) =>
          fetch(`http://localhost:3000/api/habits/${h.id}/end`, {
            method: "PATCH",
          }),
        ),
      );

      // 5-5. 신규 습관 생성 API 호출 (POST)
      await Promise.all(
        addedHabits.map((h) =>
          fetch(`http://localhost:3000/api/studies/${studyId}/habits`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: h.title }),
          }),
        ),
      );

      // 5-6. 습관 이름 수정 API 호출 (PATCH)
      await Promise.all(
        modifiedHabits.map((h) =>
          fetch(`http://localhost:3000/api/habits/${h.id}/name`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: h.title }),
          }),
        ),
      );

      // 5-7. 모든 통신 완료 후 최신 데이터 재조회 및 모달 닫기
      await fetchHabits();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.layout}>
      <GNB showButton={false} showBorder={false} />

      <main className={styles.main}>
        <article className={styles.card}>
          <header className={styles.header}>
            <div className={styles.titleGroup}>
              <h1 className={styles.title}>연우의 개발공장</h1>
              <div className={styles.timeInfo}>
                <span className={styles.timeLabel}>현재 시간</span>
                <span className={styles.timeValue}>2024-01-04 오후 3:06</span>
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
              <Link to="/" className={styles.navBtn}>
                홈
                <img
                  src={icArrowRight}
                  alt="이동"
                  className={styles.arrowIcon}
                />
              </Link>
            </div>
          </header>

          <HabitSection
            habits={habits}
            onOpenEdit={() => setIsModalOpen(true)}
            onToggle={handleToggleHabit}
          />
        </article>
      </main>

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
