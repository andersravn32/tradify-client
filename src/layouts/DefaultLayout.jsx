import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function DefaultLayout() {
  return (
    <div id="layout-default">
      <Navbar />
      <Outlet />
    </div>
  );s
}

export default DefaultLayout;
