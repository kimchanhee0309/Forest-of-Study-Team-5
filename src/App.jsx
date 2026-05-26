import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GuidePage from "./components/guide/GuidePage.jsx";
import StudyDetail from "./page/StudyDetail/StudyDetailPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GuidePage />} />
        <Route path="/StudyDetail" element={<StudyDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
