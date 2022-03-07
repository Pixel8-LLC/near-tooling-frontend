import React, { useState } from "react";
import { ReactComponent as AngleRight } from "../assets/img/angle-right.svg";
import { ReactComponent as FileExport } from "../assets/img/file-export.svg";

const Fans = () => {
  const [contractAddress, setContractAddress] = useState("");

  return (
    <div>
      <div className="text-6xl font-medium w-full pb-3">Flex</div>
      <div className="flex items-center space-x-6 text-lg mt-6">
        <div className="flex-1">
          <div className="text-lg rounded-lg w-11/12 border flex items-center">
            <input
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              className="bg-black flex-1 rounded-l-lg py-2.5 px-5 border-r"
              placeholder="nft1.example.near"
            />
            <button className="py-2.5 px-4">
              <AngleRight />
            </button>
          </div>
        </div>
        <div className="ml-auto">
          <button className="bg-zinc-800 py-4 px-10 flex items-center space-x-4 rounded-md">
            <FileExport />
            <div className="">Export Fans</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fans;
