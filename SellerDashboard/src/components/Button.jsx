import React from "react";

const Button = ({
  onClick = () => {},
  children = "Button",
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={` text-base ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
