

import React, { useEffect, useState, useRef } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const SelectMenu = ({
  options,
  className = "",
  defaultValue, 
  attributes,
  onClick = () => {}
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue || "English");
  const menuRef = useRef(null);

  const changeValue = (e, item) => {
    setValue(item || e.target.innerText);
    setOpen(!open);
    onClick(item);  // Pass the clicked value to the onClick function
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);  // Match event type with the one added
    };
  }, []);

  return (
    <div className="selectMenu relative" ref={menuRef}>
      <div
        className={`selectBtn cursor-pointer flex ${className}`}
        onClick={handleToggle}
      >
        {value}
        <div className="icon">
          {!open ? <DownOutlined className="pointer-events-none" /> : <UpOutlined className="pointer-events-none" />}
        </div>
      </div>
      {open && (
        <div className="shadow-secondary z-10 bg-white min-w-[180px] max-h-[200px] flex flex-col gap-md overflow-y-scroll p-2 absolute">
          {attributes}

          {options && options.map((option, index) => (
            <div
              key={index}
              className="menuoption flex items-center hover:text-primary-hover hover:bg-primary-bg h-[32px] text-black"
              onClick={(e) => changeValue(e, option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectMenu;

