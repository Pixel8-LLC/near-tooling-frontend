import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="bg-black text-white pl-16 h-screen overflow-y-auto">
      <div className="sticky top-0 bg-black z-10">
        <Header />
      </div>
      <div className="relative flex ">
        <Sidebar />
        <div className="w-full overflow-x-auto pl-8 pb-10">
          <div className="mr-16">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
