import { useState } from "react";
import classnames from "classnames";
import { v4 as uuidv4 } from "uuid";

const Step1 = () => {
  const [selected, setSelected] = useState("near");
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const nearSelected = selected === "near";
  const nftSelected = selected === "nft";

  console.log(selectedFile);

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
                <div className="flex items-center w-full space-x-4 pr-8">
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
    </div>
  );
};

export default Step1;
