import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

type UploadJSONPropTypes = {
  setList: (this: any, list: TYPE_SCHEMA[]) => void;
};

const UploadJSON = ({ setList }: UploadJSONPropTypes) => {
  const [types] = useState([
    "string",
    "id",
    "title",
    "tag",
    "user",
    "dropdown",
    "date",
    "currency",
  ]);

  function createTypes(content: string) {
    let parsedContent = JSON.parse(content);
    let list: TYPE_SCHEMA[] = [];
    let invalidKeys: string[] = [];
    for (let key in parsedContent) {
      if (!types.includes(parsedContent[key].toLowerCase())) {
        invalidKeys.push(key);
        list.push({
          columnName: key,
          columnType: "string",
        });
        continue;
      }
      list.push({
        columnName: key,
        columnType: parsedContent[key].toLowerCase(),
      });
    }
    toast.error(`Select valid type for ${invalidKeys.join(", ")}`);
    setList(list);
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const contents = event.target?.result as string;
        createTypes(contents);
        // createTypes(JSON.parse(contents));
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center bg-grey-lighter text-white/50 hover:text-white font-dm_sans">
        <label
          className="flex items-center px-4 h-[40px] bg-Secondary_background_color justify-center
                             rounded-md tracking-wide gap-3
                            border-[2px] border-dark_gray cursor-pointer hover:bg-dark_gray">
          <span className="material-symbols-outlined ">upload_file</span>
          <span className="text-sm leading-normal text-center">
            Upload JSON
          </span>
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
      </div>
    </div>
  );
};

export default UploadJSON;
