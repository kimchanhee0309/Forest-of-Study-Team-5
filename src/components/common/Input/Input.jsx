import styles from "./Input.module.css";
import { useState } from "react";

import eyeOnIcon from "../../../assets/icons/ic_eye_on.png";
import eyeOffIcon from "../../../assets/icons/ic_eye_off.png";

function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  className = "",
  ...props
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && isPasswordVisible ? "text" : type;

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.inputBox} ${error ? styles.errorBox : ""}`}>
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${styles.input} ${className}`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setIsPasswordVisible((prev) => !prev)}
          >
            <img
              src={isPasswordVisible ? eyeOnIcon : eyeOffIcon}
              alt={isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
              className={styles.eyeIcon}
            />
          </button>
        )}
      </div>

      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
}

export default Input;
