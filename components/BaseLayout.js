import Sidebar from "./Sidebar";
import { useContext } from 'react';
import { SidebarContext } from '@/context/SidebarContext';
import NavBar from "./NavBar";
import useMediaQuery from '@mui/material/useMediaQuery';

const BaseLayout = ({ children }) => {
  const { isCollapsed } = useContext(SidebarContext);
  const matches = useMediaQuery('(min-width:600px)');
  const layoutClass = isCollapsed ? 'layout-collapsed' : 'layout-expanded';

  return (<>
    {matches ? (
      <div className={`layout ${layoutClass}`} >
        <Sidebar />
        <main className="layout__main-content">{children}</main>
      </div >

    ) : (
      <div>
        <NavBar />
        <main className="layout__main-content">{children}</main>
      </div>
    )}
  </>);
};

export default BaseLayout;