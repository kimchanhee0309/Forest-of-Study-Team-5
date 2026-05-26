import styles from "./HabitTable.module.css";

import HabitTableHeader from "./HabitTableHeader";
import HabitTableRow from "./HabitTableRow";

function HabitTable({ habits }) {
  if (habits.length === 0) {
    return (
      <div className={styles.empty_state}>
        <span>
          아직 습관이 없어요
          <br />
          오늘의 습관에서 습관을 생성해보세요
        </span>
      </div>
    );
  }

  return (
    <div className={styles.habit_table}>
      {/* 요일 */}
      <HabitTableHeader />

      {/* 습관 기록표 타이틀과 진행도 */}
      <div className={styles.table_body}>
        {habits.map((habit) => (
          <HabitTableRow key={habit.id} title={habit.title} logs={habit.logs} />
        ))}
      </div>
    </div>
  );
}

export default HabitTable;
