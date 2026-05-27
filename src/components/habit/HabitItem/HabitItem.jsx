import styles from "./HabitItem.module.css";
import trashIcon from "../../../assets/icons/ic_trash.png";

function HabitItem({ children, onDelete, onClickItem }) {
  return (
    <div className={styles.wrapper}>
      {/* 습관 텍스트 박스 클릭하면 수정 모드로 바뀌게 연결 */}
      <div className={styles.item} onClick={onClickItem}>
        {children}
      </div>

      {/* 오른쪽 휴지통 아이콘 */}
      <button className={styles.deleteButton} onClick={onDelete}>
        <img src={trashIcon} alt="삭제" className={styles.icon} />
      </button>
    </div>
  );
}

export default HabitItem;
