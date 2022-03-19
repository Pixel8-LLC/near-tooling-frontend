import { ReactComponent as NearIcon } from "../../../assets/img/near-icon.svg";
import images from "./files";

const Step3 = () => {
  return (
    <div>
      <div className="mt-10">
        <div className="text-2xl">
          <span className="font-bold">Distribution</span>
          <span> - 3 Wallets</span>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div className="">
            <div className="flex items-center space-x-5">
              <i className="fas fa-image"></i>
              <div className="min-w-32">69 NFT</div>
              <div className="">23 NFT Per Wallet</div>
            </div>
            <div className="flex items-center space-x-5">
              <NearIcon />
              <div className="min-w-32">420 NEAR</div>
              <div className="">140 NEAR Per Wallet </div>
            </div>
          </div>
          <button className="flex px-9 space-x-4 items-center bg-neutral-900 py-4 rounded-md">
            <i className="far fa-dice"></i>
            <span className="font-bold">Randomize Distribution</span>
          </button>
        </div>
      </div>

      <div className="mt-9 flex space-x-8">
        <div className="w-64 border border-neutral-900 rounded-lg">
          <div className="bg-white py-4 px-8 text-black font-bold rounded-t-lg">
            All NFTs (69)
          </div>
          <div className="pr-3">
            <div className="h-96 mt-6 space-y-8 overflow-auto">
              <div className="pl-8 pr-4">example.near (23)</div>
              <div className="pl-8 pr-4">nft2.example.near (23)</div>
              <div className="pl-8 pr-4">nft3.example.near (23)</div>
              <div className="pl-8 pr-4">example.near (23)</div>
              <div className="pl-8 pr-4">nft2.example.near (23)</div>
              <div className="pl-8 pr-4">nft3.example.near (23)</div>
              <div className="pl-8 pr-4">example.near (23)</div>
              <div className="pl-8 pr-4">nft2.example.near (23)</div>
              <div className="pl-8 pr-4">nft3.example.near (23)</div>
              <div className="pl-8 pr-4">example.near (23)</div>
              <div className="pl-8 pr-4">nft2.example.near (23)</div>
              <div className="pl-8 pr-4">nft3.example.near (23)</div>
              <div className="pl-8 pr-4">example.near (23)</div>
              <div className="pl-8 pr-4">nft2.example.near (23)</div>
              <div className="pl-8 pr-4">nft3.example.near (23)</div>
              <div className="pl-8 pr-4">example.near (23)</div>
              <div className="pl-8 pr-4">nft2.example.near (23)</div>
              <div className="pl-8 pr-4">nft3.example.near (23)</div>
              <div className="pl-8 pr-4">example.near (23)</div>
              <div className="pl-8 pr-4">nft2.example.near (23)</div>
              <div className="pl-8 pr-4">nft3.example.near (23)</div>
              <div className="pl-8 pr-4">example.near (23)</div>
              <div className="pl-8 pr-4">nft2.example.near (23)</div>
              <div className="pl-8 pr-4">nft3.example.near (23)</div>
              <div className="pl-8 pr-4">example.near (23)</div>
              <div className="pl-8 pr-4">nft2.example.near (23)</div>
              <div className="pl-8 pr-4">nft3.example.near (23)</div>
              <div className="pl-8 pr-4">example.near (23)</div>
              <div className="pl-8 pr-4">nft2.example.near (23)</div>
              <div className="pl-8 pr-4">nft3.example.near (23)</div>
              <div className="pl-8 pr-4">example.near (23)</div>
              <div className="pl-8 pr-4">nft2.example.near (23)</div>
              <div className="pl-8 pr-4">nft3.example.near (23)</div>
              <div className="pl-8 pr-4">example.near (23)</div>
              <div className="pl-8 pr-4">nft2.example.near (23)</div>
              <div className="pl-8 pr-4">nft3.example.near (23)</div>
              <div className="pl-8 pr-4">example.near (23)</div>
              <div className="pl-8 pr-4">nft2.example.near (23)</div>
              <div className="pl-8 pr-4">nft3.example.near (23)</div>
              <div className="pl-8 pr-4">example.near (23)</div>
              <div className="pl-8 pr-4">nft2.example.near (23)</div>
              <div className="pl-8 pr-4">nft3.example.near (23)</div>
              <div className="pl-8 pr-4">example.near (23)</div>
              <div className="pl-8 pr-4">nft2.example.near (23)</div>
              <div className="pl-8 pr-4">nft3.example.near (23)</div>
            </div>
          </div>
        </div>
        <div className="flex-1 border border-neutral-900 rounded-lg px-10">
          <div className="text-2xl font-bold mt-9 mb-4">All NFTs</div>
          <div className="h-96 overflow-auto">
            <div className="grid grid-cols-4 gap-x-7 gap-y-6">
              {images.map((val) => (
                <img
                  className="bg-white rounded-2xl w-full h-full"
                  src={val.image}
                  alt={val.id}
                />
              ))}
              {images.map((val) => (
                <img
                  className="bg-white rounded-2xl w-full h-full"
                  src={val.image}
                  alt={val.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
