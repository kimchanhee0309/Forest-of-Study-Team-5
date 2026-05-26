import styles from "./HabitSection.module.css";

function HabitSection({ habits, onOpenEdit }) {
  const isEmpty = habits.length === 0;

  return (
    <section className={styles.sectionContainer}>
      <header className={styles.sectionHeader}>
        <div /> {/* 그리드 비율을 맞추기 위한 빈 공간 */}
        <h2 className={styles.sectionTitle}>오늘의 습관</h2>
        <div className={styles.editButtonContainer}>
          <button className={styles.editButton} onClick={onOpenEdit}>
            목록 수정
          </button>
        </div>
      </header>

      {isEmpty ? (
        <div className={styles.emptyState}>
          <p>아직 습관이 없어요</p>
          <p>목록 수정을 눌러 습관을 생성해보세요</p>
        </div>
      ) : (
        <ul className={styles.habitList}>
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
