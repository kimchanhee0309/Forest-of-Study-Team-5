import { useState, useEffect } from "react";
import StudyCard from "../components/study/StudyCard/StudyCard";
import styles from "./MainPage.module.css";

function MainPage() {
  const [recentStudies, setRecentStudies] = useState([]);

  const [studies, setStudies] = useState([]);

  useEffect(() => {}, []);

  {
    /* const handleSearch = () => {
     //검색 기능 구현 예정
   };*/
  }

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
          recentStudies.map((study) => <div key={study.id}>{study.title}</div>)
        )}
      </section>
      <section className={styles.studyList}>
        <h2 className={styles.sectionTitle}>스터디 둘러보기</h2>

        {/*input 및 정렬은 다음에작업*/}

        {studies.length === 0 ? (
          <div className={styles.emptyContainer}>
            <p className={styles.emptyMessage}>아직 둘러 볼 스터디가 없어요 </p>
          </div>
        ) : (
          <div className={styles.studyCardGrid}>
            {studies.map((study) => (
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
