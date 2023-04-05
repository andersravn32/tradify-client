import { useContext, useEffect, useState } from "react";
import useAuthContext from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const AuthContext = useAuthContext();

function Signin() {
  const { auth, setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const signin = async (e) => {
    e.preventDefault();

    // Prevent multiple accidental requests
    if (loading) {
      return;
    }

    // Update loading state
    setLoading(true);

    const { data, errors } = await fetch(
      "https://prod.tradify.dk/auth/provider/email/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          password: password,
        }),
      }
    ).then((res) => res.json());

    console.log(data, errors);

    // Update loading state
    setLoading(false);
  };

  return (
    <>
      {/*       <section className="h-screen grid place-items-center">
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
            <Button type="primary" size="md">Hello world</Button>
            <Input type="text" value={test} onChange={handleChange} placeholder="Test input" size="lg" label="Email"/>
          </form>
        </div>
      </section> */}
      <section className="min-h-screen grid place-items-center">
        <div className="flex flex-col space-y-4 w-full max-w-sm">
          <Link to="/">
            <img
              crossOrigin="anonymous"
              className="w-2/3 mx-auto"
              src="https://prod.tradify.dk/content/public/tradify_logo.svg"
              alt="Tradify Logo"
            />
          </Link>
          <form
            className="w-full rounded flex flex-col space-y-4"
            onSubmit={signin}
          >
            <Input
              type="email"
              size="md"
              placeholder="Indtast email"
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              size="md"
              placeholder="Indtast password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link className="ml-auto text-sm text-indigo-500" to="/reset">
              Glemt password?
            </Link>
            <Button size="md" type="primary" loading={loading}>
              Log på
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Signin;
