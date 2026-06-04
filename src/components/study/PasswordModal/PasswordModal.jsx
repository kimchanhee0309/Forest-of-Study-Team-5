import { useState } from "react";
import { Button, Input, Modal } from "../../common";
import styles from "./PasswordModal.module.css";

function PasswordModal({
  title,
  description = "권한이 필요해요!",
  buttonText,
  onClose,
  onSubmit,
}) {
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    onSubmit?.(password);
  };

  return (
    <Modal title={title} onClose={onClose} size="password">
      <p className={styles.description}>{description}</p>

      <div className={styles.form}>
        <label className={styles.label}>비밀번호</label>

        <Input
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button fullWidth size="content-large" onClick={handleSubmit}>
          {buttonText}
        </Button>
      </div>
    </Modal>
  );
}

export default PasswordModal;
