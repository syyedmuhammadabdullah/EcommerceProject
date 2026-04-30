import React from "react";

const Button = ({
  onClick = () => {},
  children = "Button",
  className = "",
  disabled = false,
}) => {
  return (
    <button
    disabled={disabled}
      onClick={onClick}
      className={` text-base ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
