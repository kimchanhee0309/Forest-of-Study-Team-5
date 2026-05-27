import styles from "./HabitSection.module.css";

function HabitSection({ habits, onOpenEdit }) {
  // 습관 목록이 비어있는지 확인
  const isEmpty = habits.length === 0;

  return (
    <section className={styles.sectionContainer}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>오늘의 습관</h2>
        <button className={styles.editButton} onClick={onOpenEdit}>
          목록 수정
        </button>
      </header>

      {/* 습관이 없을 때 보여줄 안내 문구 */}
      {isEmpty ? (
        <div className={styles.emptyState}>
          <p>아직 습관이 없어요</p>
          <p>목록 수정을 눌러 습관을 생성해보세요</p>
        </div>
      ) : (
        <ul className={styles.habitList}>
          {/* 배열 돌면서 습관 리스트 화면에 그리기 */}
          {habits.map((habit) => (
            <li
              key={habit.id}
              className={`${styles.habitItem} ${
                habit.isCompleted ? styles.completed : styles.incomplete
              }`}
            >
              {habit.title}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default HabitSection;
