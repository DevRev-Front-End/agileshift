import React from "react";

type type_props = {
  type: string;
  defaultValue: string | Array<string>;
  setFunction: any;
  label: string;
  fieldData: any;
};
export default function DatePicker(props: type_props) {
  return (
    <div>
      <div className="flex mt-[0.3rem] bg-background_color">
        <span className="min-w-fit pl-2 h-[2.5rem] flex justify-center items-center rounded-l font-dm_sans">
          {props.label}
        </span>
        <input
          data-testid="email-input"
          value={props.defaultValue}
          className="w-full h-[2.5rem] bg-background_color focus:outline-none rounded-r px-4 code-font font-dm_sans"
          type="date"
          placeholder={props.label}
          onChange={(e) =>
            props.setFunction({
              ...props.fieldData,
              [props.label]: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
}