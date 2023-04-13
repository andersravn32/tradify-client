import { useContext, useEffect } from "react";
import useAuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthContext = useAuthContext();

function Dashboard() {
  const { auth, setAuth } = useContext(AuthContext);

  return (
    <>
    
    </>
  );
}

export default Dashboard;
