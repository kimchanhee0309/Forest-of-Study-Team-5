import Button from "../Button/Button.jsx";
import styles from "./GNB.module.css";
import { Link } from "react-router-dom";

import logo from "../../../assets/images/logo.png";

function GNB({ showButton = true }) {
  return (
    <header className={styles.gnb}>
      <div className={styles.container}>
        <Link to="/">
          <img src={logo} alt="공부의 숲" className={styles.logo} />
        </Link>
        {showButton && (
          <Link to="/studies/new">
            <Button size="cta-large">스터디 만들기</Button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default GNB;
