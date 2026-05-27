import { Outlet } from "react-router-dom";

import GNB from "../components/common/GNB/GNB.jsx";

function RootLayout() {
  return (
    <>
      <GNB />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
