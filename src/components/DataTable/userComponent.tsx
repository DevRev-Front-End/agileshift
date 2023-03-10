import { Tooltip } from "@mui/material";
import React, { useEffect, useCallback } from "react";
import { get_user_by_id } from "../../Utils/Backend";

type Type_UserComponentProps = {
  value: string;
  showName?: boolean;
};

const UserComponent = (props: Type_UserComponentProps) => {
  const [avatar, setAvatar] = React.useState<any>();
  const [name, setName] = React.useState<any>();

  const getUser = useCallback(async () => {
    if (
      props.value !== undefined &&
      props.value !== null &&
      props.value !== "" &&
      typeof props.value === "string"
    )
      get_user_by_id(props.value).then((res) => {
        if (res && res.name && res.avatar) {
          setAvatar(res.avatar);
          setName(res.name);
        }
      });
  }, [props.value]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <Tooltip title = {`${name}`} placement = "top">
       <div className="flex items-center gap-[0.5rem] cursor-pointer">
      {avatar !== undefined && avatar !== null && avatar !== "" ? (
        <>
          <img
            className="w-8 h-8 rounded-full"
            src={`${avatar}`}
            alt={`${name}`}
          />
          {props.showName && (
            <span className="font-dm_sans text-sm">{name}</span>
          )}
        </>
      ) : avatar !== undefined && avatar !== null && avatar !== "" ? (
        <span className="font-dm_sans text-sm">{name}</span>
      ) : (
        "-"
      )}
    </div>

    </Tooltip>
   
  );
};

export default UserComponent;
