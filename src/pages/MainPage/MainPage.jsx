import { useState, useEffect } from "react";
import StudyCard from "../../components/study/StudyCard/StudyCard";
import styles from "./MainPage.module.css";
import searchIcon from "../../assets/icons/ic_search.png";
import Dropdown from "../../components/common/Dropdown/Dropdown";

function MainPage() {
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
  ]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("최근 순");
  const sortOptions = [
    "최근 순",
    "오래된 순",
    "많은 포인트 순",
    "적은 포인트 순",
  ];
  useEffect(() => {}, []);

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
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
                point={study.point}
                emojis={study.emojis}
                onClick={() => console.log(study.id)}
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

        {sortedStudies.length === 0 ? (
          <div className={styles.emptyContainer}>
            <p className={styles.emptyMessage}>아직 둘러 볼 스터디가 없어요 </p>
          </div>
        ) : (
          <div className={styles.studyCardGrid}>
            {sortedStudies.map((study) => (
              <StudyCard
                key={study.id}
                title={study.title}
                elapsedDays={study.elapsedDays}
                description={study.description}
                point={study.point}
                emojis={study.emojis}
                onClick={() => console.log(study.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
export default MainPage;
