import { useState } from "react";
import styles from "./HabitPage.module.css";

// 공용 GNB 컴포넌트 불러오기
import GNB from "../../components/common/GNB/GNB";

// 하위 컴포넌트들
import HabitSection from "./HabitSection/HabitSection";
import HabitEditModal from "./HabitEditModal/HabitEditModal";

import icArrowRight from "../../assets/icons/ic_arrow_right.png";

function HabitPage() {
  // 모달창 열림/닫힘 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 습관 목록 데이터 (나중에 서버에서 받아오게 수정해야 함)
  const [habits, setHabits] = useState([
    { id: 1, title: "미라클모닝 6시 기상", isCompleted: true },
    { id: 2, title: "아침 챙겨 먹기", isCompleted: true },
    { id: 3, title: "React 스터디 책 1챕터 읽기", isCompleted: false },
    { id: 4, title: "스트레칭", isCompleted: false },
    { id: 5, title: "영양제 챙겨 먹기", isCompleted: false },
    { id: 6, title: "사이드 프로젝트", isCompleted: false },
    { id: 7, title: "물 2L 먹기", isCompleted: false },
  ]);

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
              <button className={styles.navBtnActive}>
                오늘의 집중
                <img
                  src={icArrowRight}
                  alt="이동"
                  className={styles.arrowIcon}
                />
              </button>
              <button className={styles.navBtn}>
                홈
                <img
                  src={icArrowRight}
                  alt="이동"
                  className={styles.arrowIcon}
                />
              </button>
            </div>
          </header>

          <HabitSection
            habits={habits}
            onOpenEdit={() => setIsModalOpen(true)}
          />
        </article>
      </main>

      {/* 목록 수정 버튼 누르면 모달창 띄우기 */}
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
