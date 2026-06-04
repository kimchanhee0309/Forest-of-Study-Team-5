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
  const [habits, setHabits] = useState([]); // 가짜 데이터 지우고 빈 배열로 시작!

  // 1. 당일 습관 조회 (GET) - 백엔드에서 데이터 가져오기
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
      console.error("데이터 불러오기 실패:", error);
    }
  };

  // 페이지 켜지면 무조건 한 번 데이터 가져오기
  useEffect(() => {
    if (studyId) fetchHabits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studyId]);

  // 2. 당일 습관 달성(체크) 업데이트 (PATCH)
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
      const response = await fetch(
        `http://localhost:3000/api/habits/${habitId}/logs`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isChecked: !currentCheck }),
        },
      );

      if (response.ok) {
        // 백엔드 성공하면 화면(프론트)도 실시간으로 체크 상태 뒤집어주기
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

  // 3. 모달에서 수정 완료 시 (추가/수정/삭제) 일괄 처리
  const handleSaveHabits = async (editHabits) => {
    // 삭제된 애들 (기존엔 있었는데 editHabits엔 없는 놈)
    const deleted = habits.filter(
      (h) => !editHabits.find((e) => e.id === h.id),
    );
    // 새로 추가된 애들 (id가 "new-" 로 시작하는 임시 놈)
    const added = editHabits.filter((e) => String(e.id).startsWith("new-"));
    // 이름이 수정된 애들
    const modified = editHabits.filter((e) => {
      if (String(e.id).startsWith("new-")) return false;
      const original = habits.find((h) => h.id === e.id);
      return original && original.title !== e.title;
    });

    try {
      // 삭제 API (PATCH - end)
      await Promise.all(
        deleted.map((h) =>
          fetch(`http://localhost:3000/api/habits/${h.id}/end`, {
            method: "PATCH",
          }),
        ),
      );
      // 추가 API (POST)
      await Promise.all(
        added.map((h) =>
          fetch(`http://localhost:3000/api/studies/${studyId}/habits`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: h.title }),
          }),
        ),
      );
      // 수정 API (PATCH - name)
      await Promise.all(
        modified.map((h) =>
          fetch(`http://localhost:3000/api/habits/${h.id}/name`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: h.title }),
          }),
        ),
      );

      // 다 끝났으면 최신 데이터로 새로고침!
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
