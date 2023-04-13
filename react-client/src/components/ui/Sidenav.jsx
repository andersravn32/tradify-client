import { Link } from "react-router-dom";
import {
  HomeIcon,
  ArrowsRightLeftIcon,
  UserIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

function Sidenav() {
  return (
    <>
      <aside className="fixed w-64 top-0 bottom-0 left-0 p-4 border-r border-zinc-800">
        <div className="w-full h-full relative flex flex-col space-y-16">
          <Link to="/dashboard">
            <img
              className="w-3/4"
              crossOrigin="anonymous"
              src="https://prod.tradify.dk/content/public/tradify_logo.svg"
              alt="Tradify Logo"
            />
          </Link>
          <ul className="flex flex-col space-y-2">
            <li>
              <Link
                className="p-4 bg-zinc-800 flex items-center space-x-4 rounded"
                to="/"
              >
                <HomeIcon className="w-6 h-6" />
                <span className="font-semibold text-sm">Hjem</span>
              </Link>
            </li>
            <li>
              <Link
                className="p-4 flex items-center space-x-4 text-zinc-400 rounded hover:bg-zinc-800 hover:text-zinc-50"
                to="/"
              >
                <ArrowsRightLeftIcon className="w-6 h-6" />
                <span className="font-semibold text-sm">Mine handler</span>
              </Link>
            </li>
            <li>
              <Link
                className="p-4 flex items-center space-x-4 text-zinc-400 rounded hover:bg-zinc-800 hover:text-zinc-50"
                to="/"
              >
                <UserIcon className="w-6 h-6" />
                <span className="font-semibold text-sm">Min profil</span>
              </Link>
            </li>
            <li>
              <Link
                className="p-4 flex items-center space-x-4 text-zinc-400 rounded hover:bg-zinc-800 hover:text-zinc-50"
                to="/"
              >
                <Cog6ToothIcon className="w-6 h-6" />
                <span className="font-semibold text-sm">Indstillinger</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidenav;
