import { useState } from "react";
import styles from "./UpdateStudyForm.module.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../constants/api.js";

function useUpdateStudyForm() {
  const { studyId } = useParams();
  const navigate = useNavigate(); // 생성 후 메인 페이지로 이동
  // 상태 관리

  // MaxLength 추가
  const MaxLength = {
    nickname: 30,
    title: 50,
    description: 200,
  };

  // 폼 입력값 상태(닉네임, 스터디이름, 소개, 비밀번호 등)
  const [formData, setFormData] = useState({
    nickname: "",
    title: "",
    description: "",
    password: "",
    passwordConfirm: "",
  });

  // 유효성 검사 실패 시 보여줄 에러 메시지 상태
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    password: "",
    passwordConfirm: "",
  });

  // 현재 선택된 배경의 id ("green", "yellow", "custom-0" 등)
  const [selectedBackground, setSelectedBackground] = useState("green");

  // 사용자가 직접 업로드한 배경 이미지 URL 목록
  const [customBackgrounds, setCustomBackgrounds] = useState([]);

  // 기본 배경 목록(데이터)
  const defaultBackgrounds = [
    { id: "green", className: styles.bgGreen },
    { id: "yellow", className: styles.bgYellow },
    { id: "blue", className: styles.bgBlue },
    { id: "pink", className: styles.bgPink },
  ];

  // 폼 로직
  // input/textarea가 바뀔 때마다 formData 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (MaxLength[name] && value.length > MaxLength[name]) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 폼 제출 전 유효성 검사 - 문제 있으면 에러 메시지 발생, 통과하면 true 반환
  const validateForm = () => {
    const nextErrors = {
      title: "",
      description: "",
      password: "",
      passwordConfirm: "",
    };

    // 스터디 이름이 비어있으면 에러
    if (!formData.title.trim()) {
      nextErrors.title = "*스터디 이름을 입력해주세요";
    }

    // 비밀번호가 비어있으면 에러
    if (!formData.password) {
      nextErrors.password = "*비밀번호를 입력해주세요";
    }

    // 비밀번호 확인이 비어있으면 에러
    if (!formData.passwordConfirm) {
      nextErrors.passwordConfirm = "*비밀번호를 다시 입력해주세요";
    } else if (formData.password !== formData.passwordConfirm) {
      // 비밀번호 확인이 입력됐지만 불일치하면 에러
      nextErrors.passwordConfirm = "*비밀번호가 일치하지 않습니다";
    }

    setErrors(nextErrors);

    // 에러가 하나도 없으면 true, 하나라도 있으면 false
    return (
      !nextErrors.title &&
      !nextErrors.description &&
      !nextErrors.password &&
      !nextErrors.passwordConfirm
    );
  };

  // 수정하기 버튼 클릭 시 실행 - 검사 통과해야만 API 요청
  const handleSubmit = async () => {
    const isValid = validateForm();

    if (!isValid) return;

    // TODO: API 연동 시 스터디 수정 요청 연결
    try {
      const response = await fetch(`${BASE_URL}/studies/${studyId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: formData.nickname,
          title: formData.title,
          description: formData.description,
          background: selectedBackground,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("스터디 수정 성공!", data);
        navigate("/"); // 성공 시 페이지 이동
      } else {
        console.log("실패", data);
      }
    } catch (error) {
      console.error("네크워크 오류", error);
    }
  };

  // 배경 로직
  // 배경 클릭 시 선택 상태 변경
  const handleSelectBackground = (background) => {
    setSelectedBackground(background);
  };

  // 파일 업로드 시 사용자 배경 이미지 추가(최대 4개)
  const handleAddCustomBackground = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    if (customBackgrounds.length >= 4) return;

    const imageUrl = URL.createObjectURL(file);

    setCustomBackgrounds((prev) => [...prev, imageUrl]);

    e.target.value = "";
  };

  // 사용자 배경 이미지 삭제
  const handleDeleteCustomBackground = (deleteIndex) => {
    setCustomBackgrounds((prev) =>
      prev.filter((_, index) => index !== deleteIndex),
    );

    // 삭제한 이미지가 현재 선택된 배경이면 기본값(green)으로 초기화
    if (selectedBackground === `custom-${deleteIndex}`) {
      setSelectedBackground("green");
    }
  };

  // 훅의 반환값
  return {
    formData, // 입력값 상태
    errors, // 에러 메시지 상태
    MaxLength, // 글자 수
    selectedBackground, // 선택된 배경 id
    customBackgrounds, // 사용자 업로드 배경 목록
    defaultBackgrounds, // 기본 배경 목록
    handleChange, // 입력값 변경 핸들러
    handleSubmit, // 폼 제출 핸들러
    handleSelectBackground, // 배경 선택 핸들러
    handleAddCustomBackground, // 배경 이미지 추가 핸들러
    handleDeleteCustomBackground, // 배경 이미지 삭제 핸들러
  };
}

export default useUpdateStudyForm;
