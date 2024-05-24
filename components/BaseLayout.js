import Sidebar from "./Sidebar";
import { useContext } from 'react';
import { SidebarContext } from '@/context/SidebarContext';

const BaseLayout = ({ children }) => {
  const { isCollapsed } = useContext(SidebarContext);

  const layoutClass = isCollapsed ? 'layout-collapsed' : 'layout-expanded';

  return (
    <div className={`layout ${layoutClass}`}>
      <Sidebar />
      <main className="layout__main-content">{children}</main>
    </div>
  );
};

export default BaseLayout;