import styles from "./ButtonModule.css";

function Button({
  children,
  variant = "primary",
  size = "medium",
  type = "button",
  disabled = false,
  icon,
  fullWidth = false,
  onClick,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.fullWidth : ""}`}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
}

export default Button;
