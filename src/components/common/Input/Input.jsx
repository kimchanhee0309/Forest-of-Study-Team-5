import styles from "./Input.module.css";

function Input({ label, error, type = "text", placeholder, value, onChange }) {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}

      <input
        className={`${styles.input} ${error ? styles.errorInput : ""}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default Input;
