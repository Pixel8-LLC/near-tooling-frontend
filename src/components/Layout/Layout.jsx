import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="bg-black text-white px-16 h-screen">
      <Header />
      <div className="relative flex h-sidebarHeight">
        <Sidebar />
        <div className="w-full overflow-x-auto pl-8">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
