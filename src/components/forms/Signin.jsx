import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import useAuthContext from "../../context/AuthContext";

const AuthContext = useAuthContext();

function FormSignin() {
  const { auth, setAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const signinCallback = () => {
      if (!auth) {
        return;
      }

      return navigate("/dashboard");
    };

    signinCallback();
  }, [auth]);

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
          email: email,
          password: password,
        }),
      }
    ).then((res) => res.json());

    // Update loading state
    setLoading(false);

    // Set localStorage
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    // Set auth state in context
    return setAuth(data);
  };

  return (
    <>
      <form
        id="form-signin"
        className="w-full max-w-sm flex flex-col space-y-4"
        onSubmit={signin}
      >
        <Link to="/">
          <img
            crossOrigin="anonymous"
            className="w-2/3 mx-auto"
            src="https://prod.tradify.dk/content/public/tradify_logo.svg"
            alt="Tradify Logo"
          />
        </Link>
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
        {errors.length ? (
          <ul>
            {errors.map((error) => {
              return <li>* {error.msg}</li>;
            })}
          </ul>
        ) : null}
        <Button size="md" type="primary" loading={loading}>
          Log på
        </Button>{" "}
        <div className="text-xs text-zinc-400 flex justify-end">
          <span>
            Har du ikke en konto?{" "}
            <Link className="text-indigo-500" to="/signup">
              Opret konto
            </Link>
          </span>
        </div>
      </form>
    </>
  );
}

export default FormSignin;
