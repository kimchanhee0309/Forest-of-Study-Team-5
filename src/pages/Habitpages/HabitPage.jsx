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
  const [habits, setHabits] = useState([]);
  const [studyInfo, setStudyInfo] = useState({ nickname: "", title: "" });

  const [currentTime, setCurrentTime] = useState("");

  const formatCurrentTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "오후" : "오전";

    hours = hours % 12 || 12;
    return `${year}-${month}-${day} ${ampm} ${hours}:${minutes}`;
  };

  const fetchStudyInfo = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/studies/${studyId}`,
      );
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
      console.error("습관 데이터 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    if (studyId) {
      fetchStudyInfo();
      fetchHabits();
    }

    setCurrentTime(formatCurrentTime());
    const timer = setInterval(() => {
      setCurrentTime(formatCurrentTime());
    }, 60000);

    return () => clearInterval(timer);
  }, [studyId]);

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

  const handleSaveHabits = async (editHabits) => {
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
      await Promise.all(
        deleted.map((h) =>
          fetch(`http://localhost:3000/api/habits/${h.id}/end`, {
            method: "PATCH",
          }),
        ),
      );
      await Promise.all(
        added.map((h) =>
          fetch(`http://localhost:3000/api/studies/${studyId}/habits`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: h.title }),
          }),
        ),
      );
      await Promise.all(
        modified.map((h) =>
          fetch(`http://localhost:3000/api/habits/${h.id}/name`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: h.title }),
          }),
        ),
      );

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
