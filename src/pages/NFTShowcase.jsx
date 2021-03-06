import { useEffect, useContext, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import Masonry from "react-masonry-css";
import { useDispatch, useSelector } from "react-redux";
import ReactImageFallback from "react-image-fallback";

import { ReactComponent as Search } from "../assets/img/search.svg";
import { ReactComponent as ShareFromSquare } from "../assets/img/share-from-square.svg";
import { getUserNfts } from "../api/UserNft";
import { ConnectContext } from "../ConnectProvider";
import {
  setFetchedOnceAction,
  setWalletAddressAction,
  setWalletAddressErrAction,
} from "../redux/actions/walletActivity";
import { setShowConnectWallet } from "../redux/actions/topBar";
import Loader from "../assets/img/loading/loadicon2.gif";
import { toast } from "react-toastify";
import hi from "date-fns/esm/locale/hi/index.js";
import NotFoundImg from "../assets/img/NotFound.svg";
import FallbackImg from "../assets/img/fallback/Fallback_7.jpg";
import SearchIcon from "../common/SearchIcon";

const NFTShowcase = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { accountID, walletConnection, login } = useContext(ConnectContext);
  const walletAddress = useSelector(
    (state) => state.walletActivity.walletAddress,
  );
  const walletAddressErr = useSelector(
    (state) => state.walletActivity.walletAddressErr,
  );
  const showConnectWallet = useSelector(
    (state) => state.topBar.showConnectWallet,
  );
  const fetchedOnce = useSelector((state) => state.walletActivity.fetchedOnce);

  const {
    data: { results = [], success } = {},
    isLoading,
    isError,
    mutate,
  } = useMutation(["userNfts", walletAddress], (getUserNftsParams) =>
    getUserNfts(getUserNftsParams),
  );

  useEffect(() => {
    if (location.search) {
      let wallet = location.search.split("=")[1];
      setWalletAddress(wallet);
      mutate({ account_id: wallet });
      setFetchedOnce(true);
    }
  }, [location]);

  useEffect(() => {
    if (accountID) {
      let wallet = location.search
        ? location.search.split("=")[1]
        : walletAddress;
      mutate({ account_id: wallet ? wallet : accountID });
      setWalletAddress(wallet ? wallet : accountID);
      setFetchedOnce(true);
    }
  }, [accountID]);

  const fetchNFT = async () => {
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
      mutate({ account_id: walletAddress ? walletAddress : accountID });
      setFetchedOnce(true);
    }
  };
  const onSearch = async (e) => {
    e.preventDefault();
    await fetchNFT();
  };
  const breakpointColumnsObj = {
    default: 4,
    1300: 3,
    1060: 2,
    805: 1,
  };
  const setWalletAddress = useCallback(
    (payload) => {
      dispatch(setWalletAddressAction(payload));
    },
    [dispatch],
  );
  const setWalletAddressErr = (payload) =>
    dispatch(setWalletAddressErrAction(payload));
  const setFetchedOnce = useCallback(
    (payload) => dispatch(setFetchedOnceAction(payload)),
    [dispatch],
  );

  const setSearchBarWithAccountID = () => {
    setWalletAddress(accountID);
    setWalletAddressErr(null);
    mutate({ account_id: accountID });
  };

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

  const onShare = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(
      `${window.location.origin}/nft-explorer?wallet=${walletAddress}`,
    );
    toast.success("Copied link to clipboard");
  };

  useEffect(() => {
    fetchNFT();
  }, []);

  useEffect(() => {
    if (
      !(walletAddressErr && walletAddressErr.code !== 2) &&
      walletAddress &&
      accountID &&
      walletAddress !== accountID
    ) {
      setWalletAddressErr({
        code: 2,
        message: "Use Connected Wallet",
      });
    } else if (!walletAddress) {
      setWalletAddressErr(null);
    }
  }, [walletAddress]);
  return (
    <div>
      <div>
        <div className="flex flex-col lg:flex-row items-start lg:items-center lg:space-x-6 text-lg mt-6">
          <div className="text-lg rounded-lg w-96 max-w-full border flex items-center">
            <form
              id="search"
              className="text-lg rounded-lg w-96 max-w-full border flex items-center"
              onSubmit={onSearch}
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
                  className="text-base font-medium bg-white text-black rounded-lg px-4 py-3"
                  onClick={() => login()}
                >
                  Connect Wallet
                </button>
              </>
            )}
        </div>
        <div className="text-xs mt-3">
          {walletAddressErr ? (
            walletAddressErr.code === 2 ? (
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
      <div className="flex items-center mt-9">
        <div className="flex space-x-14 flex-1">
          {/* 
          // NOTE: Just commenting out for now until we get the data in place
          <div>
            <div className="text-2xl">5</div>
            <div>Artworks collected</div>
          </div>
          <div>
            <div className="text-2xl">13</div>
            <div>Unique Artists</div>
          </div>
          <div>
            <div className="text-2xl">13 NEAR</div>
            <div>Wallet Value </div>
            <div className="text-neutral-500">Based on floor price</div>
          </div> */}
        </div>
        {results.length ? (
          <div className="ml-auto">
            <button
              className="bg-zinc-800 py-4 px-10 flex items-center font-bold space-x-4 rounded-md"
              onClick={onShare}
            >
              <ShareFromSquare />
              <div>Share</div>
            </button>
          </div>
        ) : null}
      </div>

      <div className="mt-8">
        {walletAddressErr && walletAddressErr.code === 1 ? (
          <div className="flex flex-col items-center justify-center -ml-44 space-y-4">
            <img alt="Not Found" src={NotFoundImg} className="w-16"></img>
            <div className="text-4xl">No Wallet Found</div>
            <div className="text-lg">
              Oops! Please enter a different wallet.
            </div>
          </div>
        ) : !fetchedOnce ? null : isLoading ? (
          <div className="flex justify-center items-center -ml-44 h-96">
            <img src={Loader} alt="Loading" />
          </div>
        ) : isError ? (
          "Error"
        ) : !(results && results.length) ? (
          <div className="flex flex-col items-center justify-center space-y-4 h-48">
            <SearchIcon />
            <div className="text-2xl">No Data Found</div>
          </div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="nft-masonry-grid"
            columnClassName="nft-masonry-grid_column"
          >
            {results.map((artwork) => (
              <div
                key={artwork.token_id}
                className="cursor-pointer"
                onClick={() =>
                  navigate(
                    `/nft-explorer/${artwork.token_id}:${artwork.contract_name}?wallet=${walletAddress}`,
                  )
                }
              >
                <div className="text-black rounded-t-xl flex flex-col">
                  <ReactImageFallback
                    src={artwork.media_url}
                    alt={artwork.title}
                    fallbackImage={FallbackImg}
                    className="rounded-t-xl"
                  />
                  <div className="bg-white rounded-b-xl flex flex-col flex-1">
                    <div className="bg-slate-50 py-3 px-4 flex-1">
                      <p className="font-bold text-lg">{artwork.title}</p>
                      {/* <div className="text-sm mt-1">
                        <div>Royalty: {artwork.royalty_perc}</div>
                        <div>
                          Current Floor: {artwork.currentFloor}
                        </div>
                        <div className="flex items-center space-x-4">
                          <div>Rarity:</div> {artwork.rarity}
                        </div>
                      </div> */}
                    </div>
                    <Link
                      to={`/nft-explorer/${artwork.token_id}:${artwork.contract_name}?wallet=${walletAddress}`}
                      className="flex items-center justify-center py-1 text-neutral-400"
                    >
                      More Info
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Masonry>
        )}
      </div>
      <div className="my-10"></div>
    </div>
  );
};

export default NFTShowcase;
