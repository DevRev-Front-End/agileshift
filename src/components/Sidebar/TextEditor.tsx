import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { send_message_in_fields } from "../../Utils/Backend";

type Props = {
  id: string;
};
const Editor = (props: Props) => {
  const [value, setValue] = useState("");

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      ["link", "image", "video"],
    ],
  };

  console.log(props.id);

  return (
    <>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        // style={editorStyle}
        modules={modules}
        className="flex flex-col-reverse  w-[100%] bottom-0 h-[100px]"
      />
      <button
        className=" bottom-0 right-0 mr-4 mb-3 absolute"
        onClick={() => {
          send_message_in_fields(
            props.id,
            "Ahy7xiQg8cftHwRpF4CUHdenIy02",
            value
          );
          setValue("");
        }}
      >
        send
      </button>
    </>
  );
};

export default Editor;