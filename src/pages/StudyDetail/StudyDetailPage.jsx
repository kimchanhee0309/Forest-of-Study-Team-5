/**
 * StudyDetailPage
 *
 * 스터디 상세 페이지
 *
 * 기능:
 * - 스터디 정보 조회
 * - 응원 이모지 조회 및 추가
 * - 공유 기능
 * - 수정/삭제 비밀번호 모달 (토스트기능x)
 * - 습관 기록표 조회
 *
 * API 연동 예정:
 * - GET /studies/:id
 * - GET /studies/:id/habits
 * - POST /studies/:id/emojis
 */

import { useEffect, useState } from "react";
import pointIcon from "../../assets/icons/ic_point.png";
import arrowIcon from "../../assets/icons/ic_arrow_right.png";
import style from "./StudyDetail.module.css";
import EmojiReaction from "../../components/study/Emoji/EmojiReaction.jsx";
import PasswordModal from "../../components/study/PasswordModal/PasswordModal.jsx";
import HabitTable from "../../components/study/HabitTable/HabitTable.jsx";
import Tag from "../../components/common/Tag/Tag.jsx";
import { useParams, useNavigate } from "react-router-dom";

function StudyDetailPage() {
  //현재 열려 있는 모달 상태
  const [openModal, setOpenModal] = useState(null);

  /* 습관 기록표 API 호출 */
  //   const [habits, setHabits] = useState([]);

  // useEffect(() => {
  //   fetchHabits();
  // }, []);

  /* 오늘의 습관, 집중 버튼 홈페이지이동 */
  const navigate = useNavigate();

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

  // 게시글 연동 조회
  const { studyId } = useParams();
  // 게시글 API 호출 (현재 임시값)
  const [study, setStudy] = useState(
    {
      id: 1,
      title: "리액트 스터디",
      elapsedDays: 10,
      description: "리액트 기초부터 같이 공부해요",
      point: 100,
      emojis: [],
    },
    {
      id: 2,
      title: "자바스크립트 스터디",
      elapsedDays: 5,
      description: "자바스크립트 기초부터 같이 공부해요",
      point: 50,
      emojis: [],
    },
    // []
  );

  useEffect(() => {
    fetchStudyDetail();
  }, []);

  const fetchStudyDetail = async () => {
    const response = await fetch(`http://localhost:5173/studies/${studyId}`);

    const data = await response.json();

    setStudy(data);
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
              <EmojiReaction studyId={study.id} />
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
                <span className={style.postTitle}>
                  {study.nickname}의 {study.title}
                </span>
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
                  <span className={style.postBlack}>{study.description}</span>
                </div>
                <div className={style.point}>
                  <span className={style.postGray}>현재까지 획득한 포인트</span>
                  <Tag
                    variant="studyDetail"
                    size="studyDetailSize"
                    children={study.point + "P 휙득"}
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
            if (openModal === "edit") {
              navigate(`/studies/${study.id}/update`);
            }
            // if (openModal === "delete") {
            //   console.log("삭제 API");
            // }

            if (openModal === "habit") {
              navigate(`/studies/${study.id}/habits`);
            }

            if (openModal === "focus") {
              navigate(`/studies/${study.id}/focus`);
            }

            setOpenModal(null);
          }}
        />
      )}
    </div>
  );
}

export default StudyDetailPage;
