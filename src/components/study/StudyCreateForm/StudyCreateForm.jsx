import { useState } from "react";
import Input from "../../common/Input/Input.jsx";
import Button from "../../common/Button/Button.jsx";
import styles from "./StudyCreateForm.module.css";

// 배경 선택시 스티커 이미지
import stickerDarkblue from "../../../assets/sticker/sticker_darkblue.png";

function StudyCreateForm() {
  const [formData, setFormData] = useState({
    nickname: "",
    studyName: "",
    description: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log({
      name,
      value,
    });

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [selectedBackground, setSelectedBackground] = useState("green");
  const handleSelectBackground = (background) => {
    setSelectedBackground(background);
  };

  const defaultBackgrounds = [
    { id: "green", className: styles.bgGreen },
    { id: "yellow", className: styles.bgYellow },
    { id: "blue", className: styles.bgBlue },
    { id: "pink", className: styles.bgPink },
  ];

  const [customBackgrounds, setCustomBackgrounds] = useState([]);

  const handleAddCustomBackground = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    if (customBackgrounds.length >= 4) return;

    const imageUrl = URL.createObjectURL(file);

    setCustomBackgrounds((prev) => [...prev, imageUrl]);

    e.target.value = "";
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
                  <img src={stickerDarkblue} alt="선택 스티커" />
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
                src={stickerDarkblue}
                alt="선택 스티커"
                className={styles.selectedSticker}              
              />
              )}
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
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>비밀번호 확인</label>

          {/* 피그마 UI 맞춤용 커스텀 input*/}
          <input
            type="password"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            className={styles.passwordConfirmInput}
            placeholder="비밀번호를 다시 입력해주세요"
          />
        </div>

        {/* 생성 버튼 */}
        <div className={styles.submitButtonWrapper}>
          <Button type="button" size="content-large" fullWidth>
            만들기
          </Button>
        </div>
      </div>
    </form>
  );
}

export default StudyCreateForm;
