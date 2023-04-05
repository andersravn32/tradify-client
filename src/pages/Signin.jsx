import { useContext, useEffect, useState } from "react";
import useAuthContext from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const AuthContext = useAuthContext();

function Signin() {
  const { auth, setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      if (auth) {
        return navigate("/dashboard");
      }
    };
    checkAuth();
  }, [auth, navigate]);

  const signin = async (e) => {
    e.preventDefault();

    const { data, errors } = await fetch(
      "https://prod.tradify.dk/auth/provider/email/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    ).then((res) => res.json());

    if (errors.length) {
      return setErrors(errors);
    }

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    return setAuth(data);
  };

  return (
    <>
      <section className="h-screen grid place-items-center">
        <div className="flex flex-col space-y-4 w-full max-w-sm">
          <h1 className="text-4xl text-center">Log på</h1>
          <form
            className="p-4 bg-slate-50 rounded shadow-sm flex flex-col space-y-4"
            onSubmit={signin}
          >
            <div className="flex flex-col space-y-2">
              <label
                className="uppercase text-sm text-slate-400"
                htmlFor="email"
              >
                E-mail
              </label>
              <input
                className="shadow-sm border border-slate-100 py-2 px-6 rounded"
                type="email"
                placeholder="Indtast e-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label
                className="uppercase text-sm text-slate-400"
                htmlFor="email"
              >
                Password
              </label>
              <input
                className="shadow-sm border border-slate-100 py-2 px-6 rounded"
                type="password"
                placeholder="Indtast password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Link className="text-sm text-indigo-500 text-right" to="/">
              Glemt password?
            </Link>
            {errors.length ? (
              <ul className="flex flex-col space-y-2">
                {errors.map((error, index) => {
                  return (
                    <li className="text-red-500 text-xs" key={index}>
                      {JSON.stringify(error)}
                    </li>
                  );
                })}
              </ul>
            ) : null}
            <button className="py-2 px-6 rounded bg-indigo-500 shadow-sm font-semibold text-zinc-50">
              Log på
            </button>
          </form>
          {JSON.stringify(auth)}
        </div>
      </section>
    </>
  );
}

export default Signin;
