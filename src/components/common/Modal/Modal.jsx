import styles from "./Modal.module.css";

function Modal({ title, children, onClose, size = "default" }) {
  return (
    <div className={styles.overlay}>
      <section className={`${styles.modal} ${styles[size]}`}>
        {onClose && (
          <button className={styles.closeButton} onClick={onClose}>
            나가기
          </button>
        )}

        {title && <h2 className={styles.title}>{title}</h2>}

        <div className={styles.content}>{children}</div>
      </section>
    </div>
  );
}

export default Modal;
