import styles from "./Tag.module.css";

function Tag({ icon, children, variant = "dark", size = "medium" }) {
  return (
    <span className={`${styles.tag} ${styles[variant]} ${styles[size]}`}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
    </span>
  );
}

export default Tag;
