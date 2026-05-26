/**
 * StudyDetailPage
 *
 * 스터디 상세 페이지
 *
 * 기능:
 * - 스터디 정보 조회
 * - 응원 이모지 조회 및 추가
 * - 공유 기능
 * - 수정/삭제 비밀번호 모달
 * - 습관 기록표 조회
 *
 * API 연동 예정:
 * - GET /studies/:id
 * - GET /studies/:id/habits
 * - POST /studies/:id/emojis
 */

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
  //현재 열려 있는 모달 상태
  const [openModal, setOpenModal] = useState(null);

  /* 습관 기록표 API 가져오기 */
  //   const [habits, setHabits] = useState([]);

  // useEffect(() => {
  //   fetchHabits();
  // }, []);

  /* 오늘의 습관, 집중 버튼 홈페이지이동 */
  // const navigate = useNavigate();

  // [공유하기] 현재 페이지 URL 복사
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      alert("링크가 복사되었습니다.");
    } catch (error) {
      console.error(error);

      alert("복사에 실패했습니다.");
    }
  };

  //  임시 습관 기록표 값
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
            {/* 이모지와 공유하기, 수정하기 라인 */}
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

            {/* 스터디 게시글 API 라인 */}
            {/* 스터디 이름 API 연동 필요 */}
            <div className={style.post_frame}>
              <div className={style.post_header}>
                <span className={style.postTitle}>"연우"의 개발공장</span>
                <div className={style.post_btn_frame}>
                  {/* 오늘의 습관, 집중을 눌렀을때 나타나는 모달구현 */}
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
                {/* 소개, 포인트 등 API 연동 필요 */}
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
      {/* [모달] 값에 따른 버튼 이름 배치 */}
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
          // [모달] 페이지 이동 코드
          onClose={() => setOpenModal(null)}
          onSubmit={(password) => {
            console.log(password);
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
