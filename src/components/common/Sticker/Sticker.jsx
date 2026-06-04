import styles from "./Sticker.module.css";

import stickerEmpty from "../../../assets/sticker/sticker_empty.png";
import stickerBlue from "../../../assets/sticker/sticker_blue.png";
import stickerDarkBlue from "../../../assets/sticker/sticker_darkblue.png";
import stickerLightBlue from "../../../assets/sticker/sticker_lightblue.png";
import stickerGreen from "../../../assets/sticker/sticker_green.png";
import stickerDarkGreen from "../../../assets/sticker/sticker_darkgreen.png";
import stickerLightGreen from "../../../assets/sticker/sticker_lightgreen.png";
import stickerPink from "../../../assets/sticker/sticker_pink.png";
import stickerDarkPink from "../../../assets/sticker/sticker_darkpink.png";
import stickerLightPink from "../../../assets/sticker/sticker_lightpink.png";
import stickerPurple from "../../../assets/sticker/sticker_purple.png";
import stickerDarkPurple from "../../../assets/sticker/sticker_darkpurple.png";
import stickerDeepPurple from "../../../assets/sticker/sticker_deeppurple.png";
import stickerMint from "../../../assets/sticker/sticker_mint.png";
import stickerLightMint from "../../../assets/sticker/sticker_lightmint.png";
import stickerLime from "../../../assets/sticker/sticker_lime.png";
import stickerOrange from "../../../assets/sticker/sticker_orange.png";
import stickerYellow from "../../../assets/sticker/sticker_yellow.png";
import stickerLightYellow from "../../../assets/sticker/sticker_lightyellow.png";

const STICKER_IMAGES = {
  empty: stickerEmpty,
  blue: stickerBlue,
  darkBlue: stickerDarkBlue,
  lightBlue: stickerLightBlue,
  green: stickerGreen,
  darkGreen: stickerDarkGreen,
  lightGreen: stickerLightGreen,
  pink: stickerPink,
  darkPink: stickerDarkPink,
  lightPink: stickerLightPink,
  purple: stickerPurple,
  darkPurple: stickerDarkPurple,
  deepPurple: stickerDeepPurple,
  mint: stickerMint,
  lightMint: stickerLightMint,
  lime: stickerLime,
  orange: stickerOrange,
  yellow: stickerYellow,
  lightYellow: stickerLightYellow,
};

function Sticker({
  checked = false,
  color = "lime",
  size = "medium",
  onClick,
}) {
  const stickerSrc = checked
    ? STICKER_IMAGES[color] || STICKER_IMAGES.lime
    : STICKER_IMAGES.empty;

  return (
    <div
      type="button"
      className={`${styles.sticker} ${styles[size]}`}
      onClick={onClick}
    >
      <img
        src={stickerSrc}
        alt={checked ? "완료 스티커" : "미완료 스티커"}
        className={styles.image}
      />
    </div>
  );
}

export default Sticker;
