import { connect } from "near-api-js";
import { useContext, useEffect, useMemo, useState } from "react";
import { ReactComponent as Search } from "../assets/img/search.svg";
import { ConnectContext } from "../ConnectProvider";
import { config, net } from "../contants";

const WalletActivity = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const { accountID, walletConnection, login } = useContext(ConnectContext);
  const near = useMemo(async () => await connect(config), []);
  // let pk =
  //   near.connection.signer.keyStore.localStorage[
  //     `near-api-js:keystore:${account_id}:${net}`
  //   ];
  useEffect(() => {
    console.log(accountID);
    console.log(walletConnection && walletConnection.isSignedIn());
    if (walletConnection && walletConnection.isSignedIn() && accountID) {
      setWalletAddress(accountID);
    }
  }, [accountID, walletConnection]);

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
    </div>
  );
};

export default WalletActivity;
