import { Fragment, useEffect, useState } from "react";
import classnames from "classnames";
import { Dialog, Popover, Transition } from "@headlessui/react";
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
  const [isOpen, setIsOpen] = useState(false);

  let { styles, attributes } = usePopper(referenceElement, popperElement, {
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
  });

  useEffect(() => {
    setGroupedImgs(
      images.reduce(
        // eslint-disable-next-line no-sequences
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

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div>
      <div className="mt-10">
        <div className="text-2xl">
          <span className="font-bold">Distribution</span>
          <span> - 3 Wallets</span>
        </div>
        <div className="mt-5 flex items-centext-neutral-400ter justify-between">
          <div className="">
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
          <button className="flex px-9 space-x-4 items-center bg-neutral-900 py-4 rounded-md font-bold">
            <i className="far fa-dice"></i>
            <span className="font-bold">Randomize Distribution</span>
          </button>
        </div>
      </div>

      <div className="mt-9 flex space-x-8">
        <div className="w-64 border border-neutral-900 rounded-lg">
          <button
            onClick={() => setWalletFilter("")}
            className={classnames(
              "font-bold rounded-t-lg w-full py-4 px-8 text-left border-b border-neutral-900",
              { "bg-white text-black": walletFilter === "" },
            )}
          >
            All NFTs ({images.length})
          </button>
          <div className="pr-3">
            <div className="h-96 mt-6 space-y-8 overflow-auto">
              {Object.entries(groupedImgs).map(([key, val]) => (
                <div className="flex items-center">
                  <div
                    className={classnames("h-6 w-1 rounded-lg bg-white", {
                      hidden: walletFilter !== key,
                    })}
                  ></div>
                  <button
                    onClick={() => setWalletFilter(key)}
                    key={key}
                    title={key}
                    className={classnames("pl-8 pr-4 flex", {
                      "opacity-80": walletFilter !== key,
                    })}
                  >
                    <span className="max-w-[10rem] truncate">{key}</span>{" "}
                    <span>({(val || []).length})</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 border border-neutral-900 rounded-lg px-10">
          <div className="flex items-center space-x-4">
            <div className="mb-4 flex-1">
              <div
                className="text-2xl font-bold mt-9 max-w-[15rem] truncate"
                title={!!walletFilter ? walletFilter : "All NFTs"}
              >
                {!!walletFilter ? walletFilter : "All NFTs"}
              </div>
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

      <button
        className="mt-5 px-8 py-3 bg-neutral-900 rounded-lg"
        onClick={openModal}
      >
        Test error modal
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => {}}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="relative inline-block w-full max-w-3xl overflow-hidden text-left align-middle transition-all transform bg-neutral-700 shadow-xl rounded-2xl">
                <div className="z-10 px-9 pt-16 pb-20">
                  <Dialog.Title
                    as="h3"
                    className="flex flex-col items-center justify-between px-36 pt-8 pb-4 text-center"
                  >
                    <i className="far fa-exclamation-circle text-6xl leading-6 text-white mb-11"></i>
                    <div className="text-4xl text-white mb-10 leading-10">
                      This Airdrop cannot be completed
                    </div>
                    <div className="text-lg mb-16 text-white">
                      You've exceeded your maximum NEAR spend.
                    </div>
                    <button
                      onClick={closeModal}
                      className="flex items-center justify-center py-4 px-36 bg-white text-neutral-900 rounded-lg space-x-10 text-center"
                    >
                      <i className="far fa-chevron-left"></i>
                      <span className="text-lg">Go Back</span>
                    </button>
                  </Dialog.Title>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Step3;
