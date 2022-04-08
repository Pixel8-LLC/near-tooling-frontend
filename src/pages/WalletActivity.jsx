import { useContext, useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import { ReactComponent as RedTimes } from "../assets/img/red-times.svg";
import { ReactComponent as GreenCheck } from "../assets/img/green-check.svg";
import { ReactComponent as GreyClock } from "../assets/img/grey-clock.svg";
import { getWalletActivity } from "../api/walletActivity";
import { ReactComponent as Search } from "../assets/img/search.svg";
import { ConnectContext } from "../ConnectProvider";
import ReactTable from "../components/ReactTable";
import format from "date-fns/format";
import { toast } from "react-toastify";
import { net } from "../constants";

const WalletActivity = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [walletAddressErrMsg, setWalletAddressErrMsg] = useState("");
  const { accountID, walletConnection, login } = useContext(ConnectContext);
  const [page, setPage] = useState(1);
  const [fetchedOnce, setFetchedOnce] = useState(false);
  const {
    data: { results = [], success } = {},
    isLoading,
    isError,
    mutate,
  } = useMutation(
    ["walletActivity", page, walletAddress],
    (walletActivityParams) => getWalletActivity(walletActivityParams),
  );

  const handleWalletAddress = (e) => {
    e.preventDefault();
    if (walletConnection && walletConnection.isSignedIn() && accountID) {
      if (walletAddress !== accountID) {
        setWalletAddressErrMsg("Use Connected Wallet");
        return;
      }
    }
    mutate({ account_id: walletAddress });
    setFetchedOnce(true);
  };

  const statusIcon = useMemo(
    () => ({
      SUCCESS_VALUE: <GreenCheck />,
      SUCCESS_RECEIPT_ID: <GreenCheck />,
      FAILURE: <RedTimes />,
      Pending: <GreyClock />,
    }),
    [],
  );
  const statusText = useMemo(
    () => ({
      SUCCESS_VALUE: "Succeeded",
      SUCCESS_RECEIPT_ID: "Succeeded",
      FAILURE: "Failed",
      Pending: "Pending",
    }),
    [],
  );
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: (row) => {
          return row.block_timestamp
            ? format(row.block_timestamp / 10 ** 6, "M/d/yyyy")
            : "-";
        },
      },
      {
        Header: "From",
        accessor: "signer_account_id",
      },
      {
        Header: "To",
        accessor: "receiver_account_id",
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row, value }) => (
          <div className="flex items-center space-x-2 w-full">
            <div className="">{statusIcon[row.original.status] || ""}</div>
            <div className="w-28 flex-1">
              {statusText[row.original.status] || "N/A"}
            </div>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://explorer.${net}.near.org/transactions/${row.original.transaction_hash}`}
            >
              <i className="fas fa-link"></i>
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(row.original.transaction_hash);
                toast.success("Copied transaction hash");
              }}
            >
              <i className="fas fa-clipboard"></i>
            </button>
          </div>
        ),
      },
    ],
    [statusIcon, statusText],
  );

  const setSearchBarWithAccountID = () => {
    if (walletConnection && walletConnection.isSignedIn() && accountID) {
      setWalletAddress(accountID);
    }
  };

  useEffect(() => {
    setSearchBarWithAccountID();
  }, [accountID, walletConnection]);

  return (
    <div>
      <div className="text-6xl font-medium w-full pb-3">Wallet Activity</div>
      <div className="">
        <div className="flex items-center space-x-6 text-lg mt-6">
          <div className="">
            <form
              id="search"
              className="text-lg rounded-lg w-96 border flex items-center"
              onSubmit={handleWalletAddress}
            >
              <input
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="bg-black flex-1 rounded-l-lg py-2.5 px-5 border-r"
                placeholder="Enter Wallet (example.near)"
              />
              <label
                role="button"
                htmlFor="searchWallet"
                className="py-2.5 px-4"
              >
                <Search />
              </label>
              <input
                id="searchWallet"
                className="hidden"
                type="submit"
                value="Search"
              />
            </form>
            <div
              onClick={setSearchBarWithAccountID}
              className="text-xs mt-3"
              role="button"
            >
              {walletAddressErrMsg}
            </div>
          </div>
          {!(walletConnection && walletConnection.isSignedIn()) && (
            <>
              <div className="font-bold text-sm">OR</div>
              <button
                onClick={() => login()}
                className="text-base font-medium bg-white text-black rounded-lg px-4 py-3"
              >
                Connect Wallet
              </button>
            </>
          )}
        </div>
      </div>
      <div className="mt-10">
        {!isLoading ? (
          fetchedOnce ? (
            success || isError ? (
              <div className="text-xs">
                <ReactTable data={results} columns={columns} />
              </div>
            ) : (
              "Failed"
            )
          ) : (
            ""
          )
        ) : (
          "Loading ..."
        )}
      </div>
    </div>
  );
};

export default WalletActivity;
