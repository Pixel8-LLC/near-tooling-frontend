import { useState } from "react";
import classnames from "classnames";

const Airdrop = () => {
  const [selected, setSelected] = useState("near");
  const nearSelected = selected === "near";
  const nftSelected = selected === "nft";

  return (
    <div>
      <div className="text-6xl font-medium w-full pb-3">Flex</div>
      <div className="space-y-14">
        <div
          className={classnames("space-y-6", {
            "text-neutral-500": !nearSelected,
          })}
        >
          <div
            className="flex items-center space-x-4"
            onClick={() => setSelected("near")}
          >
            <i
              className={`text-3xl ${
                nearSelected ? "fas fa-check-circle" : "fal fa-times-circle"
              }`}
            ></i>
            <span className="text-2xl font-bold">NEAR Airdrop</span>
          </div>
          <div className="flex space-x-10">
            <input
              type="number"
              className={classnames(
                "flex-1 appearance-none bg-black border py-2.5 px-5 rounded-md",
                { "border-neutral-500": !nearSelected }
              )}
            />
            <input
              className={classnames(
                "flex-1 appearance-none bg-black border py-2.5 px-5 rounded-md",
                { "border-neutral-500": !nearSelected }
              )}
              placeholder="Max NEAR Spend"
            />
          </div>
        </div>
        <div
          className={classnames("space-y-6", {
            "text-neutral-500": !nftSelected,
          })}
        >
          <div
            className="flex items-center space-x-4"
            onClick={() => setSelected("nft")}
          >
            <i
              className={`text-3xl ${
                nftSelected ? "fas fa-check-circle" : "fal fa-times-circle"
              }`}
            ></i>
            <span className="text-2xl font-bold">NFT Airdrop</span>
          </div>
          <div className="flex space-x-10">
            <label
              htmlFor="image_uploads"
              className={classnames(
                "flex-1 appearance-none bg-black border py-2.5 px-5 rounded-md",
                { "border-neutral-500": !nftSelected }
              )}
            >
              Choose images to upload (PNG, JPG)
            </label>
            <input
              id="image_uploads"
              name="image_uploads"
              type="file"
              className={classnames(
                "hidden flex-1 appearance-none bg-black border py-2.5 px-5 rounded-md",
                { "border-neutral-500": !nftSelected }
              )}
            />
            <button className="flex px-12 space-x-4 items-center bg-neutral-900 py-2.5 rounded-md">
              <i className="fal fa-image"></i>
              <span>Select NFTS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Airdrop;
