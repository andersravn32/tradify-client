import { useState, useContext } from "react";
import useAuthContext from "../../../context/AuthContext";

const AuthContext = useAuthContext();

function FormUserSearch({ label, placeholder, onSelected }) {
  const { auth, setAuth } = useContext(AuthContext);

  const [identifier, setIdentifier] = useState("");

  const [users, setUsers] = useState([]);

  const handleSearch = async (e) => {
    setIdentifier(e.target.value);

    const { data, errors } = await fetch(
      `https://prod.tradify.dk/users?identifier=${e.target.value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.accessToken,
        },
      }
    ).then((res) => res.json());

    setUsers(data || []);
  };

  return (
    <>
      <div className="flex flex-col space-y-2 relative">
        {label ? (
          <label className="uppercase text-zinc-400 text-sm" htmlFor={label}>
            {label}
          </label>
        ) : null}
        <input
          className="px-6 py-2 shadow-sm bg-zinc-800 rounded focus:outline-indigo-500"
          type="text"
          value={identifier}
          placeholder={placeholder}
          onChange={handleSearch}
        />

        {users.length ? (
          <ul>
            {users.map((user, index) => {
              return (
                <li key={index} onClick={onSelected(user)}>
                  {user.identifier}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </>
  );
}

export default FormUserSearch;
