import { useState, useEffect } from "react";
import StudyCard from "../../components/study/StudyCard/StudyCard";
import styles from "./MainPage.module.css";
import searchIcon from "../../assets/icons/ic_search.png";
import Dropdown from "../../components/common/Dropdown/Dropdown";
import { useNavigate } from "react-router-dom";

// 메인 페이지 기능
// - 스터디 목록 불러오기
// - 검색 기능 (필터)
// - 드롭다운 버튼 (최근 순, 오래된 순, 포인트 많은 순, 포인트 적은 순)
// - Loadmore 더보기 버튼 (데이터 없을시에는 보이지 않음 확인 완료)

//API 연동 필요
//- GET / studies

function MainPage() {
  //최근 목록 조회 및 테스트 데이터
  const [recentStudies, setRecentStudies] = useState([
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
    {
      id: 3,
      title: "백엔드 스터디",
      elapsedDays: 3,
      description: "백엔드 기초부터 같이 공부해요",
      point: 30,
      emojis: [],
    },
    {
      id: 4,
      title: "풀스택 스터디",
      elapsedDays: 20,
      description: "풀스택 기초부터 같이 공부해요",
      point: 200,
      emojis: [],
    },
  ]);
  //스터디 둘러보기 목록 및 테스트 데이터
  const [studies, setStudies] = useState([
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
    {
      id: 3,
      title: "테스트 스터디",
      elapsedDays: 5,
      description: "자바스크립트 기초부터 같이 공부해요",
      point: 50,
      emojis: [],
    },
    {
      id: 4,
      title: "이얍 스터디",
      elapsedDays: 5,
      description: "자바스크립트 기초부터 같이 공부해요",
      point: 50,
      emojis: [],
    },
    {
      id: 5,
      title: "자바스크립트 스터디",
      elapsedDays: 5,
      description: "자바스크립트 기초부터 같이 공부해요",
      point: 50,
      emojis: [],
    },
    {
      id: 6,
      title: "와라라랄 스터디",
      elapsedDays: 5,
      description: "자바스크립트 기초부터 같이 공부해요",
      point: 50,
      emojis: [],
    },
    {
      id: 7,
      title: "오메 스터디",
      elapsedDays: 5,
      description: "자바스크립트 기초부터 같이 공부해요",
      point: 50,
      emojis: [],
    },
  ]);
  // 스터디 검색 기능, 정렬순, loadmore
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("최근 순");
  const sortOptions = [
    "최근 순",
    "오래된 순",
    "많은 포인트 순",
    "적은 포인트 순",
  ];
  const [visibleCount, setVisibleCount] = useState(6);

  //기초 세팅
  useEffect(() => {}, []);

  //상세페이지 이동
  const navigate = useNavigate();

  //검색 핸들러
  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  // 더보기 핸들러
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6); // 더보기 버튼 누를때 마다 6개씩 증가
  };

  //검색 필터링
  const filteredStudies = studies.filter((study) =>
    study.title.includes(searchKeyword),
  );
  //정렬
  const sortedStudies = [...filteredStudies].sort((a, b) => {
    switch (sortOrder) {
      case "최근 순":
        return a.elapsedDays - b.elapsedDays;
      case "오래된 순":
        return b.elapsedDays - a.elapsedDays;
      case "많은 포인트 순":
        return b.point - a.point;
      case "적은 포인트 순":
        return a.point - b.point;
      default:
        return 0;
    }
  });

  // 더보기 개수 제한
  const visibleStudies = sortedStudies.slice(0, visibleCount);

  return (
    <div className={styles.mainPage}>
      {/*섹션 1: 최근 조회한 스터디*/}
      {/* 스터디 카드 데이터 상세 페이지 이동 추가 필요 현재는 아이디만 받는중(166 - onClick)*/}
      <section className={styles.recentStudies}>
        <h2 className={styles.sectionTitle}>최근 조회한 스터디</h2>
        {recentStudies.length === 0 ? (
          <div className={styles.emptyContainer}>
            <p className={styles.emptyMessage}>
              아직 조회한 스터디가 없어요
            </p>{" "}
          </div>
        ) : (
          <div className={styles.recentCardList}>
            {recentStudies.slice(0, 3).map((study) => (
              <StudyCard
                key={study.id}
                title={study.title}
                elapsedDays={study.elapsedDays}
                description={study.description}
                point={study.point}
                emojis={study.emojis}
                onClick={() => navigate(`/studies/${study.id}`)}
              />
            ))}
          </div>
        )}
      </section>

      <section className={styles.studyList}>
        <h2 className={styles.sectionTitle}>스터디 둘러보기</h2>

        <div className={styles.searchBar}>
          <div className={styles.searchInputWrapper}>
            <img src={searchIcon} alt="검색" className={styles.searchIcon} />
            <input
              className={styles.searchInput}
              type="text"
              placeholder="검색"
              value={searchKeyword}
              onChange={handleSearch}
            />
          </div>
          <div className={styles.dropdownWrapper}>
            <Dropdown
              value={sortOrder}
              options={sortOptions}
              onChange={(selected) => setSortOrder(selected)}
            />
          </div>
        </div>
        {/* 스터디 카드 데이터 상세 페이지 이동 추가 필요 현재는 아이디만 받는중(211 - onClick)*/}
        {visibleStudies.length === 0 ? (
          <div className={styles.emptyContainer}>
            <p className={styles.emptyMessage}>아직 둘러 볼 스터디가 없어요 </p>
          </div>
        ) : (
          <>
            <div className={styles.studyCardGrid}>
              {visibleStudies.map((study) => (
                <StudyCard
                  key={study.id}
                  title={study.title}
                  elapsedDays={study.elapsedDays}
                  description={study.description}
                  point={study.point}
                  emojis={study.emojis}
                  onClick={() => navigate(`/studies/${study.id}`)}
                />
              ))}
            </div>
            {/* 더보기 버튼: 더 보여줄 데이터가 있을때에 만 표시 */}
            {visibleCount < sortedStudies.length && (
              <button
                className={styles.loadMoreButton}
                onClick={handleLoadMore}
              >
                더보기
              </button>
            )}
          </>
        )}
      </section>
    </div>
  );
}
export default MainPage;
