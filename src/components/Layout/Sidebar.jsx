import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as Wallet } from "../../assets/img/wallet.svg";
import { ReactComponent as Trophy } from "../../assets/img/trophy.svg";
import { ReactComponent as UserGroup } from "../../assets/img/user-group.svg";
import { ReactComponent as BullseyeArrow } from "../../assets/img/bullseye-arrow.svg";

const Sidebar = () => {
  let location = useLocation();
  const links = [
    {
      icon: <Wallet />,
      title: "Wallet Activity",
      url: "/",
    },
    {
      icon: <Trophy />,
      title: "Flex",
      url: "/flex",
    },
    {
      icon: <UserGroup />,
      title: "Fans",
      url: "/fans",
    },
    {
      icon: <BullseyeArrow />,
      title: "Air Drop",
      url: "/air-drop",
    },
  ];
  return (
    <div className="w-sidebarWidth bg-zinc-800 rounded-xl py-5 space-y-4">
      <div className=" pl-5 pr-2 text-lg font-medium">NFT Tools</div>
      <div className="max-h-sidebarListHeight text-lg overflow-y-auto space-y-3">
        {links.map(({ icon, title, url }) => (
          <Link
            key={title}
            to={url}
            className={`flex items-center py-3 pl-5 pr-2 space-x-5 ${
              url === location.pathname ? "font-medium bg-white text-black" : ""
            } hover:font-medium hover:bg-white hover:text-black`}
          >
            {icon}
            <div className="">{title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
