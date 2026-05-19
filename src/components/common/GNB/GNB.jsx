import Button from "../Button/Button.jsx";
import styles from "./GNB.module.css";

function GNB() {
  return (
    <header className={styles.gnb}>
      <div className={styles.loge}>공부의 숲</div>

      <Button size="small">스터디 만들기</Button>
    </header>
  );
}

export default GNB;
