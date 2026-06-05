import styles from "./HabitItem.module.css";
import trashIcon from "../../../assets/icons/ic_trash.png";

// 재사용 가능한 UI 컴포넌트로 분리. 프롭스로 children(내용)과 이벤트를 받아옴
function HabitItem({ children, onDelete, onClickItem }) {
  return (
    <div className={styles.wrapper}>
      {/* 습관 텍스트 영역을 클릭하면 부모 컴포넌트에서 넘겨준 수정 모드 함수가 실행됨 */}
      <div className={styles.item} onClick={onClickItem}>
        {children}
      </div>

      <button className={styles.deleteButton} onClick={onDelete}>
        <img src={trashIcon} alt="삭제" className={styles.icon} />
      </button>
    </div>
  );
}

export default HabitItem;
