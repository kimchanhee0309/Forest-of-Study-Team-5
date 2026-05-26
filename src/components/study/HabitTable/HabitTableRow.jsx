import styles from "./HabitTable.module.css";

import { Sticker } from "../../common/Sticker/Sticker.jsx";

function HabitTableRow({ title, logs }) {
  return (
    <div className={styles.table_row}>
      <div className={styles.table_title}>
        <span className={styles.habitTitle}>{title}</span>
      </div>

      {logs.map((checked, index) => (
        <div key={index} className={styles.check_cell}>
          <Sticker checked={checked} color="pink" size="medium" />
        </div>
      ))}
    </div>
  );
}

export default HabitTableRow;
