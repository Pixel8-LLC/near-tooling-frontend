import { useState } from "react";
import { ReactComponent as Search } from "../assets/img/search.svg";

const WalletActivity = () => {
  const [walletAddress, setWalletAddress] = useState("");
  return (
    <div>
      <div className="text-6xl font-medium w-full pb-3">Wallet Activity</div>
      <div className="">
        <div className="flex items-center space-x-6 text-lg mt-6">
          <div className="text-lg rounded-lg w-96 border flex items-center ">
            <input
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="bg-black flex-1 rounded-l-lg py-2.5 px-5 border-r"
              placeholder="Enter Wallet (example.near)"
            />
            <button className="py-2.5 px-4">
              <Search />
            </button>
          </div>
          <div className="font-bold text-sm">Or</div>
          <button className="text-base font-medium bg-white text-black rounded-lg px-4 py-3">
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletActivity;
