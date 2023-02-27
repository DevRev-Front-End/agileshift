import React, { useState, useEffect, useCallback } from "react";
import BuildQuadarnt from "../BuildQuadrant";

import { get_schema_data, get_data_by_column_name } from "../../Utils/Backend";

import Header from "./Header";
import TabHeader from "./TabHeader";
import { useAppSelector } from "../../redux/hooks";
import { NotificationMainComponent } from "../Notifications/NotificationMainComponent";

export default function Dashboard() {
	const organizationId = useAppSelector((state) => state.auth.organisationId);
	const [selectedTab, setSelectedTab] = React.useState<string>("Dashboard");
	const [dataSchema, setDataSchema] = useState<TYPE_FIELD[]>();
	const [data, setData] = useState();
	const [showNotification, setShowNotification] = useState(false);

	useEffect(() => {
		get_schema_data(organizationId).then((data) => {
			if (data) setDataSchema(data.schemaData);
		});
	}, [organizationId]);

	const getDataByFeildName = useCallback(() => {
		if (dataSchema)
			get_data_by_column_name(organizationId, dataSchema[0].name).then(
				(data) => {
					setData(data);
				}
			);
	}, [dataSchema, organizationId]);

	useEffect(() => {
		getDataByFeildName();
	}, [getDataByFeildName]);

	return (
		<div className="bg-background_color h-[100vh] flex flex-col font-dm_sans">
			<Header showNotification={showNotification} setShowNotification={setShowNotification}/>
			{showNotification?
				<NotificationMainComponent />
				:
				<React.Fragment>
					{dataSchema && (
						<TabHeader
							selectedTab={selectedTab}
							setSelectedTab={setSelectedTab}
							fieldsData={dataSchema}
						/>
					)}
					{dataSchema && data && (
						<BuildQuadarnt
							fieldData={dataSchema[0]}
							datas={data}
						/>
					)}
				</React.Fragment>
			}
		</div>
	);
}
