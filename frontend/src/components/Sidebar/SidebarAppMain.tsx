import { useNavigate } from "react-router-dom";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import type { LucideProps } from "lucide-react";

type SidebarItemType = {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

type PropsType = {
  data: SidebarItemType[];
};

const SidebarAppMain = ({ data }: PropsType) => {
  const navigate = useNavigate();

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Dream Vault</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {data.map((item) => (
              <SidebarMenuItem className="cursor-pointer select-none" key={item.title}>
                <SidebarMenuButton onClick={() => navigate(item.url)} asChild>
                  <div>
                    <item.icon />
                    <span>{item.title}</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default SidebarAppMain;
