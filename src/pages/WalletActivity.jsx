import { useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { ReactComponent as AngleRight } from "../assets/img/angle-right.svg";
import { ReactComponent as FileExport } from "../assets/img/file-export.svg";
import { ReactComponent as Eye } from "../assets/img/eye.svg";
import { ReactComponent as RedTimes } from "../assets/img/red-times.svg";
import { ReactComponent as GreenCheck } from "../assets/img/green-check.svg";
import { ReactComponent as GreyClock } from "../assets/img/grey-clock.svg";
import { getWalletActivity } from "../api/walletActivity";
import { ReactComponent as Search } from "../assets/img/search.svg";
import { ConnectContext } from "../ConnectProvider";
import ReactTable from "../components/ReactTable";
import { format } from "date-fns/fp";
import { toast } from "react-toastify";

const WalletActivity = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const { accountID, walletConnection, login } = useContext(ConnectContext);
  const [page, setPage] = useState(1);
  const {
    data: { results = [], success } = {},
    isLoading,
    error,
  } = useQuery(["walletActivity", page], () =>
    getWalletActivity({ account_id: "haivuong.near" }),
  );
  const statusIcon = useMemo(
    () => ({
      SUCCESS_VALUE: <GreenCheck />,
      Failed: <RedTimes />,
      Pending: <GreyClock />,
    }),
    [],
  );
  console.log(results);
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: (row) =>
          // format(new Date(row.block_timestamp), "M/d/yyyy")
          row.block_timestamp,
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
            <div className="w-28 flex-1">{row.original.status || "N/A"}</div>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://explorer.testnet.near.org/transactions/${row.original.transaction_hash}`}
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
    [statusIcon],
  );

  useEffect(() => {
    console.log(accountID);
    console.log(walletConnection && walletConnection.isSignedIn());
    if (walletConnection && walletConnection.isSignedIn() && accountID) {
      setWalletAddress(accountID);
    }
  }, [accountID, walletConnection]);

  console.log(error);

  return (
    <div>
      <div className="text-6xl font-medium w-full pb-3">Wallet Activity</div>
      <div className="">
        <div className="flex items-center space-x-6 text-lg mt-6">
          <div className="text-lg rounded-lg w-96 border flex items-center ">
            <input
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="bg-black flex-1 rounded-l-lg py-2.5 px-5 border-r"
              placeholder="Enter Wallet (example.near)"
            />
            <button className="py-2.5 px-4">
              <Search />
            </button>
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
      {!isLoading ? (
        success || error ? (
          <div className="text-xs mt-10">
            <ReactTable data={results} columns={columns} />
          </div>
        ) : (
          "Failed"
        )
      ) : (
        "Loading ..."
      )}
    </div>
  );
};

export default WalletActivity;
