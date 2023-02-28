import React from "react";
import { sortObjectKeysByArrayLength } from "../../Utils/HelperFunctions";
import SideBarInputs from "./SideBarInputs";

type Type_SidebarState = {
  field: string;
  color: string;
  data: any;
  schema: any;
  index: number;
};

type Type_DetailsProps = {
  state: Type_SidebarState;
  setState: React.Dispatch<React.SetStateAction<Type_SidebarState>>;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

const DataForm = (props: Type_DetailsProps) => {
  const [tabs, setTabs] = React.useState<any>({});
  const [selectedTab, setSelectedTab] = React.useState("");

  React.useEffect(() => {
    let tempTabData: any = {};
    Object.keys(props.state.schema).forEach((key) => {
      tempTabData[props.state.schema[key]] = [];
    });
    Object.keys(props.state.schema).forEach((key) => {
      tempTabData[props.state.schema[key]].push(key);
    });

    setSelectedTab(
      Object.keys(tempTabData).filter((key) => key !== "title")[0]
    );
    setTabs(tempTabData);
  }, [props.state.schema]);

  return (
    <div className="h-[70%] border-y border-primary_font_color text-white p-2 grow">
      <section className=" flex flex-row">
        {sortObjectKeysByArrayLength(tabs).map((tab) => (
          <button
            onClick={() => setSelectedTab(tab)}
            className={`w-20 h-10  ${
              tab === selectedTab
                ? "border-t-[1px] border-r-[1px] border-l-[1px]"
                : "border-b-[1px]"
            } rounded active:opacity-50`}
          >
            {tab}
          </button>
        ))}
      </section>

      <section className="gap-2">
        {tabs[selectedTab] &&
          tabs[selectedTab].map((tab: string, index: number) => (
            <SideBarInputs
              key={index}
              sidebarIndex={props.state.index}
              type={selectedTab}
              defaultValue={props.formData[tab]}
              label={tab}
              fieldData={props.formData}
              setFunction={props.setFormData}
              selectedTab={selectedTab}
            />
          ))}
      </section>
    </div>
  );
};

export { DataForm };
