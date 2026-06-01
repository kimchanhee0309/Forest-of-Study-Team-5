/*import GuidePage from "./components/guide/GuidePage.jsx";*/

import { Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage/MainPage.jsx";
import StudyCreatePage from "./pages/StudyCreatePage/StudyCreatePage.jsx";
import FocusPage from "./pages/FocusPage/FocusPage.jsx";
import HabitPage from "./pages/Habitpages/HabitPage.jsx";
import StudyDetailPage from "./pages/StudyDetail/StudyDetailPage.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import UpdateStudyPage from "./pages/UpdatePage/UpdateStudyPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<MainPage />} />
        <Route path="studies/new" element={<StudyCreatePage />} />
      </Route>
      <Route path="studies/:studyId/habits" element={<HabitPage />} />
      <Route path="studies/:studyId" element={<StudyDetailPage />} />
      <Route path="studies/:studyId/focus" element={<FocusPage />} />
      <Route path="studies/:studyId/update" element={<UpdateStudyPage />} />
    </Routes>
  );
}
export default App;
