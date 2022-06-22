import classnames from "classnames";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ReactComponent as NearIcon } from "../../../assets/img/near-icon.svg";

const Step2 = () => {
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const addRecipient = () => {
    setRecipients((prev) => [
      ...prev,
      { tempId: uuidv4(), recipient: selectedRecipient },
    ]);
    selectedRecipient("");
  };
  return (
    <div>
      <div>
        <div className="text-2xl font-bold">Sending:</div>
        <div className="mt-2 text-lg">
          <div className="flex items-center space-x-5">
            <i className="fas fa-image"></i>
            <div>69 NFT</div>
          </div>
          <div className="flex items-center space-x-5">
            <NearIcon />
            <div>420 NEAR</div>
          </div>
        </div>
      </div>
      <div className="mt-12 space-y-6">
        <div className="text-2xl font-bold">Recipients:</div>
        <div className="flex space-x-10">
          <div
            className={classnames(
              "cursor-pointer flex-1 flex items-center appearance-none bg-black border rounded-md",
            )}
          >
            <input
              id="image_uploads"
              name="image_uploads"
              onChange={(e) => setSelectedRecipient(e.target.value)}
              value={selectedRecipient}
              className={classnames(
                "flex-1 appearance-none bg-black py-2.5 px-5 rounded-l-md text-lg",
              )}
              placeholder="Recipients"
            />
            <button
              onClick={addRecipient}
              className={classnames("border-l py-2.5 px-4")}
            >
              <i className="far fa-plus"></i>
            </button>
          </div>
          <label
            htmlFor="recipient"
            className="cursor-pointer flex px-12 space-x-4 items-center bg-neutral-900 py-2.5 rounded-md font-bold"
          >
            <input
              type="file"
              id="recipient"
              name="recipient"
              className="hidden"
            />
            <i className="far fa-file-import"></i>
            <span>Import CSV</span>
          </label>
        </div>
        <div className={classnames("border rounded-lg p-5 w-full text-lg")}>
          <div className="h-48 overflow-auto w-full space-y-2">
            {recipients.map(({ recipient, tempId }) => {
              return (
                <div
                  key={tempId}
                  className="flex items-center w-full space-x-4 pr-8"
                >
                  <div className="flex-1">{recipient}</div>
                  <button
                    className="far fa-times"
                    onClick={() =>
                      setRecipients((prev) =>
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
    </div>
  );
};

export default Step2;
