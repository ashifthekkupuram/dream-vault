import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";

import SidebarApp from "../Sidebar/SidebarApp";
import Navbar from "../Navbar";

const SidebarContainer = () => {
  return (
    <SidebarProvider>
      <SidebarApp variant="" />
      <SidebarInset>
        <Navbar />
        <div className="m-2">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SidebarContainer;
