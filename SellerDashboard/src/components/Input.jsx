import React, { forwardRef, useId } from "react";
import { EyeOutlined,EyeInvisibleOutlined } from "@ant-design/icons";
const Input =forwardRef(({
  type = "text",
  name = "",
  value = "",
  onChange = () => {},
  isLeftIcon = false,
  divClassName = "",
  inputClassName = "",
  icon = null,
  id,
  passwordIcon=null,
  ...props
}, ref) => {
  
  return (
   

    <div className={`p-2 border rounded-md border-border-primary placeholder:text-text-placeholder text-text-default flex gap-[10px] ${divClassName}`}>
    {isLeftIcon && icon}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={` outline-none text-base w-full ${inputClassName} bg-transparent`}
      {...props}
      id={name? name : id}
      ref={ref}
      
      />
      {!isLeftIcon && icon}
      {name==="password"&& passwordIcon}
      
      </div>
  
  );
});

export default Input ;
