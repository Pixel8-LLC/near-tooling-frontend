import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
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
              class={`text-3xl ${
                nearSelected ? "fas fa-check-circle" : "fal fa-times-circle"
              }`}
            ></i>
            <span className="text-2xl font-bold">NEAR Airdrop</span>
          </div>
          <div className="flex space-x-10">
            <input
              type="number"
              className="flex-1 appearance-none bg-black border py-2.5 px-5 rounded-md"
            />
            <input
              className="flex-1 appearance-none bg-black border py-2.5 px-5 rounded-md"
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
            <i class="text-3xl fal fa-times-circle"></i>
            <span className="text-2xl font-bold">NFT Airdrop</span>
          </div>
          <div className="flex space-x-10">
            <label
              for="image_uploads"
              className="flex-1 appearance-none bg-black border border-neutral-500 py-2.5 px-5 rounded-md"
            >
              Choose images to upload (PNG, JPG)
            </label>
            <input
              id="image_uploads"
              name="image_uploads"
              type="file"
              className="hidden flex-1 appearance-none bg-black border py-2.5 px-5 rounded-md"
            />
            <button className="flex px-12 space-x-4 items-center bg-neutral-900 text-neutral-400 py-2.5 rounded-md">
              <i class="fal fa-image"></i>
              <span>Select NFTS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Airdrop;

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
