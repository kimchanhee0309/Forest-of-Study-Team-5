/**
 * 스터디 상세 페이지
 *
 * 기능:
 * - 스터디 정보 조회
 * - 응원 이모지 조회 및 추가
 * - 공유 기능
 * - 수정/삭제/부가기능 비밀번호 모달
 * - 습관 기록표 조회
 *
 */

import { useEffect, useState } from "react";
import pointIcon from "../../assets/icons/ic_point.png";
import arrowIcon from "../../assets/icons/ic_arrow_right.png";
import style from "./StudyDetail.module.css";
import EmojiReaction from "../../components/study/Emoji/EmojiReaction.jsx";
import PasswordModal from "../../components/study/PasswordModal/PasswordModal.jsx";
import HabitTable from "../../components/study/HabitTable/HabitTable.jsx";
import Tag from "../../components/common/Tag/Tag.jsx";
import Toast from "../../components/common/Toast/Toast.jsx";
import GNB from "../../components/common/GNB/GNB";
import { useParams, useNavigate } from "react-router-dom";
import { verifyPassword, deleteStudy } from "../../api/modal.js";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

function StudyDetailPage() {
  // [모달] 활성화, 비활성화
  const [openModal, setOpenModal] = useState(null);

  // [토스트] 비밀번호 실패 여부
  const [toastMessage, setToastMessage] = useState("");

  // 홈페이지 이동 함수 선언
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

  // 스터디 연동 조회
  const { studyId } = useParams();

  // 스터디 API 호출
  const [study, setStudy] = useState(null);
  const fetchStudyDetail = async () => {
    try {
      const response = await fetch(`${BASE_URL}/studies/${studyId}`);

      if (!response.ok) {
        throw new Error("조회 실패");
      }

      const data = await response.json();

      setStudy(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchStudyDetail();
  }, [studyId]);

  if (!study) {
    return <span className={style.loding}>로딩중..</span>;
  }

  // 습관 기록표 API 호출
  const habits =
    study?.habits?.map((habit) => ({
      id: habit.id,
      title: habit.title,
      logs: habit.habitLogs.map((log) => log.isChecked),
    })) || [];

  return (
    <div className={style.page}>
      <GNB showButton={false} />
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
                {/* [모달] 페이지 복사, 이동, 삭제 */}
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

            {/* 스터디 기본정보 API 라인 */}
            <div className={style.post_frame}>
              <div className={style.post_header}>
                <span className={style.postTitle}>
                  {study.nickname}의 {study.title}
                </span>
                <div className={style.post_btn_frame}>
                  {/* [모달] 오늘의 습관, 오늘의 집중 페이지 이동*/}
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
                {/* 소개, 포인트 등 API 연동 */}
                <div className={style.introduce}>
                  <span className={style.postGray}>소개</span>
                  <span className={style.postBlack}>{study.description}</span>
                </div>
                <div className={style.point}>
                  <span className={style.postGray}>현재까지 획득한 포인트</span>
                  <Tag
                    variant="studyDetail"
                    size="studyDetailSize"
                    children={`${study.totalPoint}P 획득`}
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
          title={`${study.nickname}의 ${study.title}`}
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
          onSubmit={async (password) => {
            try {
              await verifyPassword(study.id, password);

              if (openModal === "edit") {
                navigate(`/studies/${study.id}/update`);
              }

              if (openModal === "delete") {
                await deleteStudy(study.id);
                alert("스터디가 삭제되었습니다.");
                navigate("/");
              }

              if (openModal === "habit") {
                navigate(`/studies/${study.id}/habits`);
              }

              if (openModal === "focus") {
                navigate(`/studies/${study.id}/focus`);
              }

              setOpenModal(null);
            } catch (error) {
              setToastMessage("🚨 비밀번호가 일치하지 않습니다.");
              setTimeout(() => {
                setToastMessage("");
              }, 2222);
            }
          }}
        />
      )}

      {/* [토스트] 비밀번호 틀렸을 시 */}
      {toastMessage && (
        <div className={style.toast}>
          <Toast type="warning" message={toastMessage} />
        </div>
      )}
    </div>
  );
}

export default StudyDetailPage;
