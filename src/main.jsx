import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";

import "./styles/reset.css";
import "./styles/theme.css";
import "./styles/global.css";
/*import App from "./App.jsx"; */

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
