import axiosInstance from "./axiosInstance";

// 이모지 추가
export const addEmojiReaction = async (studyId, emoji) => {
  const response = await axiosInstance.post(`/studies/${studyId}/reactions`, {
    emoji,
  });

  return response.data;
};

// 이모지 목록 조회
export const getStudyEmojis = async (studyId) => {
  const response = await axiosInstance.get(`/studies/${studyId}/reactions`);

  return response.data;
};
