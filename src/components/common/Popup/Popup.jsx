import Button from "../Button/Button.jsx";
import styles from "./Popup.module.css";

function Popup({
  message,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
}) {
  return (
    <div className={styles.overlay}>
      <section className={styles.popup}>
        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          {onCancel && (
            <Button variant="cancel" size="medium" fullWidth onClick={onCancel}>
              {cancelText}
            </Button>
          )}

          <Button size="medium" fullWidth onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </section>
    </div>
  );
}

export default Popup;
