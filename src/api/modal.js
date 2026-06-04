import axiosInstance from "./axiosInstance";

export const verifyPassword = async (studyId, password) => {
  const response = await axiosInstance.post(
    `/studies/${studyId}/verify-password`,
    {
      password,
    },
  );

  return response.data;
};

// 삭제
export const deleteStudy = async (studyId) => {
  const response = await axiosInstance.delete(`/studies/${studyId}`);

  return response.data;
};
