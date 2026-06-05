import { BASE_URL } from "../../constants/api.js";

// 비밀번호 검증
export const verifyPassword = async (studyId, password) => {
  const response = await fetch(
    `${BASE_URL}/studies/${studyId}/verify-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("비밀번호 검증 실패");
  }

  return response.json();
};

// 스터디 삭제
export const deleteStudy = async (studyId) => {
  const response = await fetch(`${BASE_URL}/studies/${studyId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("스터디 삭제 실패");
  }

  return response.json();
};
