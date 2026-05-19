import styles from "./Sticker.module.css";
import stickerIcon from "../../../assets/sticker/sticker_empty.png";

function Sticker({ active = false, icon = stickerIcon, onClick }) {
  return (
    <button
      type="button"
      className={`${styles.sticker} ${active ? styles.active : ""}`}
      onClick={onClick}
    >
      <span className={styles.circle}>{icon}</span>
    </button>
  );
}

export default Sticker;
