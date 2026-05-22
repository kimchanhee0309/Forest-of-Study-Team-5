import Input from "../../common/Input/Input.jsx";
import Button from "../../common/Button/Button.jsx";
import styles from "./StudyCreateForm.module.css";

function StudyCreateForm() {
  return (
    <form className={styles.form}>
       <div className={styles.card}>
      <h1>스터디 만들기</h1>

      <label>
        닉네임
        <Input placeholder="닉네임을 입력해주세요" />
      </label>

      <label>
        스터디 이름
        <Input placeholder="스터디 이름을 입력해주세요" />
      </label>

      <label>
        소개
        <textarea placeholder="소개 멘트를 작성해주세요" />
      </label>

      <label>
        비밀번호
        <Input type="password" placeholder="비밀번호를 입력해주세요" />
      </label>

      <label>
        비밀번호 확인
        <Input type="password" placeholder="비밀번호를 다시 입력해주세요" />
      </label>

      <Button type="button" fullWidth>
        만들기
      </Button>

      </div>
    </form>
  );
}

export default StudyCreateForm;
