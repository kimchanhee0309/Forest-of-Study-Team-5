import styles from "./TimerButton.module.css";
import pauseIcon from "../../../assets/icons/ic_pause.png";
import restartIcon from "../../../assets/icons/ic_restart.png";

function TimerButton({
  type = "restart",
  active = true,
  size = "large",
  onClick,
}) {
  const icon = type === "pause" ? pauseIcon : restartIcon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.button} ${active ? styles.active : styles.disabled} ${styles[size]}`}
    >
      <img src={icon} alt={type} className={styles.icon} />
    </button>
  );
}

export default TimerButton;
