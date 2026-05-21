import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import style from "./EmojiReaction.module.css";
import smileIcon from "../../../assets/icons/ic_smile.png";

function EmojiReaction() {
  const [open, setOpen] = useState(false);
  const [showHidden, setShowHidden] = useState(false);
  const [reactions, setReactions] = useState([
    { emoji: "👍", count: 0 },
    { emoji: "🔥", count: 0 },
    { emoji: "😍", count: 0 },
  ]);

  const sortedReactions = [...reactions].sort((a, b) => b.count - a.count);

  const topReactions = sortedReactions.slice(0, 3);

  const hiddenReactions = sortedReactions.slice(3);

  const handleEmojiClick = (emojiData) => {
    const selectedEmoji = emojiData.emoji;

    setReactions((prev) => {
      const exists = prev.find((reaction) => reaction.emoji === selectedEmoji);

      if (exists) {
        return prev.map((reaction) =>
          reaction.emoji === selectedEmoji
            ? {
                ...reaction,
                count: reaction.count + 1,
              }
            : reaction,
        );
      }

      return [...prev, { emoji: selectedEmoji, count: 1 }];
    });

    setOpen(false);
  };

  return (
    <div className={style.emoji_frame}>
      <div className={style.emoji}>
        {topReactions.map((reaction) => (
          <div className={style.emoji_n_frame} key={reaction.emoji}>
            <div className={style.emoji_n}>
              <span className={style.emoji_picture}>{reaction.emoji}</span>

              <span className={style.emoji_count}>{reaction.count}</span>
            </div>
          </div>
        ))}

        {hiddenReactions.length > 0 && (
          <button
            className={style.emoji_more_btn}
            onClick={() => setShowHidden((prev) => !prev)}
          >
            +{hiddenReactions.length}
          </button>
        )}

        {showHidden && (
          <div className={style.hidden_emoji_list}>
            {hiddenReactions.map((reaction) => (
              <div className={style.emoji_n_frame} key={reaction.emoji}>
                <div className={style.emoji_n}>
                  <span className={style.emoji_picture}>{reaction.emoji}</span>

                  <span className={style.emoji_count}>{reaction.count}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        className={style.emoji_btn}
        onClick={() => setOpen((prev) => !prev)}
      >
        <img src={smileIcon} alt="smileIcon" className={style.smileIcon} />
        추가
      </button>

      {open && (
        <div className={style.picker}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
}

export default EmojiReaction;
