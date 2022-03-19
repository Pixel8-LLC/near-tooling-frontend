import { useEffect, useState } from "react";
import classnames from "classnames";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";

import { ReactComponent as NearIcon } from "../../../assets/img/near-icon.svg";
import images from "./files";
import classes from "./Step3.module.css";

const Step3 = () => {
  const [selImgs, setSelImgs] = useState([]);
  let [referenceElement, setReferenceElement] = useState();
  let [arrowElement, setArrowElement] = useState();
  let [groupedImgs, setGroupedImgs] = useState({});
  let [popperElement, setPopperElement] = useState();
  const [walletFilter, setWalletFilter] = useState("");
  let { styles, attributes, state } = usePopper(
    referenceElement,
    popperElement,
    {
      // placement: "right",
      modifiers: [
        {
          name: "arrow",
          options: {
            element: arrowElement,
          },
        },
        {
          name: "offset",
          options: {
            offset: [30, 18],
          },
        },
      ],
    },
  );

  useEffect(() => {
    setGroupedImgs(
      images.reduce(
        (r, v, i, a, k = v.wallet) => ((r[k] || (r[k] = [])).push(v), r),
        {},
      ),
    );
  }, []);

  const toggleSelImgs = (id) => {
    setSelImgs((prev) =>
      prev.includes(id) ? prev.filter((val) => val !== id) : [...prev, id],
    );
  };

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
          <button
            onClick={() => setWalletFilter("")}
            className="bg-white py-4 px-8 text-black font-bold rounded-t-lg w-full text-left"
          >
            All NFTs ({images.length})
          </button>
          <div className="pr-3">
            <div className="h-96 mt-6 space-y-8 overflow-auto">
              {Object.entries(groupedImgs).map(([key, val]) => (
                <button
                  onClick={() => setWalletFilter(key)}
                  key={key}
                  className="pl-8 pr-4"
                >
                  {key} ({(val || []).length})
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 border border-neutral-900 rounded-lg px-10">
          <div className="flex items-center space-x-4">
            <div className="mb-4 flex-1">
              <div className="text-2xl font-bold mt-9">All NFTs</div>
              <div className="text-sm opacity-60 h-4">
                {selImgs.length > 0 && <>({selImgs.length} Selected)</>}
              </div>
            </div>
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    ref={setReferenceElement}
                    className={classnames(
                      "space-x-6 py-3 px-5 rounded-lg",
                      { "bg-white text-black": open },
                      { "bg-neutral-900": !open },
                    )}
                  >
                    <span>Move to Wallet</span>
                    <i
                      className={classnames(
                        "far",
                        { "fa-times": open },
                        { "fa-chevron-down": !open },
                      )}
                    ></i>
                  </Popover.Button>

                  <Popover.Panel
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popperwhite}
                    className="absolute z-10 min-w-[15rem] bg-neutral-900 rounded-xl"
                  >
                    <div
                      className={classes.arrow}
                      style={styles.arrow}
                      ref={setArrowElement}
                    ></div>
                    <div className="text-center px-4 py-8">
                      <div className="overflow-auto max-h-44 pr-1">
                        {Object.entries(groupedImgs).map(([key, val]) => (
                          <button className="flex w-full">
                            <div className="flex-1">
                              <div className="truncate text-left w-36">
                                {key}
                              </div>
                            </div>
                            <div className="text-right">
                              ({(val || []).length})
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <img src="/solutions.jpg" alt="" />
                  </Popover.Panel>
                </>
              )}
            </Popover>
            <button className="bg-neutral-900 space-x-6 py-3 px-5 rounded-lg">
              <i className="far fa-trash"></i>
            </button>
          </div>
          <div className="h-96 overflow-auto">
            <div className="grid grid-cols-4 gap-x-7 gap-y-6">
              {(!!walletFilter ? groupedImgs[walletFilter] : images).map(
                (val, index) => {
                  const checked = selImgs.includes(val.id);
                  return (
                    <div key={val.id} className="relative group">
                      <label htmlFor={`sel${val.id}`}>
                        <div className="relative w-full h-full">
                          <div
                            className={classnames(
                              "hidden group-hover:block absolute h-full w-full text-white text-sm py-6 px-4 group-hover:bg-black/50 rounded-2xl",
                            )}
                          >
                            {`Translucent Vandal for Ukraine ${val.id}`}
                          </div>
                          <img
                            className={classnames(
                              "rounded-2xl w-full h-full",
                              {
                                "group-hover:border-4 group-hover:border-neutral-900":
                                  !checked,
                              },
                              { "border-4 border-neutral-900": checked },
                            )}
                            src={val.image}
                            alt={`${val.id}`}
                          />
                        </div>
                        <div
                          className={classnames(
                            "absolute bottom-0 right-0 p-1.5 bg-neutral-900 rounded-full",
                            { "hidden group-hover:block": !checked },
                          )}
                        >
                          <div className="bg-black w-4 h-4 rounded-full text-[8px] text-white flex justify-center items-center">
                            {selImgs.includes(val.id) ? (
                              <i className="far fa-check"></i>
                            ) : null}
                          </div>
                          <input
                            className="hidden"
                            type="checkbox"
                            name={`sel${val.id}`}
                            checked={selImgs.includes(val.id)}
                            onChange={() => toggleSelImgs(val.id)}
                            id={`sel${val.id}`}
                          />
                        </div>
                      </label>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
