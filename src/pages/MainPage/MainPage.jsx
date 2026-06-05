import { useEffect, useState } from "react";
import { useStudies } from "../../hooks/useStudies";
import StudyCard from "../../components/study/StudyCard/StudyCard";
import styles from "./MainPage.module.css";
import searchIcon from "../../assets/icons/ic_search.png";
import Dropdown from "../../components/common/Dropdown/Dropdown";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/api.js";

// 메인 페이지 기능
// - 스터디 목록 불러오기
// - 검색 기능 (필터) 백엔드에서 데이터 받아오기
// - 드롭다운 버튼 (최근 순, 오래된 순, 포인트 많은 순, 포인트 적은 순)
// - Loadmore 더보기 버튼 (데이터 없을시에는 보이지 않음 확인 완료)

//로컬스토리지

const RECENT_STUDIES_KEY = "recentStudies";
const MAX_RECENT = 3;

//백엔드랑 드롭다운 매핑
const SORT_MAP = {
  "최근 순": "recent",
  "오래된 순": "oldest",
  "많은 포인트 순": "point_desc",
  "적은 포인트 순": "point_asc",
};

function MainPage() {
  //최근 조회 스터디 (연동 필요)

  const [recentStudyIds, setRecentStudyIds] = useState(() => {
    const saved = localStorage.getItem(RECENT_STUDIES_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [recentStudies, setRecentStudies] = useState([]);
  // 스터디 검색 기능, 정렬순, loadmore

  const [inputValue, setInputValue] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("최근 순");
  const sortOptions = [
    "최근 순",
    "오래된 순",
    "많은 포인트 순",
    "적은 포인트 순",
  ];
  const [page, setPage] = useState(1);

  const params = {
    keyword: searchKeyword,
    sort: SORT_MAP[sortOrder],
    page,
    limit: 6,
  };

  //hook 호출
  const { studies, totalCount, isLoading, error } = useStudies(params);

  //상세페이지 이동
  const navigate = useNavigate();

  // 카드 클릭시 로컬스토리지 핸들러
  const handleStudyClick = (study) => {
    const filtered = recentStudyIds.filter((id) => id !== study.id);
    const updated = [study.id, ...filtered].slice(0, MAX_RECENT);
    localStorage.setItem(RECENT_STUDIES_KEY, JSON.stringify(updated));
    setRecentStudyIds(updated);
    navigate(`/studies/${study.id}`);
  };

  //검색 핸들러
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    //입력값이 없어지면 검색어 초기화
    if (e.target.value === "") {
      setPage(1);
      setSearchKeyword("");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    setPage(1);
    setSearchKeyword(inputValue);
  };

  // 더보기 핸들러
  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    async function fetchRecentStudies() {
      try {
        const results = await Promise.all(
          recentStudyIds.map(async (id) => {
            const response = await fetch(`${BASE_URL}/studies/${id}`);

            if (!response.ok) return null;

            const result = await response.json();
            return result.data ?? result;
          }),
        );

        setRecentStudies(results.filter(Boolean));
      } catch (error) {
        console.error("최근 조회 스터디 불러오기 실패", error);
      }
    }

    if (recentStudyIds.length > 0) {
      fetchRecentStudies();
    } else {
      setRecentStudies([]);
    }
  }, [recentStudyIds]);

  return (
    <div className={styles.mainPage}>
      {/*섹션 1: 최근 조회한 스터디*/}
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
                point={study.totalPoint}
                emojis={study.studyEmojis}
                background={study.background}
                onClick={() => handleStudyClick(study)}
                type="recent"
              />
            ))}
          </div>
        )}
      </section>

      <section
        className={`${styles.studyList} ${studies.length === 0 ? styles.studyListEmpty : ""}`}
      >
        <h2 className={styles.sectionTitle}>스터디 둘러보기</h2>

        {/*서치바, 드롭다운 한번에 묶기*/}
        <div className={styles.controlBar}>
          <form onSubmit={handleSearch}>
            <div className={styles.searchBar}>
              <div className={styles.searchInputWrapper}>
                <img
                  src={searchIcon}
                  alt="검색"
                  className={styles.searchIcon}
                />
                <input
                  className={styles.searchInput}
                  type="text"
                  placeholder="검색"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </form>
          <div className={styles.dropdownWrapper}>
            <Dropdown
              value={sortOrder}
              options={sortOptions}
              onChange={(selected) => {
                setPage(1);
                setSortOrder(selected);
              }}
            />
          </div>
        </div>
        {isLoading ? (
          <p>불러오는 중...</p>
        ) : error ? (
          <p>에러: {error}</p>
        ) : studies.length === 0 ? (
          <div className={styles.emptyContainer}>
            <p className={styles.emptyMessage}>아직 둘러 볼 스터디가 없어요 </p>
          </div>
        ) : (
          <>
            <div className={styles.studyCardGrid}>
              {studies.map((study) => (
                <StudyCard
                  key={study.id}
                  title={study.title}
                  elapsedDays={study.elapsedDays}
                  description={study.description}
                  point={study.totalPoint}
                  emojis={study.studyEmojis}
                  background={study.background}
                  onClick={() => handleStudyClick(study)}
                  type="list"
                />
              ))}
            </div>
            {/* 더보기 버튼: 더 보여줄 데이터가 있을때에 만 표시 */}
            {studies.length < totalCount && (
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
