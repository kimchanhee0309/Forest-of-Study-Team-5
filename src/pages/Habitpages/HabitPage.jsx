import { useState } from "react";
//  1. 기존 Link에 더해서 'useParams'도 같이 불러오기
import { Link, useParams } from "react-router-dom";
import styles from "./HabitPage.module.css";
import GNB from "../../components/common/GNB/GNB";
import HabitSection from "./HabitSection/HabitSection";
import HabitEditModal from "./HabitEditModal/HabitEditModal";
import icArrowRight from "../../assets/icons/ic_arrow_right.png";

function HabitPage() {
  // 2. 현재 접속 주소창에서 스터디 번호(studyId) 뽑아내기.
  const { studyId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habits, setHabits] = useState([
    { id: 1, title: "미라클모닝 6시 기상", isCompleted: true },
    { id: 2, title: "아침 챙겨 먹기", isCompleted: true },
    { id: 3, title: "React 스터디 책 1챕터 읽기", isCompleted: false },
    { id: 4, title: "스트레칭", isCompleted: false },
    { id: 5, title: "영양제 챙겨 먹기", isCompleted: false },
    { id: 6, title: "사이드 프로젝트", isCompleted: false },
    { id: 7, title: "물 2L 먹기", isCompleted: false },
  ]);

  const handleToggleHabit = (id) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id ? { ...habit, isCompleted: !habit.isCompleted } : habit,
      ),
    );
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
              {/*  3. 백틱(`)을 사용 뽑아온 studyId 주소 중간 끼워넣기 */}
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

              {/* 메인 페이지는 루트("/")이므로 변수 없이 고정 */}
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
          onSave={(updatedHabits) => {
            setHabits(updatedHabits);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default HabitPage;
