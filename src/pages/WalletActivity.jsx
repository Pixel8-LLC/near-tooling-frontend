import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useMutation } from "react-query";

import { DateRangePicker, isInclusivelyBeforeDay } from "react-dates";
import "react-dates/initialize";
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
import moment from "moment";
import {
  setFetchedOnceAction,
  setWalletAddressAction,
  setWalletAddressErrAction,
} from "../redux/actions/walletActivity";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import Loader from '../common/Loader';

const WalletActivity = () => {
  const dispatch = useDispatch();
  const walletAddress = useSelector(
    (state) => state.walletActivity.walletAddress,
  );
  const walletAddressErr = useSelector(
    (state) => state.walletActivity.walletAddressErr,
  );
  const fetchedOnce = useSelector((state) => state.walletActivity.fetchedOnce);
  const [selectedStatus, setSelectedStatus] = useState({ label: "All Transactions", value: 'All Status' });
  const [selectedType, setSelectedType] = useState("All Types");
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

  const setWalletAddress = useCallback(
    (payload) => dispatch(setWalletAddressAction(payload)),
    [dispatch],
  );
  const setWalletAddressErr = useCallback(
    (payload) => dispatch(setWalletAddressErrAction(payload)),
    [dispatch],
  );
  const setFetchedOnce = useCallback(
    (payload) => dispatch(setFetchedOnceAction(payload)),
    [dispatch],
  );

  const {
    data: { results = [] } = {},
    isLoading,
    isError,
    mutate,
  } = useMutation(
    ["walletActivity", page, walletAddress],
    (walletActivityParams) => getWalletActivity(walletActivityParams),
  );

  const fetchWalletActivity = useCallback(async () => {
    setWalletAddressErr(null);
    if (walletAddress) {
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

        }
      }
      mutate({
        account_id: walletAddress,
        page,
        ...(date &&
          date.startDate &&
          date.endDate && {
          date_column: "block_timestamp",
          from_date: date.startDate.unix(),
          to_date: date.endDate.add(1, "days").unix(),
        }),
        ...(selectedType &&
          selectedType !== "All Types" && {
          type: selectedType,
        }),
        ...(selectedStatus &&
          selectedStatus.value !== "All Status" && {
          status: selectedStatus.value,
        }),
      });
      setFetchedOnce(true);
    } else if (accountID) {
      mutate({
        account_id: accountID,
        page,
        ...(date &&
          date.startDate &&
          date.endDate && {
          date_column: "block_timestamp",
          from_date: date.startDate.unix(),
          to_date: date.endDate.add(1, "days").unix(),
        }),
        ...(selectedType &&
          selectedType !== "All Types" && {
          type: selectedType,
        }),
        ...(selectedStatus &&
          selectedStatus.value !== "All Status" && {
          status: selectedStatus.value,
        }),
      });
      setFetchedOnce(true);
    }
  }, [
    accountID,
    date,
    mutate,
    page,
    selectedStatus,
    selectedType,
    setFetchedOnce,
    setWalletAddressErr,
    walletAddress,
    walletConnection,
  ]);
  const handleWalletAddress = async (e) => {
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
  const statuses = [{ label: "All Transactions", value: 'All Status' }, { label: 'Successful Transactions', value: "SUCCESS_VALUE" }, { label: 'Failed Transactions', value: "FAILURE" }];
  const types = ["All Types", "MINT", "TRANSFER", "FUNCTION_CALL", "ADD_KEY"];
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
    setWalletAddress(accountID);
    setWalletAddressErr(null);
  }

  useEffect(() => {
    if (
      fetchedOnce &&
      !(walletConnection && walletConnection.isSignedIn() && accountID)
    ) {
      if ((walletAddress || "").length === 0 && showConnectWallet) {
        dispatch(setShowConnectWallet(false));
      } else if ((walletAddress || "").length !== 0 && !showConnectWallet) {
        dispatch(setShowConnectWallet(true));
      }
    }
  }, [
    accountID,
    dispatch,
    fetchedOnce,
    showConnectWallet,
    walletAddress,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, selectedType, selectedStatus, page]);

  useEffect(() => {
    if (accountID)
      fetchWalletActivity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountID]);

  useEffect(() => {
    if (!(walletAddressErr && walletAddressErr.code !== 2) && (walletAddress && accountID && (walletAddress !== accountID))) {
      setWalletAddressErr({
        code: 2,
        message: "Use Connected Wallet",
      });
    } else if (!walletAddress) {
      setWalletAddressErr(null);
    }
  }, [walletAddress])
  return (
    <div>
      <div className="text-6xl font-medium w-full pb-3">Wallet Activity</div>

      <div className="">
        <div className="flex items-center space-x-6 text-lg mt-6">
          <div>
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
          </div>
          {!(walletConnection && walletConnection.isSignedIn()) &&
            showConnectWallet && (
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
      <div className="mt-10">
        {!isLoading ? (
          fetchedOnce ? (
            !isError ? (
              <>
                <div className="flex items-center mb-5 space-x-4">
                  <div className="">
                    <p>Filter By Date:</p>
                    <DateRangePicker
                      startDate={date.startDate} // momentPropTypes.momentObj or null,
                      startDateId="start_date_id" // PropTypes.string.isRequired,
                      endDate={date.endDate} // momentPropTypes.momentObj or null,
                      endDateId="end_date_id" // PropTypes.string.isRequired,
                      onDatesChange={(date) => setDate(date)} // PropTypes.func.isRequired,
                      focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                      onFocusChange={(focusedInput) =>
                        setFocusedInput(focusedInput)
                      } // PropTypes.func.isRequired,
                      isOutsideRange={(day) =>
                        !isInclusivelyBeforeDay(day, moment())
                      }
                    />
                  </div>
                  <div className="w-72 top-16">
                    <Listbox
                      value={selectedStatus.label}
                      onChange={setSelectedStatus}
                    >
                      <div className="relative mt-6">
                        <Listbox.Button className="relative w-full py-3.5 pl-3 pr-10 text-left bg-white shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500">
                          <span className="block truncate text-neutral-600">
                            {selectedStatus.label}
                          </span>
                          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <SelectorIcon
                              className="w-5 h-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {statuses.map((status) => (
                              <Listbox.Option
                                key={status}
                                className={({ active }) =>
                                  `cursor-default select-none relative py-2 pl-10 pr-4 ${active
                                    ? "text-amber-900 bg-amber-100"
                                    : "text-gray-900"
                                  }`
                                }
                                value={status}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${selected
                                        ? "font-medium"
                                        : "font-normal"
                                        }`}
                                    >
                                      {status.label}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon
                                          className="w-5 h-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                  <div className="w-72 top-16">
                    <Listbox value={selectedType} onChange={setSelectedType}>
                      <div className="relative mt-6">
                        <Listbox.Button className="relative w-full py-3.5 pl-3 pr-10 text-left bg-white shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500">
                          <span className="block truncate text-neutral-600">
                            {selectedType}
                          </span>
                          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <SelectorIcon
                              className="w-5 h-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {types.map((type) => (
                              <Listbox.Option
                                key={type}
                                className={({ active }) =>
                                  `cursor-default select-none relative py-2 pl-10 pr-4 ${active
                                    ? "text-amber-900 bg-amber-100"
                                    : "text-gray-900"
                                  }`
                                }
                                value={type}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${selected
                                        ? "font-medium"
                                        : "font-normal"
                                        }`}
                                    >
                                      {type}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon
                                          className="w-5 h-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                </div>
                {
                  results && results.length ? (
                    <div className="text-xs">
                      <ReactTable
                        data={results}
                        columns={columns}
                        useFilters
                        onClickPrevious={onClickPrevious}
                        onClickNext={onClickNext}
                        page={page}
                        perPage={20}
                      />
                    </div>

                  ) : (
                    "No Data"
                  )
                }
              </>
            ) : (
              "Failed"
            )
          ) : (
            ""
          )
        ) : (
          <div className="flex justify-center items-center h-96"><Loader /></div>
        )}
      </div>
    </div>
  );
};

export default WalletActivity;
