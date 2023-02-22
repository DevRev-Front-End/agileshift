import React from "react";
import PlusIcon from "../../assets/icons/plus-icon.svg";
import { useAppSelector } from "../../redux/hooks";
import {OrganizationCard} from "./OrganizationCard";
// import UploadJSON from "./UploadJSON";

const OrganizationList: React.FunctionComponent = () => {
	
	const organizationList  = useAppSelector((state) => state.auth.organisationList);


	console.log(organizationList);

	return (
		<div className="bg-background_color h-screen w-screen flex items-center justify-center font-dm_sans">
			<div className="h-3/5 w-[350px] flex flex-col gap-5">
				<div className="text-highlight_font_color mb-5">
					<h3 className="text-2xl mb-2">Create or Join a AgileShift Org</h3>
					{/* Change this to dynamic username */}
					<p className="text-primary_font_color text-lg">We found following organizations that matches your email address - i-nikhil.tidke@devrev.ai</p>  
				</div>
				<div className="text-highlight_font_color flex flex-col gap-5 mb-8">
					<h4 className="text-md">You AgileOrgs <span className="p-2 rounded-md bg-Secondary_background_color">2</span></h4>
					<OrganizationCard/>
					<OrganizationCard/>
					<OrganizationCard/>
					<OrganizationCard/>
				</div>
				<button className="flex gap-4 items-center justify-center border border-dark_gray py-4 rounded-lg text-highlight_font_color">
					<img
						src={PlusIcon}
						alt="Plus Icon"
						className="w-4 h-4"
					/>
					Create new AgileOrg
				</button>
			</div>
			{/* <UploadJSON schemaType="tickets"/> */}
		</div>
	);
};

export default OrganizationList;