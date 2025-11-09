import { SidebarProvider } from "./sidebar/sidebar-context";

const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>
    <SidebarProvider>
      {children}
    </SidebarProvider>
  </>;
}

export default LayoutProvider;