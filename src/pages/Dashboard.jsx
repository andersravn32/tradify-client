import { useContext, useEffect } from "react";
import useAuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthContext = useAuthContext();

function Dashboard() {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const authGuard = () => {
      console.log(auth);
      if (!auth) {
        return navigate("/signin");
      }
    };

    authGuard();
  }, [auth, navigate]);

  return (
    <>
      <section className="h-screen grid place-items-center">
        <div className="flex flex-col w-full max-w-4xl bg-slate-50 shadow-sm ">
          <div className="flex items-center justify-between rounded p-4 border-b border-b-slate-200">
            <div className="flex items-center space-x-4">
              <img
                className="h-12 w-12 rounded-full object-cover bg-slate-200 p-2"
                crossOrigin="anonymous"
                src={`${auth.user.profile.avatar}?token=${auth.accessToken}`}
                alt="Tradify Logo"
              />
              <div className="flex flex-col">
                <span className="font-semibold">
                  {auth.user.profile.firstName}
                </span>
                <span className="text-xs text-slate-400">
                  @{auth.user.identifier}
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 p-4">
            <div className="flex flex-col space-y-4">
              <h2 class="text-xl">Detaljer</h2>
              <div className="flex flex-col space-y-2">
                <span>Fornavn: {auth.user.profile.firstName}</span>
                <span>Efternavn: {auth.user.profile.lastName}</span>
                <span>Fødselsdato: {auth.user.profile.dob}</span>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <h2 class="text-xl">Indstillinger</h2>
              <div className="flex flex-col space-y-2">
                <span>App Notifikationer: {auth.user.settings.notifications.app ? "Ja" : "Nej"}</span>
                <span>E-mail Notifikationer: {auth.user.settings.notifications.email ? "Ja" : "Nej"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
