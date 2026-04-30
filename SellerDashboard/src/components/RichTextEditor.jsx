import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const TinyEditor = ({
  value,
  onChange,
  height = 400,
  placeholder = "Write something..."
}) => {
  return (
    <Editor
      apiKey="lg747wt7c240q7i541t0unend1qq7xmgui829pb6le57xw2f" // free version (watermark aa sakta hai)
      value={value}
      init={{
        height,
        menubar: false,
        placeholder,

        plugins: [
  "advlist",   // 🔥 IMPORTANT for bullist/numlist
  "lists",
  "link",
  "image",
  "media",
  "table",
  "code",
  "fullscreen",
  "preview"
],

        toolbar:
        "h1 h2 h3  " +
        "bold italic underline | alignleft aligncenter alignright alignjustify | " +
        "bullist numlist outdent indent | link image media table | code fullscreen preview" +
        "undo redo | formatselect | ",

        branding: false, // watermark show hoga (free version)

        content_style:
          "body { font-family:Arial,Helvetica,sans-serif; font-size:14px }"
      }}
      onEditorChange={(content) => {
        onChange && onChange(content);
      }}
    />
  );
};

export default TinyEditor;