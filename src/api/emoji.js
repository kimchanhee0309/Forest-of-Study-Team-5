import { BASE_URL } from "../../constants/api.js";

// 이모지 추가
export const addEmojiReaction = async (studyId, emoji) => {
  const response = await fetch(`${BASE_URL}/studies/${studyId}/reactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emoji,
    }),
  });

  if (!response.ok) {
    throw new Error("이모지 추가 실패");
  }

  return response.json();
};

// 이모지 목록 조회
export const getStudyEmojis = async (studyId) => {
  const response = await fetch(`${BASE_URL}/studies/${studyId}/reactions`);

  if (!response.ok) {
    throw new Error("이모지 조회 실패");
  }

  return response.json();
};
