import theme from "../../themes/theme";

function Textarea({ placeholder, label, value, onChange }) {
  const inputClasses = "px-6 py-2 shadow-sm bg-zinc-800 rounded focus:outline-indigo-500 resize-none h-32";

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
        <textarea
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default Textarea;
