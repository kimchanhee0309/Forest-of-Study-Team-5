import { createBrowserRouter } from "react-router-dom";

import MainPage from "../pages/MainPage/MainPage.jsx";
import StudyCreatePage from "../pages/StudyCreatePage/StudyCreatePage.jsx";
import FocusPage from "../pages/FocusPage/FocusPage.jsx";
import HabitPage from "../pages/HabitPage/HabitPage.jsx";
import StudyDetailPage from "../pages/StudyDetail/StudyDetailPage.jsx";
import RootLayout from "../layouts/RootLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
  },
  {
    index: true,
    element: <MainPage />,
  },

  {
    path: "/studies/new",
    element: <StudyCreatePage />,
  },

  {
    path: "/studies/:studyId",
    element: <StudyDetailPage />,
  },

  {
    path: "/studies/:studyId/habits",
    element: <HabitPage />,
  },

  {
    path: "/studies/:studyId/focus",
    element: <FocusPage />,
  },

  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

export default router;
