import theme from "../../themes/theme";

function Button({ size, type = "primary", children, loading = false }) {
  const classNames = theme.ButtonSizes[size] + " " + theme.ButtonTypes[type];
  return (
    <button className={classNames}>{!loading ? children : "Loading.."}</button>
  );
}

export default Button;
