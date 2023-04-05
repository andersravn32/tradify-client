import { ButtonType, ButtonSizes } from "../../themes/light";

function Button({ size, type, children }) {
  const classNames = ButtonSizes[size] + " " + ButtonType[type];
  return <button className={classNames}>{children}</button>;
}

export default Button;
