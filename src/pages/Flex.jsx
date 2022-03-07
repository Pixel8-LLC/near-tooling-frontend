import { useState } from "react";
import { ReactComponent as Search } from "../assets/img/search.svg";
import { ReactComponent as ShareFromSquare } from "../assets/img/share-from-square.svg";
import artworks from "../constants/artWorks";

const Flex = () => {
  const [walletAddress, setWalletAddress] = useState("");

  return (
    <div>
      <div className="text-6xl font-medium w-full pb-3">Flex</div>
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
      <div className="flex items-center mt-9">
        <div className="flex space-x-14 flex-1">
          <div className="">
            <div className="text-2xl">5</div>
            <div className="">Artworks collected</div>
          </div>
          <div className="">
            <div className="text-2xl">13</div>
            <div className="">Unique Artists</div>
          </div>
          <div className="">
            <div className="text-2xl">13 NEAR</div>
            <div className="">Wallet Value </div>
            <div className="">Based on floor price</div>
          </div>
        </div>
        <div className="ml-auto">
          <button className="bg-zinc-800 py-4 px-10 flex items-center space-x-4 rounded-md">
            <ShareFromSquare />
            <div className="">Share</div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-x-7 mt-8">
        {artworks.map((artwork) => (
          <div className="">
            <div
              key={artwork.title}
              className="bg-white text-black rounded-[13px] flex flex-col"
            >
              <img src={artwork.image} alt="image1" className="" />
              <div className="flex flex-col flex-1">
                <div className="bg-slate-50 py-3 px-4 flex-1">
                  <p className="font-bold text-lg">{artwork.title}</p>
                  <div className="text-sm mt-1">
                    <div className="">Royalty: {artwork.royalty}</div>
                    <div className="">
                      Current Floor: {artwork.currentFloor}
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="">Rarity:</div> {artwork.rarity}
                    </div>
                  </div>
                </div>
                <button className="flex items-center justify-center py-1">
                  More Info
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="my-10"></div>
    </div>
  );
};

export default Flex;
