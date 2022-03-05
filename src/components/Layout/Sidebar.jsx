import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Wallet } from "../../assets/img/wallet.svg";
import { ReactComponent as Trophy } from "../../assets/img/trophy.svg";
import { ReactComponent as UserGroup } from "../../assets/img/user-group.svg";
import { ReactComponent as BullseyeArrow } from "../../assets/img/bullseye-arrow.svg";

const Sidebar = () => {
  return (
    <div className="h-fit w-sidebarWidth bg-zinc-800 rounded-xl py-5 space-y-4">
      <div className=" pl-6 pr-2">NFT Tools</div>
      <div className="max-h-sidebarListHeight overflow-y-auto space-y-3">
        <Link
          to="/"
          className="flex items-center py-3 pl-6 pr-2 space-x-2 hover:bg-white hover:text-black"
        >
          <Wallet />
          <div className="">Wallet Activity</div>
        </Link>
        <Link
          to="/"
          className="flex items-center py-3 pl-6 pr-2 space-x-2 hover:bg-white hover:text-black"
        >
          <Trophy />
          <div className="">Flex</div>
        </Link>
        <Link
          to="/"
          className="flex items-center py-3 pl-6 pr-2 space-x-2 hover:bg-white hover:text-black"
        >
          <UserGroup />
          <div className="">Fans</div>
        </Link>
        <Link
          to="/"
          className="flex items-center py-3 pl-6 pr-2 space-x-2 hover:bg-white hover:text-black"
        >
          <BullseyeArrow />
          <div className="">Air Drop</div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
