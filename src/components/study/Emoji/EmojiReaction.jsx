import { useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import style from "./EmojiReaction.module.css";
import smileIcon from "../../../assets/icons/ic_smile.png";
import { addEmojiReaction, getStudyEmojis } from "../../../api/emoji.js";

function EmojiReaction({ studyId }) {
  const [open, setOpen] = useState(false);
  const [showHidden, setShowHidden] = useState(false);
  {
    /* 화면에 기본으로 나타내는 이모지 */
  }
  const [reactions, setReactions] = useState([]);

  const sortedReactions = [...reactions].sort((a, b) => b.count - a.count); // 내림차순 정렬

  const topReactions = sortedReactions.slice(0, 3); //TOP3 이모지

  const hiddenReactions = sortedReactions.slice(3); //TOP3외 이모지
  // 이모지 보여주기
  const fetchEmojis = async () => {
    try {
      const data = await getStudyEmojis(studyId);

      setReactions(data);
    } catch (error) {
      console.error(error);
    }
  };
  //이모지 추가하기
  const handleEmojiClick = async (emojiData) => {
    try {
      const selectedEmoji = emojiData.emoji;

      await addEmojiReaction(studyId, selectedEmoji);

      await fetchEmojis();

      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmojis();
  }, [studyId]);

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
            <span className={style.plus}>＋ {hiddenReactions.length}..</span>
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
      <div className={style.pickerframe}>
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
    </div>
  );
}

export default EmojiReaction;
