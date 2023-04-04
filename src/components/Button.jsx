import "./Button.css";

function Button(props) {
  if (!props.loading) {
    return (
      <>
        <button className="btn">
          {props.loading ? (
            <span>Loading...</span>
          ) : (
            <span>{props.children}</span>
          )}
        </button>
      </>
    );
  }
}

export default Button;
