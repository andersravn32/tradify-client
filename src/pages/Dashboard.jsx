import { useContext, useEffect } from "react";
import useAuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthContext = useAuthContext();

function Dashboard() {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const authGuard = () => {
      if (!auth) {
        return navigate("/signin");
      }
    };

    authGuard();
  }, [auth, navigate]);

  return <></>;
}

export default Dashboard;
