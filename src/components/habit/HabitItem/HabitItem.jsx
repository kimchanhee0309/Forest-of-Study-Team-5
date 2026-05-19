import styles from "./HabitItem.module.css";

import trashIcon from "../../../assets/icons/ic_trash.png";

function HabitItem({ text, onDelete }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.item}>{text}</div>

      <button className={styles.deleteButton} onClick={onDelete}>
        <img src={trashIcon} alt="삭제" className={styles.icon} />
      </button>
    </div>
  );
}

export default HabitItem;
