import { Outlet, useNavigate } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import { useEffect, useState } from "react";
import Sidenav from "../components/ui/Sidenav";
import Topnav from "../components/ui/Topnav";

const AuthContext = useAuthContext();

function DefaultLayout() {
  const [auth, setAuth] = useState(null);

  const accessToken =
    sessionStorage.getItem("accessToken") ||
    localStorage.getItem("accessToken");
  const refreshToken =
    sessionStorage.getItem("refreshToken") ||
    localStorage.getItem("refreshToken");

  useEffect(() => {
    const refresh = async () => {
      if (!refreshToken) {
        return;
      }

      const { data, errors } = await fetch(
        "https://prod.tradify.dk/auth/refresh",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: refreshToken,
          }),
        }
      ).then((res) => res.json());

      setAuth(data);
    };

    refresh();
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <main>
          <Outlet />
        </main>
      </AuthContext.Provider>
    </>
  );
}

export default DefaultLayout;
