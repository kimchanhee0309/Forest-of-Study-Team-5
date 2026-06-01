import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GNB from "../../components/common/GNB/GNB";
import Timer from "../../components/focus/Timer/Timer";
import FocusPoint from "../../components/focus/FocusPoint/FocusPoint";
import TimerButton from "../../components/common/TimerButton/TimerButton";
import StartStopButton from "../../components/common/StartStopButton/StartStopButton";
import Toast from "../../components/common/Toast/Toast";
import arrowRightIcon from "../../assets/icons/ic_arrow_right.png";
import useFocusTimer from "../../hooks/useFocusTimer";
import styles from "./FocusPage.module.css";

function FocusPage({
  nickname = "닉네임",
  title = "스터디명",
  studyDescription = "현재까지 획득한 포인트",
  totalPoint = 0,
}) {
  const { studyId } = useParams();
  const navigate = useNavigate();
  const [inputMinutes, setInputMinutes] = useState(25);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 375);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 375);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const targetTime = `${String(inputMinutes).padStart(2, "0")}:${String(inputSeconds).padStart(2, "0")}`;
  const { status, remainSeconds, toast, start, pause, restart, stop } =
    useFocusTimer(targetTime);
  return (
    <>
      <GNB showButton={false} />
      <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* 상단 스터디 정보 */}
        <div className={styles.studyInfo}>
          <div className={styles.studyHeader}>
            <h2 className={styles.studyName}>{nickname}의 {title}</h2>
            <div className={styles.navButtons}>
              <button className={styles.navButton} onClick={() => navigate(`/studies/${studyId}/habits`)}>
                오늘의 습관 <img src={arrowRightIcon} alt="arrow" className={styles.navIcon} />
              </button>
              <button className={styles.navButton} onClick={() => navigate("/")}>
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
          {status === "idle" && (
            <div className={styles.timeInput}>
              <input
                type="number"
                min="0"
                max="180"
                value={inputMinutes}
                onChange={(e) => setInputMinutes(Number(e.target.value))}
                className={styles.minuteInput}
              />
              <span className={styles.minuteLabel}>:</span>
              <input
                type="number"
                min="0"
                max="59"
                value={inputSeconds}
                onChange={(e) => setInputSeconds(Number(e.target.value))}
                className={styles.minuteInput}
              />
            </div>
          )}
          <Timer
            remainSeconds={remainSeconds}
            status={status}
            targetTime={targetTime}
          />

          {status === "idle" && (
            <StartStopButton variant="start" onClick={start} />
          )}

          {(status === "running" || status === "paused") && (
            <div className={styles.iconButtons}>
              <TimerButton type="pause" size={isMobile ? "small" : "large"} onClick={pause} />
              <StartStopButton variant="inactive" onClick={start} />
              <TimerButton type="restart" size={isMobile ? "small" : "large"} onClick={restart} />
            </div>
          )}

          {status === "negative" && (
            <StartStopButton variant="stop" onClick={stop} />
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
    </>
  );
}

export default FocusPage;
