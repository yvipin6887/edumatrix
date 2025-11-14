import QueryProvider from "@/providers/QueryProvider";
import {SidebarProvider} from "./sidebar/sidebar-context";

const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>
    <QueryProvider>
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </QueryProvider>
  </>;
}

export default LayoutProvider;