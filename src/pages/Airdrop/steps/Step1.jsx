import { Fragment, useState } from "react";
import classnames from "classnames";
import { v4 as uuidv4 } from "uuid";
import { Dialog, Transition } from "@headlessui/react";
import images from "./files";

const Step1 = () => {
  const [selected, setSelected] = useState("near");
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selImgs, setSelImgs] = useState([]);

  const nearSelected = selected === "near";
  const nftSelected = selected === "nft";

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
    <div className="space-y-14">
      <div
        className={classnames("space-y-6", {
          "text-neutral-500": !nearSelected,
        })}
      >
        <button
          className="flex items-center space-x-4"
          onClick={() => setSelected("near")}
        >
          <i
            className={`text-3xl ${
              nearSelected ? "fas fa-check-circle" : "fal fa-times-circle"
            }`}
          ></i>
          <span className="text-2xl font-bold">NEAR Airdrop</span>
        </button>
        <div className="flex space-x-10">
          <input
            type="number"
            disabled={!nearSelected}
            className={classnames(
              "flex-1 appearance-none bg-black border py-2.5 px-5 rounded-md",
              { "border-neutral-500": !nearSelected },
            )}
          />
          <input
            disabled={!nearSelected}
            className={classnames(
              "flex-1 appearance-none bg-black border py-2.5 px-5 rounded-md",
              { "border-neutral-500": !nearSelected },
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
        <button
          className="flex items-center space-x-4"
          onClick={() => setSelected("nft")}
        >
          <i
            className={`text-3xl ${
              nftSelected ? "fas fa-check-circle" : "fal fa-times-circle"
            }`}
          ></i>
          <span className="text-2xl font-bold">NFT Airdrop</span>
        </button>
        <div className="flex space-x-10">
          <div
            className={classnames(
              "cursor-pointer flex-1 flex items-center appearance-none bg-black border  rounded-md",
              { "border-neutral-500": !nftSelected },
            )}
          >
            <label htmlFor="image_uploads" className="flex-1 py-2.5 px-5">
              {selectedFile
                ? selectedFile?.name
                : "Choose images to upload (PNG, JPG)"}
            </label>
            <button
              onClick={() =>
                setFiles((prev) => [
                  ...prev,
                  { tempId: uuidv4(), file: selectedFile },
                ])
              }
              className={classnames("border-l py-2.5 px-4", {
                "border-neutral-500": !nftSelected,
              })}
            >
              <i className="far fa-plus"></i>
            </button>
          </div>
          <input
            id="image_uploads"
            name="image_uploads"
            type="file"
            disabled={!nftSelected}
            onChange={(e) => setSelectedFile(e.target.files?.[0])}
            className={classnames(
              "hidden flex-1 appearance-none bg-black border py-2.5 px-5 rounded-md",
              { "border-neutral-500": !nftSelected },
            )}
          />
          <button
            disabled={!nftSelected}
            onClick={openModal}
            className="flex px-12 space-x-4 items-center bg-neutral-900 py-2.5 rounded-md"
          >
            <i className="fal fa-image"></i>
            <span>Select NFTS</span>
          </button>
        </div>
        <div
          className={classnames("border rounded-lg p-5 w-full", {
            "border-neutral-500": !nftSelected,
          })}
        >
          <div className="h-48 overflow-auto w-full space-y-2">
            {files.map(({ file, tempId }) => {
              return (
                <div
                  key={tempId}
                  className="flex items-center w-full space-x-4 pr-8"
                >
                  <div className="flex-1">{file.name}</div>
                  <button
                    className="far fa-times"
                    disabled={!nftSelected}
                    onClick={() =>
                      setFiles((prev) =>
                        prev.filter((val) => val.tempId !== tempId),
                      )
                    }
                  ></button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
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
                <div className="z-20 absolute w-full h-1/3 bottom-0 bg-gradient-to-t from-neutral-900 to-neutral-700/0"></div>
                <div className="z-10 px-9">
                  <Dialog.Title
                    as="h3"
                    className="flex items-center justify-between px-12 pt-8 pb-4"
                  >
                    <div className="text-4xl leading-6 text-white">
                      <span>Your</span> <span className="font-bold">NFTs</span>
                    </div>
                    <div className="text-2xl text-neutral-500">
                      ({selImgs.length} Selected)
                    </div>
                  </Dialog.Title>
                  <div className="relative">
                    <div className="mt-2 pl-6 pr-5 pb-28 grid grid-cols-4 max-h-[65vh] overflow-y-auto gap-x-7 gap-y-6">
                      {images.map((val, index) => {
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
                      })}
                    </div>
                    <div className="z-20 mt-4 absolute bottom-12 w-full flex items-center justify-center">
                      <button
                        type="button"
                        className="px-28 py-4 text-lg font-bold bg-white border border-transparent rounded-md"
                        onClick={closeModal}
                      >
                        Add 1 NFT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Step1;
