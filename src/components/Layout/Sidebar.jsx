import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as AngleRight } from "../../assets/img/angle-right.svg";

const Sidebar = () => {
  return (
    <div className="h-full w-sidebarWidth bg-white text-black rounded-xl py-5 pl-6 pr-2 space-y-4">
      <div className="">NFT Tools</div>
      <div className="h-sidebarListHeight overflow-y-auto space-y-3">
        <Link to="/" className="flex items-center space-x-2">
          <AngleRight />
          <div className="">Wallet Activity</div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
