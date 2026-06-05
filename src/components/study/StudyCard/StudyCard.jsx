import Tag from "../../common/Tag/Tag.jsx";
import styles from "./StudyCard.module.css";

import pointIcon from "../../../assets/icons/ic_point.png";

function StudyCard({
  title,
  elapsedDays,
  description,
  point,
  emojis = [],
  background,
  onClick,
  type = "list",
}) {
  const backgroundClassMap = {
    green: styles.bgGreen,
    yellow: styles.bgYellow,
    blue: styles.bgBlue,
    pink: styles.bgPink,
  };

  const isImageBackground =
    background?.startsWith("data:image") || background?.startsWith("http");

  return (
    <article
      className={`${styles.card} ${styles[type]} ${isImageBackground ? styles.imageCard : (backgroundClassMap[background] ?? styles.bgGreen)}`}
      style={
        isImageBackground
          ? {
              backgroundImage: `url(${background})`,
              /* backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",*/
            }
          : undefined
      }
      onClick={onClick}
    >
      <div className={styles.header}>
        <div className={styles.titleBox}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.days}>{elapsedDays}일째 진행 중</p>
        </div>

        <Tag
          variant="light"
          size="small"
          icon={<img src={pointIcon} alt="" className={styles.pointIcon} />}
        >
          {point}P 획득
        </Tag>
      </div>

      <p className={styles.description}>{description}</p>

      <div className={styles.emojiList}>
        {emojis.slice(0, 3).map((emoji) => (
          <Tag key={emoji.id} variant="gray" size="small" icon={emoji.emoji}>
            {emoji.count}
          </Tag>
        ))}
      </div>
    </article>
  );
}

export default StudyCard;
