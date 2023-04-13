import Link from "next/link";

const Navbar = () => {
  return (
    <nav id="navbar">
      <ul>
        <li>
          <Link href="/">
            <img
              className="h-12"
              crossOrigin="anonymous"
              src="https://prod.tradify.dk/content/public/tradify_logo.svg"
              alt="Tradify logo"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
