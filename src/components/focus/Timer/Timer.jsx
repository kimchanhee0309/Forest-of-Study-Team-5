import styles from "./Timer.module.css";
//import timerIcon from "../../../assets/icons/ic_timer.png";

function Timer({ remainSeconds = 0, status = "idle", targetTime = "00:00" }) {

  function formatMMSS(totalSeconds) {
    const isNegative = totalSeconds < 0;
    const abs = Math.abs(totalSeconds);
    const mm = String(Math.floor(abs / 60)).padStart(2, "0");
    const ss = String(abs % 60).padStart(2, "0");
    return isNegative ? `-${mm}:${ss}` : `${mm}:${ss}`;
  }

  const display = status === "idle" ? targetTime : formatMMSS(remainSeconds);

  const colorClass =
    status === "negative" ? styles.negative :
    status === "running"  ? styles.running :
    styles.idle;

  return (
    <div className={styles.wrapper}>
      {status !== "idle" && (
        <p className={styles.targetLabel}>
          {/* <img src={timerIcon} alt="timer" className={styles.targetIcon} /> */}
          {targetTime}
        </p>
      )}
      <div className={`${styles.timer} ${colorClass}`}>
        {display}
      </div>
    </div>
  );
}

export default Timer;