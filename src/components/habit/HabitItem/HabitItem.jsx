import styles from "./HabitItem.module.css";
import trashIcon from "../../../assets/icons/ic_trash.png";

/**
 * [공용 컴포넌트] HabitItem
 * 메인 화면의 습관 리스트 및 모달창의 수정 리스트에서 공용으로 사용하는 한 줄(Row) 컴포넌트입니다.
 * * @param {React.ReactNode} children - 박스 내부에 들어갈 콘텐츠 (텍스트 span 또는 입력창 input)
 * @param {Function} onDelete - 우측 휴지통 버튼을 클릭했을 때 실행할 삭제 함수
 * @param {Function} onClickItem - 회색 박스 자체를 클릭했을 때 실행할 함수 (수정 모드 전환용)
 */
function HabitItem({ children, onDelete, onClickItem }) {
  return (
    <div className={styles.wrapper}>
      {/*  클릭 시 수정 모드로 변경될 수 있도록 이벤트 바인딩 및 children 주입 */}
      <div className={styles.item} onClick={onClickItem}>
        {children}
      </div>

      {/*  개별 습관 삭제를 위한 휴지통 버튼 구역 */}
      <button className={styles.deleteButton} onClick={onDelete}>
        <img src={trashIcon} alt="삭제" className={styles.icon} />
      </button>
    </div>
  );
}

export default HabitItem;
