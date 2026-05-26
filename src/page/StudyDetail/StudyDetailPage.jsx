import { useState } from "react";
import pointIcon from "../../assets/icons/ic_point.png";
import arrowIcon from "../../assets/icons/ic_arrow_right.png";
import style from "./StudyDetail.module.css";
import EmojiReaction from "../../components/study/Emoji/EmojiReaction.jsx";
import PasswordModal from "../../components/study/PasswordModal/PasswordModal.jsx";
import HabitTable from "../../components/study/HabitTable/HabitTable.jsx";
import { Tag } from "../../components/common/Tag/Tag.jsx";
import { useNavigate } from "react-router-dom";

function StudyDetailPage() {
  const [openModal, setOpenModal] = useState(null);
  /* 습관 기록표 API 가져오기 */
  //   const [habits, setHabits] = useState([]);

  // useEffect(() => {
  //   fetchHabits();
  // }, []);

  /* 오늘의 습관, 집중 이동 */
  // const navigate = useNavigate();

  /* 공유하기 주소 복사 핸들러 */
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      alert("링크가 복사되었습니다.");
    } catch (error) {
      console.error(error);

      alert("복사에 실패했습니다.");
    }
  };
  /* 임시값 */
  const habits = [
    {
      id: 1,
      title: "미라클모닝 6시 기상",

      logs: [true, false, true, true, false, true, false],
    },

    {
      id: 2,
      title: "아침 챙겨 먹기",

      logs: [true, true, false, false, false, false, false],
    },

    {
      id: 3,
      title: "React 스터디 챕 1션 읽기",

      logs: [true, false, false, false, false, false, false],
    },

    {
      id: 4,
      title: "스트레칭",

      logs: [false, false, false, false, false, false, false],
    },
  ];
  return (
    <div className={style.page}>
      <div className={style.container}>
        <div className={style.container_inner}>
          <div className={style.top_frame}>
            <div className={style.action_frame}>
              <EmojiReaction />
              <div className={style.edit_frame}>
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
                {/* 게시글, 소개, 포인트 등 API 연동 필요 */}
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
              <HabitTable habits={habits} />
            </div>
          </div>
        </div>
      </div>
      {/* 값에 따른 버튼 이름 */}
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
