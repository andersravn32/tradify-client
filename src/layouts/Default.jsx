import { Outlet, useNavigate } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import { useEffect, useState } from "react";
import Sidenav from "../components/ui/Sidenav";
import Topnav from "../components/ui/Topnav";

const AuthContext = useAuthContext();

function DefaultLayout() {
  const [auth, setAuth] = useState(null);

  return (
    <>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <Sidenav />
        <Topnav />
        <main className="pl-64 pt-[72px]">
          <Outlet />
        </main>
      </AuthContext.Provider>
    </>
  );
}

export default DefaultLayout;
