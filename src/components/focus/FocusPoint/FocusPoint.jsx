import styles from "./FocusPoint.module.css";
import pointIcon from "../../../assets/icons/ic_point.png";

function FocusPoint({ totalPoint = 0 }) {
  return (
    <div className={styles.wrapper}>
      <img src={pointIcon} alt="포인트" className={styles.icon} />
      <span className={styles.point}>{totalPoint}점</span>
    </div>
  );
}

export default FocusPoint;