import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";

import { DateRangePicker, SingleDatePicker, DayPickerRangeController, isInclusivelyBeforeDay } from 'react-dates';
import 'react-dates/initialize';
import "react-dates/lib/css/_datepicker.css";

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
import { useDispatch, useSelector } from "react-redux";
import { setShowConnectWallet } from "../redux/actions/topBar";
import moment from 'moment';

const WalletActivity = () => {
  const dispatch = useDispatch();
  const [walletAddress, setWalletAddress] = useState("");
  const [walletAddressErr, setWalletAddressErr] = useState(null);
  const { accountID, walletConnection, login } = useContext(ConnectContext);
  const [page, setPage] = useState(0);
  const [fetchedOnce, setFetchedOnce] = useState(false);
  const [date, setDate] = useState({
    startDate: null,
    endDate: null
  });
  const [focusedInput, setFocusedInput] = useState(null)

  const showConnectWallet = useSelector(
    (state) => state.topBar.showConnectWallet,
  );

  const {
    data: { results = [], success } = {},
    isLoading,
    isError,
    mutate,
  } = useMutation(
    ["walletActivity", page, walletAddress],
    (walletActivityParams) => getWalletActivity(walletActivityParams),
  );

  const handleWalletAddress = async (e) => {
    e.preventDefault();
    setWalletAddressErr(null);
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
          account_id: walletAddress,
        });
      } catch (error) {
        setWalletAddressErr({
          code: 1,
          message: "Please enter a valid wallet address",
        });
        return;
      }
    }

    if (walletConnection && walletConnection.isSignedIn() && accountID) {
      if (walletAddress !== accountID) {
        setWalletAddressErr({
          code: 2,
          message: "Use Connected Wallet",
        });

        return;
      }
    }
    mutate({ account_id: walletAddress, page });
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

  const setSearchBarWithAccountID = useCallback(() => {
    if (walletConnection && walletConnection.isSignedIn() && accountID) {
      setWalletAddress(accountID);
    }
  }, [accountID, walletConnection]);

  useEffect(() => {
    setSearchBarWithAccountID();
  }, [accountID, setSearchBarWithAccountID, walletConnection]);

  useEffect(() => {
    if (!(walletConnection && walletConnection.isSignedIn() && accountID)) {
      if ((walletAddress || "").length === 0 && showConnectWallet) {
        dispatch(setShowConnectWallet(false));
      } else if ((walletAddress || "").length !== 0 && !showConnectWallet) {
        dispatch(setShowConnectWallet(true));
      }
    }
  }, [accountID, dispatch, showConnectWallet, walletAddress, walletConnection]);

  useEffect(() => {
    if (walletAddress) {
      mutate({ account_id: walletAddress, page });
      setFetchedOnce(true);
    }
  }, [walletAddress, page])

  const onClickPrevious = () => {
    if (page > 0) {
      setPage(page - 1)
    }
  }
  const onClickNext = () => {
    if (results.length === 20) {
      setPage(page + 1)
    }
  }
  useEffect(() => {
    if (date.startDate && date.endDate) {
      mutate({ account_id: walletAddress, page, date_column: 'block_timestamp', from_date: date.startDate.unix(), to_date: date.endDate.add(1, 'days').unix() });
      setFetchedOnce(true);
    }
  }, [date])
  return (
    <div>
      <div className="text-6xl font-medium w-full pb-3">Wallet Activity</div>

      <div className="">
        <div className="flex items-center space-x-6 text-lg mt-6">
          <div className="mt-3">
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
            <div className="text-xs mt-3">
              {walletAddressErr ? (
                walletAddressErr.code === 1 ? (
                  walletAddressErr.message
                ) : walletAddressErr.code === 2 ? (
                  <button onClick={setSearchBarWithAccountID}>
                    {walletAddressErr.message}
                  </button>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          </div>
          {!(walletConnection && walletConnection.isSignedIn()) &&
            !showConnectWallet && (
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
              <>
                <div className="mb-5">
                  <p>Filter By Date:</p>
                  <DateRangePicker
                    startDate={date.startDate} // momentPropTypes.momentObj or null,
                    startDateId="start_date_id" // PropTypes.string.isRequired,
                    endDate={date.endDate} // momentPropTypes.momentObj or null,
                    endDateId="end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={(date) => setDate(date)} // PropTypes.func.isRequired,
                    focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
                    isOutsideRange={day =>
                      !isInclusivelyBeforeDay(day, moment())
                    }
                  />
                </div>
                <div className="text-xs">
                  <ReactTable data={results} columns={columns} useFilters onClickPrevious={onClickPrevious} onClickNext={onClickNext} page={page} perPage={20} />
                </div>
              </>
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
