import styles from "./HabitTable.module.css";

const WEEK_DAYS = ["월", "화", "수", "목", "금", "토", "일"];

function HabitTableHeader() {
  return (
    <div className={styles.table_header}>
      <div className={styles.empty_cell}></div>

      {WEEK_DAYS.map((day) => (
        <div key={day} className={styles.day}>
          {day}
        </div>
      ))}
    </div>
  );
}

export default HabitTableHeader;
