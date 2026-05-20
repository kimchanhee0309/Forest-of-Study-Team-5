import Button from "../Button/Button.jsx";
import styles from "./GNB.module.css";

import logo from "../../../assets/images/logo.png";

function GNB({ onCreateStudy }) {
  return (
    <header className={styles.gnb}>
      <div className={styles.container}>
        <img src={logo} alt="공부의 숲" className={styles.logo} />

        <Button size="cta-large" onClick={onCreateStudy}>
          스터디 만들기
        </Button>
      </div>
    </header>
  );
}

export default GNB;
