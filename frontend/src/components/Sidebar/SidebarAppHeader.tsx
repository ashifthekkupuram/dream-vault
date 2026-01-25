import { Bed } from "lucide-react";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { useNavigate } from "react-router-dom";

const SidebarAppHeader = () => {
  const navigate = useNavigate();

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => navigate("/")}
            size="lg"
            asChild
            className="data-[slot=sidebar-menu-button]:p-1.5! cursor-pointer select-none"
          >
            <div>
              <Bed className="size-5!" />
              <span className="text-base font-semibold">Dream Vault.</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

export default SidebarAppHeader;
