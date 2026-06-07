# 1. Git 및 브랜치 규칙

## 1-1. Git 명령어 관련

- 작업 시작 전: **git checkout dev → git pull origin dev → git checkout -b feature/[기능명]**
- 작업 중/후: git add . → git commit -m "[커밋 컨벤션]: [내용]" → **push 하기전 dev 브런치 pull**
- git push origin feature/[기능명]
- PR(Pull Request) 전략:
  → 작업 완료 후 dev 브랜치로 PR 생성
  → 팀원 코드 리뷰 후 승인(Approve)을 받아 Merge
  → PR (Pull Request): main 또는 dev에 직접 푸시 금지. PR 생성 후 최소 1명 Approve 시 Merge.

## 1-2. 충돌(Conflict) 발생 시

- 단톡방(디스코드)에 충돌 발생 오류 말하기
- PR 생성 후 GitHub에서 **"This branch has conflicts"** 라는 경고가 뜬다면,
  로컬에서 git merge dev를 통해 충돌을 해결한 뒤 다시 push
  (충돌 해결 후에는 PR이 자동으로 업데이트되어 Merge 가능 상태가 됩니다.)

## 1-3. 절대 금지 명령어

- git push -force, git reset --hard (팀원 코드 유실 위험, 사용 전 논의 필수)

## 1-4. 브랜치 네이밍

- 타입/작업내용 (예: feature/login, fix/login-error)

## 1-5. 커밋 컨벤션

- feat: 기능 추가
- fix: 버그 수정
- refactor: 리팩토링
- (예시) feat: 신규 반복 습관 생성 API 구현

---

# 2. Frontend (React) 규칙

## 2-1. CSS 단위

- 초기 작업 시 rem 사용을 지양하고, px 단위로 먼저 작업

## 2-2. 반응형 작업

- Desktop, Tablet, Mobile 해상도(Breakpoint)를 분리하여 px 기준으로 개별 맞춤 작업 진행

## 2-3. 네이밍 통일

- 각 프론트 페이지 및 컴포넌트는 페이지 역할 기준으로 명확히 작성 (예: StudyCreatePage.jsx)
- 작업용 브랜치(dev) -> git pull 했을시 -> 겹치는 컴포넌트 네임있는지 확인후 작성 겹칠시 단톡방(디스코드)에 공지

---

# 3. Backend (Node.js + Prisma) 규칙

## 3-1. 네이밍 통일

- 프론트엔드와 동일하게 도메인/페이지 기준으로 통일 (예: studyController.js)

## 3-2. 스키마 변경 공유 (중요)

- schema.prisma 수정 시 DB 구조 충돌 잦음. 변경 시 단톡방(디스코드) 및 팀원 공유 필수.

## 3-3. 마이그레이션 필수

- 팀원이 스키마 변경 시, 최신 코드 Pull 이후 아래 명령어 순차 실행
  → npm install (패키지 변동 시)
  → npx prisma migrate dev (DB 동기화)
  → npx prisma generate (클라이언트 업데이트)

# 4. 공통 유의사항

## 4-1. Node.js 버전 통일

- 환경 차이로 인한 에러를 막기 위해 팀 표준 Node.js 버전을 맞추기
- 팀장님 Node.js 버전 : v24.14.1
- PostgreSQL 로컬 포트가 다를 경우 충돌이 남. (기본값 5432)
- gitigonore 파일 생성후 .env , node_modules 포함 (중요함!!!!!!)
- 환경 변수 (.env): 깃허브 업로드 절대 금지. 변수 추가 시 .env.example 갱신 후 단톡방 공유.

## 4-2. env_example 예시

- 서버 포트 (기본 3000) : PORT=3000
- 데이터베이스 주소 (실제 비번은 지우고 형식만 알려줌)
  → 형식: postgresql://사용자명:비밀번호@localhost:5432/데이터베이스명
  → DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/my_db

## 4-3. 패키지 추가 (npm)

- 새로운 라이브러리 설치 시, 다른 팀원들이 npm install을 할 수 있도록 단톡방에 즉시 공유.

## 4-4. 포트 번호 표준화

- 프로젝트 내 모든 설정(데이터베이스, 서버 포트 등)은 기본값(DB: 5432, Server: 3000 등)으로 통일합니다. (팀장님 포트번호로 맞출 예정)
- 포트 번호 표준화를 안하면 매번 포트번호 관련 코드를 수정해야됩니다
- 부득이하게 변경해야 할 경우, 팀원들에게 공유하고 .env 파일을 로컬 환경에 맞춰 관리합니다.

# 5.아침 9시 출석 후 작업 전 git pull 채팅 치기

# 6. 프로젝트 기간 내 휴가 및 공가(예:예비군 훈련) 사용시 단톡방(디스코드 공유 요청)

ex 김지훈 / 2026.5.26 / 휴가 / 개인사유
ex 김지훈 / 2026.5.27/ 공가 /예비군 훈련
몸이 아프시거나 그럴경우 컨디션 회복후에 디코로 말씀해주시면 됩니다.

# 7. 아침 팀회의때 팀 협업 규칙 설명 포트번호 설명 ,node.js 버전 설명등

- 기초 세팅 설명 및 세팅 후 프로젝트 작업 시작 예정, 스타일 없어도 됨
- package.lock.json 파일 오류시 파일은 건들면 안됩니다
- npm 캐시 클린 해서 로컬에서 다시 npm install
