import React, { useEffect } from "react";

const CheckBox = ({
  children = "",
  isChecked = false,
  onChange = () => {},
  type = "checkbox",
  id = "checkbox",
  className=""
}) => {
  useEffect(() => {console.log(isChecked);
  }, [isChecked]);
  return (
    <div className={`checkBox flex items-center gap-1 ${className}`}>
      <input
        type={type}
        id={id}
        onChange={onChange}
        checked={isChecked}
        className="accent-primary-base w-base h-base cursor-pointer text-sm"
      />
      <label htmlFor={id} className="cursor-pointer">{children}</label>
    </div>
  );
};

export default CheckBox;
