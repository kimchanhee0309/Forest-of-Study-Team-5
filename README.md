# Team 5
**Notion 링크** : https://app.notion.com/p/899f88fb05a9830f99c7813a4167cfea?v=a42f88fb05a982b38f2088cf57d469d5

# 팀원 구성
김찬희(팀장)
김지훈(부팀장)
권태현
류재은
문치호
전현선

___

# 프로젝트 소개
- 꾸준한 학습 습관을 만드는 스터디 사이트 제작
- 프로젝트 기간: 2026.05.18 ~ 2026.06.08

___

# 기술 스택
- **Frontend**: JavaScript, CSS, React.js
- **Backend**: Node.js, Express.js, Prisma
- **DB**: PostgreSQL
- **공통 Tool**: Github, Discord, Zep, Notion, Figma
- **배포**: Netlify, Render

___

# 팀원별 구현 기능 상세
<details>
  <summary>김찬희</summary>

  #### FE 레포 세팅
  - 브랜치 배포, 초기 세팅 후 팀원들에게 공유
  - 필요한 npm install 등

  #### GNB 구현
  - 공통으로 쓰는 header 부분 로고 및 만들기 버튼 구현(false 시 버튼 안나오게)
    
  #### 공용 컴포넌트 
  - 팀원들이 사용할 공용 컴포넌트 구현(버튼, 모달, StudyCard 등 전체)
  - 반응형 구현

  #### Rouer/Layout 작업
  - Route 작업 진행 및 Outlet 활용한 Layout 구현

  #### 스터디 수정 페이지
  - fetch(PATCH)을 사용하여 스터디 페이지 수정 기능 구현
</details>

<details>
  <summary>김지훈</summary>

  #### 오늘의 습관 페이지
  - 현재 시간 표시 컴포넌트 구현
  - 습관 종료 버튼 및 이전 기록 유지 안내 재확인 팝업 UI 구현
  - 백엔드 분리된 API(검증, 조회, 추가, 수정 로그 업데이트) 연동

  #### API 명세서 작성
</details>

<details>
  <summary>권태현</summary>

  #### 스터디 상세 페이지
  - 스터디 기본 정보(이름, 소개, 포인트) 영역 UI 구현
  - 상위 3개 표시를 포함한 응원 이모지 반응 영역 UI 구현
  - 상위 3개 카운팅 기반 응원 이모지 렌더링 및 클릭 반응 영역 UI 구현
  - API를 활용한 스터디 주소 외부 공유 기능 구현(기본 BE에서 FE 단독 Task로 이동)
  - 다른 페이지(오늘의 습관/집중) 이동 버튼 구성
  - 정보 수정하기 및 삭제하기 모달 UI 구현
  - 데이터 유무(Empty State)에 따른 습관 기록표 UI 구현
  - 백엔드 API 연동 및 상태값 바인딩
</details>

<details>
  <summary>류재은</summary>

  #### 스터디 생성 페이지
  - 입력 폼을 포함한 전체 UI 뼈대 마크업
  - 닉네임, 스터디명 등 입력값 상태(State) 연결
  - 스터디 배경 이미지 선택 기능 구현
  - 비밀번호 입력 및 재확인 유효성 검사(Validation) 로직 구현
  - 스터디 생성 API 연동 및 결과 처리
  - 기기별 반응형 UI 처리
</details>

<details>
  <summary>문치호</summary>

  #### 오늘의 집중 페이지
  - 전체 페이지 레이아웃 구현(스터디 정보, 포인트 표시)
  - 카운트다운 로직 및 컨트롤 버튼 구현(일시정지/재개는 프론트 내부 상태로 관리)
  - 초과 시간 측정 타이머 로직(음수 구간) 구현
  - 설정 시간 기반 포인트 계산 구현
  - 완료 처리 로직(타이머 리셋, 성공 토스트 알림, 획득 포인트 렌더링) 구현
  - 집중 시작 및 완료 API 연동
  - 기기별 반응형 UI cjfl
</details>

<details>
  <summary>전현선</summary>

  #### 메인 홈
  - 페이지 기본 UI 및 빈 화면(Empty state) 컴포넌트 구현
  - 스터디 목록 API 연동 및 렌더링
  - 스터디 검색 및 조건별 정렬 기능 UI/연동 구현
  - 더보기(Load more) 버튼 등 페이지네이션 UI 구현
  - LocalStorage를 활용한 최근 조회한 스터디 고유 ID 저장 및 상단 표시 기능 구현
  - 기기별 반응형 UI 처리
</details>

___

# 파일 구조
```txt
```

___

# 구현 홈페이지
https://forest-of-study-team5.netlify.app

____

# 프로젝트 회고록
