// 1. 기존 GuidePage를 지우고, 방금 만든 HabitPage를 불러옵니다.
import HabitPage from "./components/habit/HibitPage";

function App() {
  return (
    <div>
      {/* 2. HabitPage 컴포넌트를 사용합니다. */}
      <HabitPage />
    </div>
  );
}

export default App;
