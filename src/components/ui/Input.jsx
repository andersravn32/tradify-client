import { InputSizes, InputType } from "../../themes/light";

function Input({ type, size, placeholder, label, value, onChange }) {
  const inputClasses = InputSizes[size] + " " + InputType[type];

  const handleChange = (e) => {
    return onChange(e);
  };

  return (
    <>
      <div className="flex flex-col space-y-2">
        {label ? (
          <label className="uppercase text-slate-400 text-sm" htmlFor={label}>
            {label}
          </label>
        ) : null}
        <input
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default Input;
