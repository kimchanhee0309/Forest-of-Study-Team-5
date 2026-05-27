import { useState } from "react";
import Input from "../../common/Input/Input.jsx";
import Button from "../../common/Button/Button.jsx";
import styles from "./StudyCreateForm.module.css";

// 배경 선택시 스티커 이미지
import sticker_gray from "../../../assets/sticker/sticker_gray.png";

function StudyCreateForm() {
  // form 입력값 상태 관리
  const [formData, setFormData] = useState({
    nickname: "",
    studyName: "",
    description: "",
    password: "",
    passwordConfirm: "",
  });

  // 유효성 검사 에러 메세지 상태
  const [errors, setErrors] = useState({
    studyName: "",
    description: "",
    password: "",
    passwordConfirm: "",
  });

  const validateForm = () => {
    const nextErrors = {
      studyName: "",
      password: "",
      passwordConfirm: "",
    };

    // 스터디 이름
    if (!formData.studyName.trim()) {
      nextErrors.studyName = "*스터디 이름을 입력해주세요";
    }

    // 비번 입력 안했을 때
    if (!formData.password) {
      nextErrors.password = "*비밀번호를 입력해주세요";
    }

    // 비번 확인 입력 안했을 때
    if (!formData.passwordConfirm) {
      nextErrors.passwordConfirm = "*비밀번호를 다시 입력해주세요";

      // 비번 불일치
    } else if (formData.password !== formData.passwordConfirm) {
      nextErrors.passwordConfirm = "*비밀번호가 일치하지 않습니다";
    }

    setErrors(nextErrors);

    return (
      !nextErrors.studyName &&
      !nextErrors.description &&
      !nextErrors.password &&
      !nextErrors.passwordConfirm
    );
  };

  const handleSubmit = () => {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

  // TODO: API 연동 시 스터디 생성 요청 연결
  };

  // input / textarea 공통 입력 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // UI 제공 기본 배경 id 관리
  const [selectedBackground, setSelectedBackground] = useState("green");

  // 배경 선택 시 선택 id 변경
  const handleSelectBackground = (background) => {
    setSelectedBackground(background);
  };

  // 기본 제공 배경 목록
  const defaultBackgrounds = [
    { id: "green", className: styles.bgGreen },
    { id: "yellow", className: styles.bgYellow },
    { id: "blue", className: styles.bgBlue },
    { id: "pink", className: styles.bgPink },
  ];

  // 사용자가 업로드한 배경 이미지 목록
  const [customBackgrounds, setCustomBackgrounds] = useState([]);

  // 사용자 배경 이미지 추가
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

    // 삭제한 배경이 선택 중이면 기본 배경으로 초기화
    if (selectedBackground === `custom-${deleteIndex}`) {
      setSelectedBackground("green");
    }
  };

  return (
    <form className={styles.form}>
      {/* 스터디 생성 카드 영역 */}
      <div className={styles.card}>
        <h1 className={styles.title}>스터디 만들기</h1>

        <div className={styles.field}>
          <label className={styles.label}>닉네임</label>
          <Input
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="닉네임을 입력해주세요"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>스터디 이름</label>
          <Input
            name="studyName"
            value={formData.studyName}
            onChange={handleChange}
            placeholder="스터디 이름을 입력해주세요"
            error={errors.studyName}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>소개</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="소개 멘트를 작성해주세요"
          />
        </div>

        {/* 배경 선택 field */}
        <div className={styles.field}>
          <label className={styles.label}>배경을 선택해주세요</label>

          <div className={styles.backgroundGrid}>
            {/* 기본 컬러 배경 */}
            {defaultBackgrounds.map((background) => (
              <button
                key={background.id}
                type="button"
                className={`${styles.backgroundItem} ${background.className}`}
                onClick={() => handleSelectBackground(background.id)}
              >
                {selectedBackground === background.id && (
                  <img
                    src={sticker_gray}
                    alt="선택 스티커"
                    className={styles.selectedSticker}
                  />
                )}
              </button>
            ))}

            {/* 사용자 이미지 업로드 */}
            {customBackgrounds.map((imageUrl, index) => (
              <button
                key={imageUrl}
                type="button"
                className={styles.customBackgroundItem}
                onClick={() => handleSelectBackground(`custom-${index}`)}
              >
                <img
                  src={imageUrl}
                  alt="사용자 추가 배경"
                  className={styles.customBackgroundImage}
                />

                {selectedBackground === `custom-${index}` && (
                  <img
                    src={sticker_gray}
                    alt="선택 스티커"
                    className={styles.selectedSticker}
                  />
                )}

                <div
                  className={styles.deleteBackgroundButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCustomBackground(index);
                  }}
                >
                  X
                </div>
              </button>
            ))}

            {customBackgrounds.length < 4 && (
              <label className={styles.uploadItem}>
                <input
                  type="file"
                  accept="image/*"
                  className={styles.fileInput}
                  onChange={handleAddCustomBackground}
                />
                +
              </label>
            )}
          </div>
        </div>

        {/* 비밀번호 입력 */}
        <div className={styles.field}>
          <label className={styles.label}>비밀번호</label>
          {/* 공용 Input 사용 */}
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력해주세요"
            error={errors.password}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>비밀번호 확인</label>

          <Input
            type="password"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            placeholder="비밀번호를 다시 입력해주세요"
            error={errors.passwordConfirm}
          />
        </div>

        {/* 생성 버튼 */}
        <div className={styles.submitButtonWrapper}>
          <Button
            type="button"
            size="content-large"
            fullWidth
            onClick={handleSubmit}
          >
            만들기
          </Button>
        </div>
      </div>
    </form>
  );
}

export default StudyCreateForm;
