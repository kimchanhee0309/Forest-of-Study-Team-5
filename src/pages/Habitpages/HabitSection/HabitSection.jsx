import styles from "./HabitSection.module.css";

function HabitSection({ habits, onOpenEdit }) {
  const isEmpty = habits.length === 0;

  return (
    <section className={styles.sectionContainer}>
      <header className={styles.sectionHeader}>
        {/* ✨ 불필요한 빈 div 제거 완료! */}
        <h2 className={styles.sectionTitle}>오늘의 습관</h2>

        {/* ✨ 버튼을 감싸던 container div를 지우고 버튼만 깔끔하게 노출! */}
        <button className={styles.editButton} onClick={onOpenEdit}>
          목록 수정
        </button>
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
