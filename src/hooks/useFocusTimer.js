import { useState, useEffect, useRef } from "react";

import { BASE_URL } from "../../constants/api.js";

function useFocusTimer(targetTime = "00:10", studyId) {
  const [mm, ss] = targetTime.split(":").map(Number);
  const totalSeconds = mm * 60 + ss;

  const [status, setStatus] = useState("idle");
  const [remainSeconds, setRemainSeconds] = useState(totalSeconds);

  // targetTime 변경 시 remainSeconds 업데이트 (idle 상태일 때만)
  useEffect(() => {
    if (status === "idle") {
      setRemainSeconds(totalSeconds);
    }
  }, [totalSeconds]);
  const [toast, setToast] = useState(null);
  const [totalPoint, setTotalPoint] = useState(0);
  const intervalRef = useRef(null);
  const focusIdRef = useRef(null); // 현재 진행 중인 세션 ID

  // 초기 마운트 시 현재 세션 + 누적 포인트 조회
  useEffect(() => {
    if (!studyId) return;
    fetch(`${BASE_URL}/focus/${studyId}/current`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setTotalPoint(data.data.total_point ?? 0);
        }
      })
      .catch(() => {});
  }, [studyId]);

  // 타이머 시작 / 재개
  async function start() {
    if (status === "paused") {
      // 재개
      try {
        await fetch(`${BASE_URL}/focus/${focusIdRef.current}/resume`, {
          method: "PATCH",
        });
      } catch (e) {}
      setStatus("running");
    } else {
      // 새로 시작
      try {
        const res = await fetch(`${BASE_URL}/focus/${studyId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ targetMinutes: mm }),
        });
        if (res.ok) {
          const json = await res.json();
          focusIdRef.current = json.data.id;
        }
      } catch (e) {}
      setStatus("running");
    }
  }

  // 일시정지
  async function pause() {
    try {
      await fetch(`${BASE_URL}/focus/${focusIdRef.current}/pause`, {
        method: "PATCH",
      });
    } catch (e) {}
    setStatus("paused");
    setToast({ type: "warning", message: "🚨 집중이 중단되었습니다." });
    setTimeout(() => setToast(null), 3000);
  }

  // 재시작 (처음부터 → idle로 초기화)
  function restart() {
    clearInterval(intervalRef.current);
    focusIdRef.current = null;
    setRemainSeconds(totalSeconds);
    setStatus("idle");
  }

  // 종료 (완료 API 호출 → 실제 포인트 표시)
  async function stop() {
    clearInterval(intervalRef.current);
    let earnedPoint = 0;
    try {
      const res = await fetch(
        `${BASE_URL}/focus/${focusIdRef.current}/complete`,
        {
          method: "PATCH",
        },
      );
      if (res.ok) {
        const json = await res.json();
        earnedPoint = json.data.earned_point ?? 0;
        setTotalPoint((prev) => prev + earnedPoint);
      }
    } catch (e) {}
    focusIdRef.current = null;
    setRemainSeconds(totalSeconds);
    setStatus("idle");
    setToast({
      type: "point",
      message: `🎉 ${earnedPoint}포인트를 획득했습니다!`,
    });
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
    totalPoint,
    start,
    pause,
    restart,
    stop,
  };
}

export default useFocusTimer;
