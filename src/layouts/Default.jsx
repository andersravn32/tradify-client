import { Outlet, useNavigate } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import { useEffect, useState } from "react";

const AuthContext = useAuthContext();

function DefaultLayout() {
  const [auth, setAuth] = useState(null);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initialAuthCheck = async () => {
      if (
        !(
          localStorage.getItem("accessToken") ||
          localStorage.getItem("refreshToken")
        )
      ) {
        return setReady(false);
      }

      const { data, errors } = await fetch(
        "https://prod.tradify.dk/auth/refresh",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
          }),
        }
      ).then((res) => res.json());

      if (errors.length) {
        navigate("/signin");
        return setReady(true);
      }

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      setAuth(data);

      setReady(true);
    };

    initialAuthCheck();
  }, [auth, ready]);

  if (!ready) {
    return <>Loading...</>;
  }

  return (
    <>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <Outlet />
      </AuthContext.Provider>
    </>
  );
}

export default DefaultLayout;
