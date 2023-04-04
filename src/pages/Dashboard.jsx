import { useEffect, useState, useContext } from "react";
import useUserContext from "../context/UserContext";
import Demo from "../components/Demo";

const UserContext = useUserContext();

function Dashboard() {
  const [user, setUser] = useState(null);

  const value = {
    user: user,
    setUser: setUser,
  };

  const handleClick = (e) => {
    console.log(e)
    setUser("Hello World")
  };

  return (
    <UserContext.Provider value={value}>
      <Demo />
      <button onClick={handleClick}>Hent data</button>
    </UserContext.Provider>
  );
}

export default Dashboard;
