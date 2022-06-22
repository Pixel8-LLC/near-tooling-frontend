import { useMemo, useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import format from "date-fns/format";
import { toast } from "react-toastify";
import ReactImageFallback from "react-image-fallback";

import { ReactComponent as ShareFromSquare } from "../assets/img/share-from-square.svg";
import artworks from "../constants/artWorks";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Eye } from "../assets/img/eye.svg";
import { ReactComponent as RedTimes } from "../assets/img/red-times.svg";
import { ReactComponent as GreenCheck } from "../assets/img/green-check.svg";
import { ReactComponent as GreyClock } from "../assets/img/grey-clock.svg";
import ReactTable from "../components/ReactTable";
import { ConnectContext } from "../ConnectProvider";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";
import classes from "./SingleNFT.module.css";
import { getUserNftByTokenId } from "../api/UserNft";
import { getNftEvents } from "../api/Nft";
import NotFoundImg from "../assets/img/NotFound.svg";
import Loader from "../assets/img/loading/loadicon2.gif";
import FallbackImg from "../assets/img/fallback/Fallback_7.jpg";

const SingleNFT = () => {
  const { id } = useParams();
  const location = useLocation();
  const idRaw = id.split(":");
  const contract_id = idRaw[idRaw.length - 1];
  const token_id = id.replace(`:${contract_id}`, "");
  let [referenceElement, setReferenceElement] = useState();
  let [arrowElement, setArrowElement] = useState();
  let [popperElement, setPopperElement] = useState();
  const { accountID, walletConnection, login } = useContext(ConnectContext);
  const dispatch = useDispatch();
  const [walletAddress, setWalletAddress] = useState("");
  const [page, setPage] = useState(0);
  const {
    data: { metadata = {}, success } = {},
    isLoading,
    isError,
    mutate,
  } = useMutation(
    ["userNftByTokenId", page, walletAddress],
    (getUserNftsByToken) => getUserNftByTokenId(getUserNftsByToken),
  );
  const {
    data: { results = [] } = {},
    isLoading: isNFTLoading,
    isError: nftLoadingError,
    mutate: nftActivitymutate,
  } = useMutation(["nftEvents", page, walletAddress], (getUserNftsByToken) =>
    getNftEvents(getUserNftsByToken),
  );
  useEffect(() => {
    if (location.search) {
      let wallet = location.search.split("=")[1];
      setWalletAddress(wallet);
      mutate({ account_id: wallet });
    }
  }, [location]);

  useEffect(() => {
    if (contract_id && token_id && walletAddress) {
      mutate({ contract_id, token_id, account_id: walletAddress });
    }
  }, [contract_id, token_id, mutate, nftActivitymutate, walletAddress]);

  useEffect(() => {
    nftActivitymutate({
      "filter[token_id]": token_id,
      page,
      related: "outcome,receipt",
    });
  }, [page]);

  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "right",
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
          offset: [-40, 10],
        },
      },
    ],
  });

  const statusIcon = useMemo(
    () => ({
      SUCCESS_VALUE: <GreenCheck />,
      SUCCESS_RECEIPT_ID: <GreenCheck />,
      FAILURE: <RedTimes />,
      Pending: <GreyClock />,
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
        accessor: "emitted_by_contract_account_id",
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
        accessor: "explorer_link",
        Cell: ({ row, value }) => (
          <div className="flex items-center space-x-2">
            <div>
              {statusIcon[row.original.outcome.status] || ""}
            </div>
            <div className="w-16">
              {row.original.outcome.status === "SUCCESS_VALUE"
                ? "Succedded"
                : "Failed"}
            </div>
          </div>
        ),
      },
      {
        Header: () => <div className="text-right">Actions</div>,
        id: "action",
        Cell: ({ row }) => (
          <div className="flex justify-end">
            <a
              href={`https://explorer.near.org/transactions/${row.original.receipt.originated_from_transaction_hash}`}
              target="_blank"
              rel="noreferrer"
            >
              <i className="fas fa-link"></i>
            </a>
            <button
              className="ml-2"
              onClick={(e) =>
                onCopy(
                  e,
                  `https://explorer.near.org/transactions/${row.original.receipt.originated_from_transaction_hash}`,
                )
              }
            >
              <i className="fas fa-clipboard"></i>
            </button>
          </div>
        ),
      },
    ],
    [statusIcon],
  );
  const onCopy = (e, link) => {
    e.stopPropagation();
    navigator.clipboard.writeText(link);
    toast.dark("Explorer link copied to clipboard");
  };
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
  const onShare = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/nft-explorer/${token_id}:${contract_id}?wallet=${walletAddress}`,
    );
    toast.success("Copied link to clipboard");
  };
  return (
    <div>
      <div className="flex items-center">
        <div className="text-4xl font-medium">{metadata?.title}</div>
        <div className="ml-auto">
          <button
            className="bg-zinc-800 py-4 px-10 flex items-center font-bold space-x-4 rounded-md"
            onClick={onShare}
          >
            <ShareFromSquare />
            <div>Share</div>
          </button>
        </div>
      </div>
      <div className="flex space-x-14 mt-8">
        <div>
          <ReactImageFallback
            src={metadata?.media_url}
            alt={metadata?.title}
            fallbackImage={FallbackImg}
            className="rounded-xl w-80"
          />
          <div className="text-sm mt-4">
            {metadata?.royalty_perc && (
              <div>Royalty: {metadata?.royalty_perc}</div>
            )}
            {metadata.currentFloor && (
              <div>Current Floor: {metadata.currentFloor}</div>
            )}
            {metadata.rarity && (
              <div className="flex items-center space-x-4">
                <div>Rarity:</div> {metadata.rarity}
              </div>
            )}
          </div>
          <div className="mt-6 space-y-2.5">
            <button className="rounded-md text-sm bg-zinc-800 py-3 text-center w-full">
              Transfer NFT
            </button>
            <button className="rounded-md text-sm bg-zinc-800 py-3 text-center w-full">
              Burn NFT
            </button>
            <Popover className="relative">
              <Popover.Button
                ref={setReferenceElement}
                className="rounded-md text-sm bg-zinc-800 py-3 text-center w-full"
              >
                Other Functions
              </Popover.Button>

              <Popover.Panel
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
                className="absolute z-10 bg-white text-black rounded-xl"
              >
                <div
                  className={classes.arrow}
                  style={styles.arrow}
                  ref={setArrowElement}
                ></div>
                <div className="text-center px-10 py-8">
                  <div>Some Function Two</div>
                  <div>Some Function One</div>
                </div>

                <img src="/solutions.jpg" alt="" />
              </Popover.Panel>
            </Popover>
          </div>
        </div>
        <div className="flex-1">
          <div className="text-xl font-bold">NFT History</div>
          {!isNFTLoading && results.length ? (
            <div className="text-xs w-full overflow-x-auto">
              <ReactTable
                columns={columns}
                data={results}
                page={page}
                perPage={20}
                onClickPrevious={onClickPrevious}
                onClickNext={onClickNext}
              />
            </div>
          ) : !isNFTLoading ? (
            <div className="flex flex-col items-center justify-center space-y-4 h-48">
              <img alt="Not Found" src={NotFoundImg} className="w-8"></img>
              <div className="text-2xl">No Data Found</div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-48">
              <img src={Loader} alt="Loading" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleNFT;
