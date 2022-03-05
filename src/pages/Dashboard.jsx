import React, { useState } from "react";

const Dashboard = () => {
  const [walletAddress, setWalletAddress] = useState("");
  return (
    <div>
      <div className="text-xl font-bold w-full border-b pb-3">
        Wallet Activity
      </div>
      <div className="">
        <div className="flex items-center space-x-3.5 text-lg mt-6">
          <div className="">Enter Wallet</div>
          <div className="font-bold">Or</div>
          <button className="text-base bg-white text-black rounded-lg px-4 py-1">
            Connect Wallet
          </button>
        </div>
        <input
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className="py-3 px-5 rounded-lg w-4/6 mt-3"
          placeholder="example.near"
        />
      </div>
    </div>
  );
};

export default Dashboard;
