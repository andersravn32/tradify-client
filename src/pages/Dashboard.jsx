import { useEffect, useState, useContext } from "react";
import useUserContext from "../context/User";
import Demo from "../components/Demo";

const UserContext = useUserContext();

function Dashboard() {
  const [user, setUser] = useState({});

  const refresh = async () => {
    const req = await fetch("https://prod.tradify.dk/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: "********",
      }),
    }).then((res) => res.json());

    setUser(req);
  };

  return (
    <UserContext.Provider value={user}>
      <Demo />
      <button onClick={refresh}>Hent data</button>
    </UserContext.Provider>
  );
}

export default Dashboard;
