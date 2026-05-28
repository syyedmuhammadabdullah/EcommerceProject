import { useState } from "react";

function CopyToClipboard({
  text,
  children,
  copyMessage = "Copy",
  copiedMessage = "Copied",
}) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="relative w-fit">

      <div
        onClick={handleCopy}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="cursor-pointer"
        >
        {children}
      </div>
        {(hovered || copied) && (
          <span className="absolute -top-5 left-1  bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            {copied ? copiedMessage : copyMessage}
          </span>
        )}
    </div>
  );
}

export default CopyToClipboard;