import Timer from "../../components/focus/Timer/Timer";
import FocusPoint from "../../components/focus/FocusPoint/FocusPoint";
import TimerButton from "../../components/common/TimerButton/TimerButton";
import StartStopButton from "../../components/common/StartStopButton/StartStopButton";
import Toast from "../../components/common/Toast/Toast";
import arrowRightIcon from "../../assets/icons/ic_arrow_right.png";
import styles from "./FocusPage.module.css";

function FocusPage({
  nickname = "닉네임",
  title = "스터디명",
  studyDescription = "현재까지 획득한 포인트",
  targetTime = "25:00",
  totalPoint = 0,
  status = "idle",
  remainSeconds = 0,
  toast = null,
  onStart,
  onPause,
  onRestart,
  onStop,
  onHabit,
  onHome,
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
      {/* 상단 스터디 정보 */}
      <div className={styles.studyInfo}>
        <div className={styles.studyHeader}>
          <h2 className={styles.studyName}>{nickname}의 {title}</h2>
          <div className={styles.navButtons}>
            <button className={styles.navButton} onClick={onHabit}>
              오늘의 습관 <img src={arrowRightIcon} alt="arrow" className={styles.navIcon} />
            </button>
            <button className={styles.navButton} onClick={onHome}>
              홈 <img src={arrowRightIcon} alt="arrow" className={styles.navIcon} />
            </button>
          </div>
        </div>
        <p className={styles.studyDescription}>{studyDescription}</p>
        <FocusPoint totalPoint={totalPoint} />
      </div>

      {/* 중앙 타이머 + 버튼 영역 */}
      <div className={styles.timerSection}>
        <h1 className={styles.title}>오늘의 집중</h1>
        <Timer
          remainSeconds={remainSeconds}
          status={status}
          targetTime={targetTime}
        />

        {status === "idle" && (
          <StartStopButton variant="start" onClick={onStart} />
        )}

        {status === "running" && (
          <div className={styles.iconButtons}>
            <TimerButton type="pause" size="large" onClick={onPause} />
            <StartStopButton variant="inactive" onClick={onStart} />
            <TimerButton type="restart" size="large" onClick={onRestart} />
          </div>
        )}

        {status === "negative" && (
          <StartStopButton variant="stop" onClick={onStop} />
        )}
      </div>

      {/* 토스트 */}
      {toast && (
        <div className={styles.toastWrapper}>
          <Toast type={toast.type} message={toast.message} />
        </div>
      )}
      </div>
    </div>
  );
}

export default FocusPage;
