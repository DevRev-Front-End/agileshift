// import { useState } from "react";
import {
  create_ticket_schema,
  create_parts_schema,
  create_issues_schema,
} from "../../Utils/Backend";
import { FieldGroup } from "./FieldGroup";

type GeneratorFormPropTypes = {
  type: string;
  list: TYPE_SCHEMA[];
  setList: React.Dispatch<React.SetStateAction<TYPE_SCHEMA[]>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

export const SchemaGeneratorForm = ({
  type,
  list,
  setList,
  activeTab,
  setActiveTab,
}: GeneratorFormPropTypes) => {
  const addColumn = (e: any) => {
    e.preventDefault();
    let tempColumns = [...list];
    tempColumns.push({ columnName: "", columnType: "" });
    setList(tempColumns);
  };
  const changeColumn = (id: number, columnName: string, columnType: string) => {
    let tempColumns = [...list];
    tempColumns[id].columnName = columnName;
    tempColumns[id].columnType = columnType;
    setList(tempColumns);
  };

  const submitSchema = (e: any) => {
    e.preventDefault();
    console.log(list);
    switch (type) {
      case "Tickets":
        create_ticket_schema(list);
        setActiveTab("Issues");
        break;
      case "Issues":
        create_issues_schema(list);
        setActiveTab("Parts");
        break;
      case "Parts":
        create_parts_schema(list);
        window.location.href = "dashboard";
        break;
    }
  };

  return (
    <section
      className="h-max max-h-96 w-max bg-Secondary_background_color mt-4 rounded-md border border-border_color
    overflow-auto px-6
    ">
      <form>
        {list.map((column, id) => (
          <FieldGroup
            column={column}
            id={id}
            changeColumn={changeColumn}
            key={id}
          />
        ))}
        <div className="flex justify-around mb-4">
          <button
            className="flex justify-center items-center w-32 h-8 bg-background_color rounded-md shadow-md shadow-black
          text-sm text-highlight_font_color active:shadow-inner
          "
            onClick={addColumn}>
            Add Column
          </button>

          <button
            className="flex justify-center items-center w-32 h-8 bg-background_color rounded-md shadow-md shadow-black
          text-sm text-highlight_font_color active:shadow-inner
          "
            onClick={submitSchema}>
            Submit Schema
          </button>
        </div>
      </form>
    </section>
  );
};