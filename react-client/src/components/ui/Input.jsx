import theme from "../../themes/theme";

function Input({ type, size, placeholder, label, value, onChange }) {
  const inputClasses = theme.InputSizes[size] + " " + "shadow-sm bg-zinc-800 rounded focus:outline-indigo-500";

  const handleChange = (e) => {
    return onChange(e);
  };

  return (
    <>
      <div className="flex flex-col space-y-2">
        {label ? (
          <label className="uppercase text-zinc-400 text-sm" htmlFor={label}>
            {label}
          </label>
        ) : null}
        <input
          className={inputClasses}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default Input;
