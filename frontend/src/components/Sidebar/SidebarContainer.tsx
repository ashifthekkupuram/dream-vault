import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";

import SidebarApp from "../Sidebar/SidebarApp";
import Navbar from "../Navbar";

const SidebarContainer = () => {
  return (
    <SidebarProvider>
      <SidebarApp variant="inset" />
        <SidebarInset className="m-0 border-0" >
          <Navbar />
          <div className="m-2" >
            <Outlet />
          </div>
        </SidebarInset>
    </SidebarProvider>
  );
};

export default SidebarContainer;
