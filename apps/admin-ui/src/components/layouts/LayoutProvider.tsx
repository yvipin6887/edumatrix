import QueryProvider from "@/providers/QueryProvider";
import {SidebarProvider} from "./sidebar/sidebar-context";
import ReduxProvider from "@/providers/ReduxProvider";

const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>
    <ReduxProvider>
      <QueryProvider>
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </QueryProvider>
    </ReduxProvider>
  </>
}

export default LayoutProvider;