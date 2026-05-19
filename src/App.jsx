import "./App.css";
import { useState } from "react";
import pointIcon from "./assets/icons/ic_point.png";

import {
  Button,
  Chip,
  Modal,
  Popup,
  Toast,
  Dropdown,
  TimerButton,
  HabitItem,
  PasswordModal,
  Tag,
  StudyCard,
} from "./components/common";

function App() {
  const [sort, setSort] = useState("최근 순");
  const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [habits, setHabits] = useState([
    { id: 1, name: "미라클모닝 6시 기상", completed: false },
    { id: 2, name: "아침 챙겨 먹기", completed: false },
  ]);

  const sortOptions = [
    "최근 순",
    "오래된 순",
    "많은 포인트 순",
    "적은 포인트 순",
  ];

  return (
    <>
      <main
        style={{
          minHeight: "100vh",
          padding: "40px",
          backgroundColor: "#414141",
          color: "white",
        }}
      >
        <h1>Common UI Test</h1>

        <section style={{ marginTop: "40px" }}>
          <h2>Button</h2>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Button size="large">만들기</Button>
            <Button size="medium">확인</Button>
            <Button size="small">수정 완료</Button>
            <Button variant="cancel" size="large">
              취소
            </Button>
            <Button disabled size="large" icon="▶">
              Start!
            </Button>
            <Button size="large" icon="▶">
              Start!!
            </Button>
            <Button size="large" icon="⏹">
              Stop!
            </Button>
          </div>
        </section>

        <section style={{ marginTop: "40px", maxWidth: "520px" }}>
          <h2>Chip</h2>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            {habits.map((habit) => (
              <Chip
                key={habit.id}
                completed={habit.completed}
                onClick={() =>
                  setHabits((prev) =>
                    prev.map((item) =>
                      item.id === habit.id
                        ? { ...item, completed: !item.completed }
                        : item,
                    ),
                  )
                }
              >
                {habit.name}
              </Chip>
            ))}
          </div>
        </section>

        <section style={{ marginTop: "40px" }}>
          <h2>Timer Button</h2>

          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <TimerButton type="restart" size="large" />
            <TimerButton type="restart" size="medium" />
            <TimerButton type="restart" size="small" />
            <TimerButton type="restart" size="large" active={false} />

            <TimerButton type="pause" size="large" />
            <TimerButton type="pause" size="medium" />
            <TimerButton type="pause" size="small" />
            <TimerButton type="pause" size="large" active={false} />
          </div>
        </section>

        <section style={{ marginTop: "40px" }}>
          <h2>Dropdown</h2>

          <Dropdown value={sort} options={sortOptions} onChange={setSort} />
        </section>

        <section style={{ marginTop: "80px" }}>
          <h2>Toast</h2>

          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            <Toast type="point" message="50포인트를 획득했습니다!" />
            <Toast type="warning" message="집중이 중단되었습니다." />
          </div>
        </section>

        <section style={{ marginTop: "40px" }}>
          <h2>Modal / Popup</h2>

          <div style={{ display: "flex", gap: "16px" }}>
            <Button onClick={() => setShowModal(true)}>Modal 열기</Button>
            <Button onClick={() => setShowPopup(true)}>Popup 열기</Button>
          </div>
        </section>

        <section style={{ marginTop: "40px" }}>
          <h2>PasswordModal</h2>

          <div style={{ display: "flex", gap: "16px" }}>
            <Button onClick={() => setShowPasswordModal(true)}>
              PasswordModal 열기
            </Button>
          </div>
        </section>

        <section style={{ marginTop: "40px" }}>
          <h2>Tag</h2>

          <div style={{ display: "flex", gap: "16px" }}>
            <Tag icon={<img src={pointIcon} alt="" width={20} />}>
              310P 획득
            </Tag>
            <Tag icon="🧑🏻‍💻">37</Tag>
            <Tag
              variant="gray"
              size="large"
              icon={<img src={pointIcon} alt="" width={28} />}
            >
              310P 획득
            </Tag>
          </div>
        </section>

        <section style={{ marginTop: "40px" }}>
          <h2>StudyCard</h2>

          <div style={{ display: "flex", gap: "16px" }}>
            <StudyCard
              title="이유디의 UX 스터디"
              elapsedDays={62}
              description="Slow And Steady Wins The Race!!"
              point={310}
              emojis={[
                { id: 1, icon: "🧑🏻‍💻", count: 37 },
                { id: 2, icon: "🔥", count: 26 },
                { id: 3, icon: "🤍", count: 14 },
              ]}
            />
          </div>
        </section>

        {showModal && (
          <Modal title="습관 목록" onClose={() => setShowModal(false)}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <HabitItem
                text="미라클모닝 6시 기상"
                onDelete={() => console.log("삭제")}
              />

              <HabitItem
                text="아침 챙겨 먹기"
                onDelete={() => console.log("삭제")}
              />

              <HabitItem
                text="React 스터디 책 1챕터 읽기"
                onDelete={() => console.log("삭제")}
              />

              <Button size="medium" fullWidth>
                +
              </Button>

              <div style={{ display: "flex", gap: "24px", marginTop: "24px" }}>
                <Button variant="cancel" size="medium" fullWidth>
                  취소
                </Button>

                <Button size="medium" fullWidth>
                  수정 완료
                </Button>
              </div>
            </div>
          </Modal>
        )}

        {showPopup && (
          <Popup
            message="정말 나가시겠습니까?"
            onCancel={() => setShowPopup(false)}
            onConfirm={() => setShowPopup(false)}
          />
        )}

        {showPasswordModal && (
          <PasswordModal
            title="연우의 개발공장"
            buttonText="수정하러 가기"
            onClose={() => setShowPasswordModal(false)}
            onSubmit={(password) => {
              console.log("입력한 비밀번호: ", password);
              setShowPasswordModal(false);
            }}
          />
        )}
      </main>
    </>
  );
}

export default App;
