import Input from "../../common/Input/Input.jsx";
import Button from "../../common/Button/Button.jsx";
import styles from "./StudyCreateForm.module.css";
import sticker_gray from "../../../assets/sticker/sticker_gray.png";

import useStudyCreateForm from "./useStudyCreateForm"; // ✅ 훅 import

function StudyCreateForm() {
  // hook
  const {
    formData,
    errors,
    MaxLength,
    selectedBackground,
    customBackgrounds,
    defaultBackgrounds,
    handleChange,
    handleSubmit,
    handleSelectBackground,
    handleAddCustomBackground,
    handleDeleteCustomBackground,
  } = useStudyCreateForm();

  // 화면(UI) 담당
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
            autoComplete="off"
          />
          <span className={styles.charCount}>
            {formData.nickname.length}/{MaxLength.nickname}자
          </span>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>스터디 이름</label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="스터디 이름을 입력해주세요"
            error={errors.title}
            autoComplete="off"
          />
          <span className={styles.charCount}>
            {formData.title.length}/{MaxLength.title}자
          </span>
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
          <span className={styles.charCount}>
            {formData.description.length}/{MaxLength.description}자
          </span>
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
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력해주세요"
            error={errors.password}
            maxLength={100}
            autoComplete="new-password"
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
            maxLength={100}
            autoComplete="new-password"
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
