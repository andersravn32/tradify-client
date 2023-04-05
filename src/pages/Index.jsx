import { useContext, useEffect } from "react";
import useAuthContext from "../context/AuthContext";

const AuthContext = useAuthContext();

function Index() {
  const { auth, setAuth } = useContext(AuthContext);
  return (
    <>
      <div className="bg-slate-50 m-4 p-4 shadow-sm">
        <h1>Jeg er en header</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae earum
          odio veritatis dolor nesciunt. Error ratione temporibus, similique
          veniam magni eius aperiam! Suscipit magni eos eum voluptates vitae
          deserunt sed!
        </p>
      </div>
    </>
  );
}

export default Index;
