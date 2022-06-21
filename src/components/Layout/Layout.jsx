import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="text-white container px-4 mx-auto h-screen overflow-y-auto">
      <div className="sticky top-0 z-10">
        <Header />
      </div>
      <div className="relative flex gap-8">
        <Sidebar />
        <div className="w-full overflow-x-auto pb-10">
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
