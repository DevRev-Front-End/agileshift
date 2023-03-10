import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { setSideBar } from "../../redux/reducers/SideBarSlice";
import { get_text_color_from_name } from "../../Utils/Backend";
import { generateRandomId } from "../../Utils/HelperFunctions";

const BuildQuadarntHeader = () => {
  const [hoveredButtonIndex, setHoveredButtonIndex] = useState(-1);

  const fieldColor = useAppSelector((state) => state.datatable.fieldColor);
  const tabName = useAppSelector((state) => state.datatable.tabName);

  const buttonStyle = {
    color:
      hoveredButtonIndex === 0
        ? `${get_text_color_from_name(fieldColor)}`
        : "rgba(255, 255, 255, 0.3)",
  };

  const dispatch = useAppDispatch();

  return (
    <div className="relative bg-Secondary_background_color flex items-center justify-between p-[0_2rem] h-[60px]" data-testid="build-quadrant">
      <div className="font-fira_code text-[0.9rem] items-center font-[600] text-white">
        <span className="text-white/50">BUILD /</span> {tabName}
      </div>
      <button
        onClick={() => {
          dispatch(
            setSideBar({
              type: "createMode",
              createModeCalledByField: tabName,
              id: generateRandomId(),
              linkedData: [],
            })
          );
        }}
        style={buttonStyle}
        className={` font-dm_sans text-[1rem] flex items-center gap-[0.2rem] text-white/30 cursor-pointer rounded-sm hover:bg-Secondary_background_color`}
        onMouseOver={() => setHoveredButtonIndex(0)}
        onMouseOut={() => setHoveredButtonIndex(-1)}
      >
        <span className="material-symbols-outlined text-inherit">add</span>
        <p className="capitalize font-fira_code">
          {tabName.toLowerCase() === "all" ? "Add" : tabName}
        </p>
      </button>
    </div>
  );
};

export default BuildQuadarntHeader;
