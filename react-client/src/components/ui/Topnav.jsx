import Button from "./Button";
import Input from "./Input";

function Topnav() {
  return (
    <>
      <nav className="fixed top-0 right-0 left-64 border-b border-zinc-800">
        <div className="relative flex items-center justify-between p-4">
          <ul className="flex items-center">
            <li>
              <h1>Hjem</h1>
            </li>
          </ul>
          <ul className="flex items-center space-x-8">
            <li>
              <div className="flex items-center space-x-4">
                <div className="flex flex-col text-right">
                  <span className="font-semibold text-sm">Anders Ravn</span>
                  <span className="text-zinc-400 text-xs">@anders</span>
                </div>
                <img
                  className="h-10 w-10 object-cover rounded-full"
                  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                  alt=""
                />
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Topnav;
