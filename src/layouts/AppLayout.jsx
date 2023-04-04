import { Outlet } from "react-router-dom";
import Sidenav from "../components/Sidenav";
import Topnav from "../components/Topnav";

function AppLayout() {
  return (
    <div id="layout-app">
      <Sidenav />
      <Topnav />
      <Outlet />
    </div>
  );
  s;
}

export default AppLayout;
