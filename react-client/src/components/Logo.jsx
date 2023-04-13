import "./Logo.css";

function Logo(props) {
  return (
    <img
      className="logo"
      crossOrigin="anonymous"
      src={
        props.light
          ? "https://prod.tradify.dk/content/public/tradify_logo_light.svg"
          : "https://prod.tradify.dk/content/public/tradify_logo.svg"
      }
      alt="Tradify Logo"
    />
  );
}

export default Logo;
