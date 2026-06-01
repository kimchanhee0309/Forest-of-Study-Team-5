import styles from "./HabitSection.module.css";
import Chip from "../../../components/common/Chip/Chip";

function HabitSection({ habits, onOpenEdit, onToggle }) {
  const isEmpty = habits.length === 0;

  return (
    <section className={styles.sectionContainer}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>오늘의 습관</h2>
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
            <li key={habit.id} className={styles.habitItem}>
              <Chip
                completed={habit.isCompleted}
                onClick={() => onToggle(habit.id)}
              >
                {habit.title}
              </Chip>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default HabitSection;
