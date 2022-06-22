import {
  useState,
  useEffect,
} from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [title, setTitle] = useState('');

  const closeSidebar = () => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  }

  const renderTitle = () => {
    const path = location.pathname;
    if (path === '/') {
      setTitle('Wallet Activity');
    } else if (path === '/nft-explorer') {
      setTitle('NFT Explorer');
    } else if (path === '/nft-minters') {
      setTitle('NFT Minters');
    }
  }

  useEffect(() => {
    renderTitle()
  }, [location])

  return (
    <div className="text-white container px-4 mx-auto h-screen overflow-y-auto" onClick={() => closeSidebar()}>
      <div className="sticky top-0 z-10">
        <Header />
      </div>
      <div className="relative flex gap-8">
        <Sidebar open={sidebarOpen} />
        <div className="w-full overflow-x-auto pb-10">
          <div>
            <div className="text-4xl md:text-6xl font-medium w-full pb-3"><i className="fa-solid fa-bars sm:hidden" onClick={() => setSidebarOpen(!sidebarOpen)} /> {title}</div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
