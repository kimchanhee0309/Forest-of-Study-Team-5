import Input from "../../common/Input/Input.jsx";
import Button from "../../common/Button/Button.jsx";
import styles from "./StudyCreateForm.module.css";

// 배경 선택시 스티커 이미지
import stickerDarkblue from "../../../assets/sticker/sticker_darkblue.png";

function StudyCreateForm() {
  return (
    <form className={styles.form}>

      {/* 스터디 생성 카드 영역 */}
      <div className={styles.card}>
        <h1 className={styles.title}>스터디 만들기</h1>

        <div className={styles.field}>
          <label className={styles.label}>닉네임</label>
          <Input placeholder="닉네임을 입력해주세요" />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>스터디 이름</label>
          <Input placeholder="스터디 이름을 입력해주세요" />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>소개</label>
          <textarea
            className={styles.textarea}
            placeholder="소개 멘트를 작성해주세요"
          />
        </div>

         {/* 배경 선택 fild */}
        <div className={styles.field}>
          <label className={styles.label}>배경을 선택해주세요</label>

          <div className={styles.backgroundGrid}>

            {/* 기본 컬러 배경 */}
            <button
              type="button"
              className={`${styles.backgroundItem} ${styles.bgGreen}`}
            >
            {/* 선택 스티커 */}
            <img src={stickerDarkblue} alt="선택 스티커" />
            </button>


            <button
              type="button"
              className={`${styles.backgroundItem} ${styles.bgYellow}`}
            />
            <button
              type="button"
              className={`${styles.backgroundItem} ${styles.bgBlue}`}
            />
            <button
              type="button"
              className={`${styles.backgroundItem} ${styles.bgPink}`}
            />

            {/* 사용자 이미지 업로드 */}
            <label className={styles.uploadItem}>
              <input
                type="file"
                accept="image/*"
                className={styles.fileInput}
              />
              +
            </label>
            <label className={styles.uploadItem}>
              <input
                type="file"
                accept="image/*"
                className={styles.fileInput}
              />
              +
            </label>
            <label className={styles.uploadItem}>
              <input
                type="file"
                accept="image/*"
                className={styles.fileInput}
              />
              +
            </label>
            <label className={styles.uploadItem}>
              <input
                type="file"
                accept="image/*"
                className={styles.fileInput}
              />
              +
            </label>
          </div>
        </div>

        {/* 비밀번호 입력 */}
        <div className={styles.field}>
          <label className={styles.label}>비밀번호</label>
          {/* 공용 Input 사용 */}
          <Input type="password" placeholder="비밀번호를 입력해주세요" />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>비밀번호 확인</label>

          {/* 피그마 UI 맞춤용 커스텀 input*/}
          <input
            type="password"
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
