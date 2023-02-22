import React from "react";
import DataTable from "../DataTable";
import NavBar from "./NavBar";
import SearchCompont from "./SearchCompont";
import { create_issues_schema } from "../../Utils/Backend";

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = React.useState<string>("Dashboard");
  return (
    <div className="bg-background_color h-[100vh]">
      <header className="p-2 flex flex-wrap text-primary_font_color justify-between gap-x-4 gap-y-2">
        <NavBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <SearchCompont />
      </header>
      <DataTable />
    </div>
  );
}
