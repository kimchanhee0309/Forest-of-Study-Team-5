import styles from "./StartStopButton.module.css";
import playIcon from "../../../assets/icons/ic_play.png";
import stopIcon from "../../../assets/icons/ic_stop.png";

function StartStopButton({ variant = "start", onClick }) {
  const isStop = variant === "stop";
  const isInactive = variant === "inactive";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.button} ${isInactive ? styles.inactive : styles.active}`}
    >
      <img src={isStop ? stopIcon : playIcon} alt={isStop ? "stop" : "play"} className={styles.icon} />
      {isStop ? "Stop!" : "Start!"}
    </button>
  );
}

export default StartStopButton;
