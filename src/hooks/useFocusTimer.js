import { useState, useEffect, useRef } from "react";

function useFocusTimer(targetTime = "25:00") {
  const [mm, ss] = targetTime.split(":").map(Number);
  const totalSeconds = mm * 60 + ss;

  const [status, setStatus] = useState("idle");
  const [remainSeconds, setRemainSeconds] = useState(totalSeconds);
  const [toast, setToast] = useState(null);
  const intervalRef = useRef(null);

  // 타이머 시작 / 재개
  function start() {
    if (status === "paused") {
      setStatus("running");
    } else {
      setStatus("running");
    }
  }

  // 일시정지
  function pause() {
    setStatus("paused");
    setToast({ type: "warning", message: "🚨 집중이 중단되었습니다." });
    setTimeout(() => setToast(null), 3000);
  }

  // 재시작 (처음부터 → idle로 초기화)
  function restart() {
    clearInterval(intervalRef.current);
    setRemainSeconds(totalSeconds);
    setStatus("idle");
  }

  // 종료
  function stop() {
    clearInterval(intervalRef.current);
    setRemainSeconds(totalSeconds);
    setStatus("idle");
    setToast({ type: "point", message: "🎉 0포인트를 획득했습니다!" });
    setTimeout(() => setToast(null), 3000);
  }

  useEffect(() => {
    if (status === "running" || status === "negative") {
      intervalRef.current = setInterval(() => {
        setRemainSeconds((prev) => {
          const next = prev - 1;
          if (next < 0) {
            setStatus("negative");
          }
          return next;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [status]);

  return {
    status,
    remainSeconds,
    toast,
    start,
    pause,
    restart,
    stop,
  };
}

export default useFocusTimer;
