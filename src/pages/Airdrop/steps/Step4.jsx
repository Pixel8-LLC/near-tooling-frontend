import { ReactComponent as NearIcon } from "../../../assets/img/near-icon.svg";
import { ReactComponent as AirDrop } from "../../../assets/img/airdrop.svg";

const Step4 = () => {
  return (
    <div>
      <div className="mt-10">
        <div className="text-2xl">
          <span className="font-bold">Distribution</span>
          <span> - 3 Wallets</span>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-5">
              <i className="fas fa-image"></i>
              <div className="min-w-[8rem]">69 NFT</div>
              <div className="text-neutral-400">23 NFT Per Wallet</div>
            </div>
            <div className="flex items-center space-x-5">
              <NearIcon />
              <div className="min-w-[8rem]">420 NEAR</div>
              <div className="text-neutral-400">140 NEAR Per Wallet </div>
            </div>
          </div>
          <div className="absolute right-40">
            <AirDrop />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
