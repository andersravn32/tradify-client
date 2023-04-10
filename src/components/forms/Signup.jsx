import { Link, useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useContext, useEffect, useState } from "react";
import useAuthContext from "../../context/AuthContext";

const AuthContext = useAuthContext();

function FormSignup() {
  const { auth, setAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const [terms, setTerms] = useState(false);
  const [guidelines, setGuidelines] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const signupCallback = () => {
      if (!auth) {
        return;
      }

      return navigate("/dashboard");
    };

    signupCallback();
  }, [auth]);

  const signup = async (e) => {
    e.preventDefault();

    // If loading, return
    if (loading) {
      return;
    }

    if (!terms) {
      return alert("Accepter venligst handelsbetingelser");
    }

    if (!guidelines) {
      return alert("Accepter venligst handelsbetingelser");
    }

    // Update loading state
    setLoading(true);

    const { data, errors } = await fetch(
      "https://prod.tradify.dk/auth/provider/email/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          identifier: identifier,
          password: password,
        }),
      }
    ).then((res) => res.json());

    // Error handling
    if (errors) {
      // Update loading state
      setLoading(false);

      // Reset error state
      setErrors([]);

      // Set errors
      return setErrors(errors);
    }

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
        className="w-full max-w-md flex flex-col space-y-4"
        onSubmit={signup}
      >
        <Link to="/">
          <img
            crossOrigin="anonymous"
            className="w-2/3 mx-auto"
            src="https://prod.tradify.dk/content/public/tradify_logo.svg"
            alt="Tradify Logo"
          />
        </Link>
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="email"
            size="md"
            placeholder="Indtast email"
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="text"
            size="md"
            placeholder="Indtast brugernavn"
            label="Brugernavn"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>
        <Input
          type="password"
          size="md"
          placeholder="Indtast password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-center gap-4">
          <input
            onChange={() => setTerms(!terms)}
            checked={terms}
            className="block"
            type="checkbox"
          />
          <span className="block text-xs text-zinc-400">
            Jeg acceptere hermed de gældende vilkår og betingelser for brug af
            de tjenester som Tradify udbyder.
          </span>
        </div>

        <div className="flex items-center gap-4">
          <input
            onChange={() => setGuidelines(!guidelines)}
            checked={guidelines}
            className="block"
            type="checkbox"
          />
          <span className="block text-xs text-zinc-400">
            Jeg acceptere hermed de gældende fællesskabsregler for brug af
            Tradify.
          </span>
        </div>
        {errors.length ? (
          <ul>
            {errors.map((error) => {
              return <li>* {error.msg}</li>;
            })}
          </ul>
        ) : null}
        <Button size="md" type="primary" loading={loading}>
          Opret konto
        </Button>
        <div className="text-xs text-zinc-400 flex justify-end">
          <span>
            Har du allerede en konto?{" "}
            <Link className="text-indigo-500" to="/signin">
              Log på
            </Link>
          </span>
        </div>
      </form>
    </>
  );
}

export default FormSignup;
