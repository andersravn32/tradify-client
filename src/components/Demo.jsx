import { useContext } from "react";
import useUserContext from "../context/User";
const UserContext = useUserContext();

function Demo() {
  const user = useContext(UserContext);
  return (
    <>
      <h1>Hello world</h1>
      <p>{JSON.stringify(user)}</p>
    </>
  );
}

export default Demo;
