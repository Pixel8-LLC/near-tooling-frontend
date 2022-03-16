import { Fragment, useState } from "react";
import classnames from "classnames";
import { v4 as uuidv4 } from "uuid";
import { Dialog, Transition } from "@headlessui/react";

const Step1 = () => {
  const [selected, setSelected] = useState("near");
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const nearSelected = selected === "near";
  const nftSelected = selected === "nft";

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
              { "border-neutral-500": !nearSelected }
            )}
          />
          <input
            disabled={!nearSelected}
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
              { "border-neutral-500": !nftSelected }
            )}
          >
            <label htmlFor="image_uploads" className="flex-1 py-2.5 px-5  ">
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
              { "border-neutral-500": !nftSelected }
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
                        prev.filter((val) => val.tempId !== tempId)
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
              <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-neutral-700 shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="flex items-center justify-between"
                >
                  <div className="text-4xl leading-6 text-white">
                    <span>Your</span> <span className="font-bold">NFTs</span>
                  </div>
                  <div className="text-2xl text-neutral-500">(1 Selected)</div>
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your payment has been successfully submitted. We’ve sent you
                    an email with all of the details of your order.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Got it, thanks!
                  </button>
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
