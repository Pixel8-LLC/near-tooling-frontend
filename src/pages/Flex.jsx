import { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
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

const Flex = () => {
  const dispatch = useDispatch();
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

  const {
    data: { results = [], success } = {},
    isLoading,
    isError,
    mutate,
  } = useMutation(["userNfts", walletAddress], (getUserNftsParams) =>
    getUserNfts(getUserNftsParams),
  );
  useEffect(() => {
    mutate({ account_id: walletAddress ? walletAddress : accountID });
  }, [accountID, mutate, walletAddress]);
  const fetchNFT = async () => {
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
    mutate({ account_id: walletAddress ? walletAddress : accountID });
    setFetchedOnce(true);
  };
  const onSearch = async (e) => {
    e.preventDefault();
    await fetchNFT();
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

  const setSearchBarWithAccountID = useCallback(() => {
    if (walletConnection && walletConnection.isSignedIn() && accountID) {
      if (!walletAddress) {
        setWalletAddress(accountID);
      }
    }
  }, [accountID, setWalletAddress, walletAddress, walletConnection]);

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

  return (
    <div>
      <div className="text-6xl font-medium w-full pb-3">Flex</div>
      <div className="">
        <div className="flex items-center space-x-6 text-lg mt-6">
          <div className="text-lg rounded-lg w-96 border flex items-center ">
            <form
              id="search"
              className="text-lg rounded-lg w-96 border flex items-center"
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
          {!(walletConnection && walletConnection.isSignedIn()) && (
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
      <div className="flex items-center mt-9">
        <div className="flex space-x-14 flex-1">
          <div className="">
            <div className="text-2xl">5</div>
            <div className="">Artworks collected</div>
          </div>
          <div className="">
            <div className="text-2xl">13</div>
            <div className="">Unique Artists</div>
          </div>
          <div className="">
            <div className="text-2xl">13 NEAR</div>
            <div className="">Wallet Value </div>
            <div className="text-neutral-500">Based on floor price</div>
          </div>
        </div>
        <div className="ml-auto">
          <button className="bg-zinc-800 py-4 px-10 flex items-center font-bold space-x-4 rounded-md">
            <ShareFromSquare />
            <div className="">Share</div>
          </button>
        </div>
      </div>

      <div className="mt-8">
        {isLoading ? (
          "Loading ..."
        ) : isError || !success ? (
          "Error"
        ) : !(results && results.length) ? (
          "No Data"
        ) : (
          <div className="grid grid-cols-4 gap-7">
            {results.map((artwork) => (
              <div key={artwork.token_id} className="">
                <div className="text-black rounded-xl flex flex-col">
                  <img
                    src={artwork.media_url}
                    alt={artwork.title}
                    className=""
                  />
                  <div className="bg-white rounded-b-xl flex flex-col flex-1">
                    <div className="bg-slate-50 py-3 px-4 flex-1">
                      <p className="font-bold text-lg">{artwork.title}</p>
                      <div className="text-sm mt-1">
                        <div className="">Royalty: {artwork.royalty_perc}</div>
                        <div className="">
                          Current Floor: {artwork.currentFloor}
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="">Rarity:</div> {artwork.rarity}
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`/flex/${artwork.token_id}:${artwork.contract_name}`}
                      className="flex items-center justify-center py-1 text-neutral-400"
                    >
                      More Info
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="my-10"></div>
    </div>
  );
};

export default Flex;
