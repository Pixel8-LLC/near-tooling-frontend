import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Search } from "../assets/img/search.svg";
import { ReactComponent as ShareFromSquare } from "../assets/img/share-from-square.svg";
import artworks from "../constants/artWorks";
import { getUserNfts } from "../api/UserNft";
import { ConnectContext } from "../ConnectProvider";

const Flex = () => {
  const dispatch = useDispatch();
  const { accountID, walletConnection, login } = useContext(ConnectContext);
  const [walletAddress, setWalletAddress] = useState("");
  const [page, setPage] = useState(1);
  const {
    data: { results = [], success } = {},
    isLoading,
    isError,
    mutate,
  } = useMutation(["userNfts", page, walletAddress], (getUserNftsParams) =>
    getUserNfts(getUserNftsParams),
  );
  useEffect(() => {
    mutate({ account_id: walletAddress ? walletAddress : accountID });
  }, []);
  console.log(walletAddress);
  const onSearch = () => {
    mutate({ account_id: walletAddress ? walletAddress : accountID });
  };
  return (
    <div>
      <div className="text-6xl font-medium w-full pb-3">Flex</div>
      <div className="">
        <div className="flex items-center space-x-6 text-lg mt-6">
          <div className="text-lg rounded-lg w-96 border flex items-center ">
            <input
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="bg-black flex-1 rounded-l-lg py-2.5 px-5 border-r"
              placeholder="Enter Wallet (example.near)"
            />
            <button className="py-2.5 px-4" onClick={onSearch}>
              <Search />
            </button>
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

      <div className="grid grid-cols-4 gap-7 mt-8">
        {results.map((artwork) => (
          <div
            key={artwork.token_id}
            className="text-black rounded-xl flex flex-col"
          >
            <img src={artwork.media_url} alt={artwork.title} className="" />
            <div className="bg-white rounded-b-xl flex flex-col flex-1">
              <div className="bg-slate-50 py-3 px-4 flex-1">
                <p className="font-bold text-lg">{artwork.title}</p>
                <div className="text-sm mt-1">
                  <div className="">Royalty: {artwork.royalty_perc}</div>
                  <div className="">Current Floor: {artwork.currentFloor}</div>
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
        ))}
      </div>
      <div className="my-10"></div>
    </div>
  );
};

export default Flex;
