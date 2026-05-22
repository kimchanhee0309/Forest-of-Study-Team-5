import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import style from "./EmojiReaction.module.css";
import smileIcon from "../../../assets/icons/ic_smile.png";

function EmojiReaction() {
  const [open, setOpen] = useState(false);
  const [showHidden, setShowHidden] = useState(false);
  {
    /* 화면에 기본으로 나타내는 이모지 */
  }
  const [reactions, setReactions] = useState([]);

  const sortedReactions = [...reactions].sort((a, b) => b.count - a.count); // 내림차순 정렬

  const topReactions = sortedReactions.slice(0, 3); //TOP3 이모지

  const hiddenReactions = sortedReactions.slice(3); //TOP3외 이모지

  const handleEmojiClick = (emojiData) => {
    const selectedEmoji = emojiData.emoji; // 선택한 이모지

    setReactions((prev) => {
      const exists = prev.find((reaction) => reaction.emoji === selectedEmoji); // 중복검사

      if (exists) {
        return prev.map((reaction) =>
          reaction.emoji === selectedEmoji
            ? {
                ...reaction,
                count: reaction.count + 1,
              }
            : reaction,
        );
      } // 중복시 +1

      return [...prev, { emoji: selectedEmoji, count: 1 }]; // 새로운 이모지 추가
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
            className={style.plus_btn}
            onClick={() => setShowHidden((prev) => !prev)}
          >
            <span className={style.plus}>+ {hiddenReactions.length}..</span>
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
        <span className={style.add}>추가</span>
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
