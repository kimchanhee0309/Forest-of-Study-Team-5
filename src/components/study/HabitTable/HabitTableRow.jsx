import styles from "./HabitTable.module.css";

import Sticker from "../../common/Sticker/Sticker.jsx";

function HabitTableRow({ title, logs }) {
  return (
    //습관 기록표 타이틀
    <div className={styles.table_row}>
      <div className={styles.table_title}>
        <span className={styles.habitTitle}>{title}</span>
      </div>

      {/* 활성화 여부에 따른 스티커 반응 */}
      {logs.map((checked, index) => (
        <div key={index} className={styles.check_cell}>
          <Sticker checked={checked} color="pink" size="medium" />
        </div>
      ))}
    </div>
  );
}

export default HabitTableRow;
