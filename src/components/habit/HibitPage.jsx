import { useState } from "react"; // 이 줄이 있어야 useState를 쓸 수 있어요!
import styles from "./HabitPage.module.css";
import GNB from "../common/GNB/GNB";
import HabitSection from "./HabitSection/HabitSection";
import HabitEditModal from "./HabitEditModal/HabitEditModal";

function HabitPage() {
  // 모달창 열림/닫힘 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 임시 습관 데이터 (setHabits를 추가하여 모달창에서 수정한 데이터가 반영되도록 합니다)
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
      <GNB onCreateStudy={() => console.log("스터디 만들기 클릭!")} />

      <main className={styles.main}>
        {/* 메인 하얀색 카드 */}
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
              <button className={styles.navBtnActive}>오늘의 집중 &gt;</button>
              <button className={styles.navBtn}>홈 &gt;</button>
            </div>
          </header>

          {/* 습관 리스트 섹션 컴포넌트 삽입 (모달 열기 함수 전달) */}
          <HabitSection
            habits={habits}
            onOpenEdit={() => setIsModalOpen(true)}
          />
        </article>
      </main>

      {/* 모달창이 true일 때만 렌더링 (onSave 속성을 추가해 모달의 변경 내용을 저장합니다) */}
      {isModalOpen && (
        <HabitEditModal
          habits={habits}
          onClose={() => setIsModalOpen(false)}
          onSave={(updatedHabits) => {
            setHabits(updatedHabits); // 1. 수정된 습관 리스트로 메인 데이터 업데이트
            setIsModalOpen(false); // 2. 모달창 닫기
          }}
        />
      )}
    </div>
  );
}

export default HabitPage;
