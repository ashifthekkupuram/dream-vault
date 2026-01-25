import { Moon, Sun } from "lucide-react";
import { Separator } from "./ui/separator";
import { SidebarMenuButton, SidebarTrigger } from "./ui/sidebar";
import { useTheme } from "../context/themeProvider";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="ml-auto flex items-center gap-2">
          <SidebarMenuButton
            className="my-1"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Moon /> : <Sun />}
          </SidebarMenuButton>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
