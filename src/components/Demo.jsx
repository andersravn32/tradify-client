import { useContext } from "react";
import useUserContext from "../context/UserContext";
const UserContext = useUserContext();

function Demo() {
  const { user, setUser } = useContext(UserContext);

  const handleClick = (e) => {
    console.log(e);
    setUser("Hello world 2");
  };

  if (user) {
    return (
      <>
        <p>{JSON.stringify(user)}</p>
        <button onClick={handleClick}>Reset</button>
      </>
    );
  }

  return <p>No context found</p>;
}

export default Demo;
