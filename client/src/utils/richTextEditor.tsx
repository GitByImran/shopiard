import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value: initialValue = "",
  onChange,
}) => {
  const [value, setValue] = useState(initialValue);
  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["table"],
        ["clean"],
      ],
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "table",
  ];

  const handleChange = (
    content: string,
    delta: any,
    source: any,
    editor: any
  ) => {
    setValue(content);
    onChange(content);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={handleChange}
      modules={modules}
      formats={formats}
    />
  );
};

export default RichTextEditor;
