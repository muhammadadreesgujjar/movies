import React from "react";

const InputField = ({
  name,
  placeholder,
  value = null,
  onchange = null,
  err = false,
}) => {
  return (
    <div>
      <input
        type={name == "confirmPassword" ? "password" : name}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onchange}
        required
        className="inputField block w-full rounded-md px-3 py-1.5 text-base text-white outline-gray-300 placeholder:text-white focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-none sm:text-sm/6"
      />
      {err && <small className="text-red-500">{err}</small>}
    </div>
  );
};

export default InputField;
