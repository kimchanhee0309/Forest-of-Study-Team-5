import styles from "./Toast.module.css";

function Toast({ type = "point", message }) {
  return <div className={`${styles.toast} ${styles[type]}`}>{message}</div>;
}

export default Toast;
