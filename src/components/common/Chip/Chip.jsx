import styles from "./chip.module.css";

function chip({ children, completed = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.chip} ${completed ? styles.completed : ""}`}
    >
      {children}
    </button>
  );
}

export default chip;
