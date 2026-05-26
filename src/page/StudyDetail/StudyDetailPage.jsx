import { useState } from "react";
import pointIcon from "../../assets/icons/ic_point.png";
import arrowIcon from "../../assets/icons/ic_arrow_right.png";
import style from "./StudyDetail.module.css";
import EmojiReaction from "../../components/study/Emoji/EmojiReaction.jsx";
import PasswordModal from "../../components/study/PasswordModal/PasswordModal.jsx";
import { Tag, Sticker } from "../../components/common";
// import { useNavigate } from "react-router-dom";

function StudyDetailPage() {
  const [openModal, setOpenModal] = useState(null);
  const [habits, setHabits] = useState([]);
  // const navigate = useNavigate();
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      alert("링크가 복사되었습니다.");
    } catch (error) {
      console.error(error);

      alert("복사에 실패했습니다.");
    }
  };
  return (
    <div className={style.page}>
      <div className={style.container}>
        <div className={style.container_inner}>
          <div className={style.top_frame}>
            <div className={style.action_frame}>
              <EmojiReaction />
              <div className={style.edit_frame}>
                {/* URL 복사기능 추가 필요 */}
                <button onClick={handleShare} className="edit-btn">
                  <span className={style.editGreen}>공유하기</span>
                </button>
                {/* 페이지 이동 추가 필요 */}
                <span className={style.editGreen}>|</span>
                <button
                  onClick={() => setOpenModal("edit")}
                  className="edit-btn"
                >
                  <span className={style.editGreen}>수정하기</span>
                </button>
                <span className={style.editGray}>|</span>
                <button
                  onClick={() => setOpenModal("delete")}
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
                  {/* 페이지 이동 추가 필요 */}
                  <button
                    onClick={() => setOpenModal("habit")}
                    className={style.post_btn}
                  >
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
                      <span
                        onClick={() => setOpenModal("focus")}
                        className={style.btnGray}
                      >
                        오늘의 집중
                      </span>
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
              {/* 데이터 유무에 따른 습관 기록표 추가 및 상태값 */}
              {habits.length === 0 ? (
                <div className={style.bottom_state}>
                  <span>
                    아직 습관이 없어요 <br />
                    오늘의 습관에서 습관을 생성해보세요
                  </span>
                </div>
              ) : (
                <div>{/*습관 기록표 들어갈 자리 */}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <PasswordModal
          buttonText={
            openModal === "edit"
              ? "수정하러 가기"
              : openModal === "delete"
                ? "삭제하기"
                : openModal === "habit"
                  ? "오늘의 습관으로 가기"
                  : "오늘의 집중으로 가기"
          }
          onClose={() => setOpenModal(null)}
          onSubmit={(password) => {
            console.log(password);
            {
              /* 페이지 이동 */
            }
            // if (openModal === "edit") {
            //   navigate("/study/edit/1");
            // }
            // if (openModal === "delete") {
            //   console.log("삭제 API");
            // }

            // if (openModal === "habit") {
            //   navigate("/habit");
            // }

            // if (openModal === "focus") {
            //   navigate("/focus");
            // }

            setOpenModal(null);
          }}
        />
      )}
    </div>
  );
}

export default StudyDetailPage;
