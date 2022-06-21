import { useEffect, useContext, useCallback, useState, useMemo } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as AngleRight } from "../assets/img/angle-right.svg";
import { ReactComponent as FileExport } from "../assets/img/file-export.svg";
import { ReactComponent as RedTimes } from "../assets/img/red-times.svg";
import { ReactComponent as GreenCheck } from "../assets/img/green-check.svg";
import { ReactComponent as GreyClock } from "../assets/img/grey-clock.svg";
import { ConnectContext } from "../ConnectProvider";
import ReactTable from "../components/ReactTable";
import { getNftEvents } from "../api/Nft";
import format from "date-fns/format";
import { toast } from "react-toastify";
import { net } from "../constants";
import Loader from "../assets/img/loading/loadicon2.gif";
import {
  setContractAddressAction,
  setContractAddressErrAction,
} from "../redux/actions/fans";
import { setShowConnectWallet } from "../redux/actions/topBar";

const Fans = () => {
  const dispatch = useDispatch();
  const contractAddress = useSelector((state) => state.fans.contractAddress);
  const contractAddressErr = useSelector(
    (state) => state.fans.contractAddressErr,
  );
  const fetchedOnce = useSelector((state) => state.fans.fetchedOnce);
  const { accountID, walletConnection, login } = useContext(ConnectContext);
  const [page, setPage] = useState(0);
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [focusedInput, setFocusedInput] = useState(null);
  console.log(fetchedOnce);
  const showConnectWallet = useSelector(
    (state) => state.topBar.showConnectWallet,
  );

  const setContractAddress = useCallback(
    (payload) => dispatch(setContractAddressAction(payload)),
    [dispatch],
  );
  const setContractAddressErr = useCallback(
    (payload) => dispatch(setContractAddressErrAction(payload)),
    [dispatch],
  );

  const {
    data: { results = [], success } = {},
    isLoading,
    isError,
    mutate,
  } = useMutation(["nftEvents", page, contractAddress], (getUserNftsByToken) =>
    getNftEvents(getUserNftsByToken),
  );

  const fetchWalletActivity = useCallback(async () => {
    setContractAddressErr(null);
    if (contractAddress) {
      if (
        walletConnection &&
        walletConnection._connectedAccount &&
        walletConnection._connectedAccount.connection &&
        walletConnection._connectedAccount.connection.provider
      ) {
        try {
          await walletConnection._connectedAccount.connection.provider.query({
            request_type: "view_account",
            finality: "final",
            account_id: contractAddress,
          });
        } catch (error) {
          setContractAddressErr({
            code: 1,
            message: "Please enter a valid contract address",
          });
          return;
        }
      }

      if (walletConnection && walletConnection.isSignedIn() && accountID) {
        if (contractAddress !== accountID) {
          setContractAddressErr({
            code: 2,
            message: "Use Connected Wallet",
          });
        }
      }
      mutate({
        "filter[emitted_by_contract_account_id]": contractAddress,
        related: "outcome,receipt",
        page,
        // ...(date &&
        //   date.startDate &&
        //   date.endDate && {
        //   date_column: "block_timestamp",
        //   from_date: date.startDate.unix(),
        //   to_date: date.endDate.add(1, "days").unix(),
        // }),
      });
    }
  }, [
    accountID,
    mutate,
    page,
    setContractAddressErr,
    contractAddress,
    walletConnection,
  ]);
  const handleContractAddress = async (e) => {
    e.preventDefault();
    await fetchWalletActivity();
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
          return row.emitted_at_block_timestamp
            ? format(row.emitted_at_block_timestamp / 10 ** 6, "M/d/yyyy")
            : "-";
        },
      },
      {
        Header: "From",
        accessor: (row) => {
          return row.token_old_owner_account_id
            ? row.token_old_owner_account_id
            : "N/A";
        },
      },
      {
        Header: "To",
        accessor: "token_new_owner_account_id",
      },
      {
        Header: "Type",
        accessor: "event_kind",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row, value }) => (
          <div className="flex items-center space-x-2 w-full">
            <div className="">
              {statusIcon[row.original.outcome.status] || ""}
            </div>
            <div className="w-28 flex-1">
              {statusText[row.original.outcome.status] || "N/A"}
            </div>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://explorer.${net}.near.org/transactions/${row.original.receipt.originated_from_transaction_hash}`}
            >
              <i className="fas fa-link"></i>
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://explorer.${net}.near.org/transactions/${row.original.receipt.originated_from_transaction_hash}`,
                );
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
    setContractAddress(accountID);
    setContractAddressErr(null);
  };

  useEffect(() => {
    if (
      fetchedOnce &&
      !(walletConnection && walletConnection.isSignedIn() && accountID)
    ) {
      if ((contractAddress || "").length === 0 && showConnectWallet) {
        dispatch(setShowConnectWallet(false));
      } else if ((contractAddress || "").length !== 0 && !showConnectWallet) {
        dispatch(setShowConnectWallet(true));
      }
    }
  }, [
    accountID,
    dispatch,
    fetchedOnce,
    showConnectWallet,
    contractAddress,
    walletConnection,
  ]);

  const onClickPrevious = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const onClickNext = () => {
    if (results.length === 20) {
      setPage(page + 1);
    }
  };
  useEffect(() => {
    fetchWalletActivity();
  }, [date, page]);

  console.log(isLoading, "isLoading");

  return (
    <div>
      <div className="text-6xl font-medium w-full pb-3">NFT Minters</div>
      <div className="flex items-start lg:items-end lg:space-x-6 text-lg mt-6 flex-col lg:flex-row">
        <div className="flex-1 w-full">
          <div className="text-lg">Enter minting contract address</div>
          <div className="mt-4 text-lg rounded-lg w-full border flex items-center">
            <input
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              className="bg-black flex-1 rounded-l-lg py-2.5 px-5 border-r"
              placeholder="nft1.example.near"
            />
            <button className="py-2.5 px-4" onClick={handleContractAddress}>
              <AngleRight />
            </button>
          </div>
        </div>
        <div className="mt-3 lg:mt-0">
          <button className="bg-zinc-800 py-4 text-base px-10 flex items-center font-bold space-x-4 rounded-md">
            <FileExport />
            <div className="">Export Minters</div>
          </button>
        </div>
      </div>
      {results.length ? (
        <div className="text-xs mt-10 w-full overflow-x-auto">
          <ReactTable
            data={results}
            columns={columns}
            page={page}
            perPage={20}
            onClickPrevious={onClickPrevious}
            onClickNext={onClickNext}
          />
        </div>
      ) : isLoading ? (
        <div className="flex justify-center items-center -ml-44 h-96">
          <img src={Loader} alt="Loading" />
        </div>
      ) : null}
    </div>
  );
};

export default Fans;
