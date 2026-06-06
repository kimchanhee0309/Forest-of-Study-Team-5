import styles from "./HabitSection.module.css";
import Chip from "../../../components/common/Chip/Chip";

function HabitSection({ habits, onOpenEdit, onToggle }) {
  // habits 배열의 길이를 확인해서 비어있는지 판단. 조건부 렌더링에 사용.
  const isEmpty = habits.length === 0;

  return (
    <section className={styles.sectionContainer}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>오늘의 습관</h2>
        <button className={styles.editButton} onClick={onOpenEdit}>
          목록 수정
        </button>
      </header>

      {/* 데이터가 없을 때는 안내 문구를, 있을 때는 map 함수로 리스트를 렌더링하는 삼항 연산자 */}
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
                // 배열에 값이 없을 경우 에러가 나지 않도록 옵셔널 체이닝(?.)을 사용하여 안전하게 접근
                completed={habit.habitLogs?.[0]?.isChecked || false}
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
