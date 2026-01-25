import { Home, AlarmClock } from "lucide-react";
import { Sidebar } from "../ui/sidebar";
import SidebarAppFooter from "./SidebarAppFooter";
import SidebarAppHeader from "./SidebarAppHeader";
import SidebarAppMain from "./SidebarAppMain";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Dreams",
    url: "/dreams",
    icon: AlarmClock,
  },
];

const SidebarApp = ({ ...props }) => {
  return (
    <Sidebar {...props} collapsible="offcanvas">
      <SidebarAppHeader />
      <SidebarAppMain data={items} />
      <SidebarAppFooter />
    </Sidebar>
  );
};

export default SidebarApp;
