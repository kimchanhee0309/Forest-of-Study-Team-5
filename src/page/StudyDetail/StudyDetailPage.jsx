import { useState } from "react";
import pointIcon from "../../assets/icons/ic_point.png";
import arrowIcon from "../../assets/icons/ic_arrow_right.png";
import style from "./StudyDetail.module.css";
import EmojiReaction from "../../components/study/Emoji/EmojiReaction.jsx";
import PasswordModal from "../../components/study/PasswordModal/PasswordModal.jsx";
import { Tag, Sticker } from "../../components/common";

function StudyDetailPage() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className={style.page}>
      <div className={style.container}>
        <div className={style.container_inner}>
          <div className={style.top_frame}>
            <div className={style.action_frame}>
              <EmojiReaction />
              <div className={style.edit_frame}>
                {/* 모달 추가 */}
                <button onClick={() => setOpenModal(true)} className="edit-btn">
                  <span className={style.editGreen}>공유하기</span>
                </button>

                <span className={style.editGreen}>|</span>
                <button onClick={() => setOpenModal(true)} className="edit-btn">
                  <span className={style.editGreen}>수정하기</span>
                </button>
                <span className={style.editGray}>|</span>
                <button
                  onClick={() => setOpenModal(true)}
                  className={style.editGray}
                >
                  스터디 삭제하기
                </button>
              </div>
            </div>
            <div className={style.post_frame}>
              <div className={style.post_header}>
                <span className={style.postTitle}>연우의 개발공장</span>
                <div className={style.post_btn_frame}>
                  {/* LINK 추가 */}
                  <button className={style.post_btn}>
                    <div className={style.post_btn_inner}>
                      <span className={style.btnGray}>오늘의 습관</span>
                      <img
                        src={arrowIcon}
                        alt="arrow"
                        className={style.arrowIcon}
                      />
                    </div>
                  </button>
                  <button className={style.post_btn}>
                    <div className={style.post_btn_inner}>
                      <span className={style.btnGray}>오늘의 집중</span>
                      <img
                        src={arrowIcon}
                        alt="arrow"
                        className={style.arrowIcon}
                      />
                    </div>
                  </button>
                </div>
              </div>
              <div className={style.post_main}>
                <div className={style.introduce}>
                  <span className={style.postGray}>소개</span>
                  <span className={style.postBlack}>
                    Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)
                  </span>
                </div>
                <div className={style.point}>
                  <span className={style.postGray}>현재까지 획득한 포인트</span>
                  <Tag
                    variant="studyDetail"
                    size="studyDetailSize"
                    children={"310P 획득"}
                    icon={
                      <img
                        src={pointIcon}
                        alt="point"
                        className={style.pointIcon}
                      />
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={style.bottom_frame}>
            <div className={style.bottom_inner}>
              <span className={style.bottomBlack}>습관 기록표</span>
              {/* 습관 기록표 추가 */}
              <span>
                아직 습관이 없어요
                <br />
                오늘의 습관에서 습관을 생성해보세요
              </span>
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <PasswordModal
          onClose={() => setOpenModal(false)}
          onSubmit={(password) => {
            console.log(password);

            setOpenModal(false);
          }}
        />
      )}
    </div>
  );
}

export default StudyDetailPage;
