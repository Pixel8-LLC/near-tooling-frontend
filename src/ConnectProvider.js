import { createContext, useEffect, useState } from "react";
import { connect, Contract, utils, WalletConnection } from "near-api-js";
import { CONTRACT_NAME, testnetConfig } from "./contract/config";

export const ConnectContext = createContext({
  accountID: "",
  walletConnection: null,
  contract: null,
  login: () => {},
  logout: () => {},
  utils,
});

const ConnectProvider = ({ children }) => {
  const [accountID, setAccountID] = useState("");
  const [walletConnection, setWalletConnection] = useState(null);
  const [contract, setContract] = useState(null);

  const connectNearWallet = async () => {
    const _near = await connect(testnetConfig);
    console.log(_near);
    const _walletConnection = new WalletConnection(_near, "ds_app");
    const _accountId = _walletConnection.getAccountId();

    const _contract = await new Contract(
      _walletConnection.account(),
      CONTRACT_NAME,
      {
        viewMethods: ["get_random_token_by_collection", "get_collections"], // view methods do not change state but usually return a value
        changeMethods: ["add_collection", "add_nfts_to_collection", "nft_mint"], // change methods modify state
      },
    );
    setWalletConnection(_walletConnection);
    console.log(_accountId);
    setAccountID(_accountId);
    setContract(_contract.account);
    console.log(await _walletConnection.account());
  };

  const login = () => {
    walletConnection.requestSignIn(
      "testnet",
      "ExampleApp",
      `${window.location.origin}/near/success`,
      `${window.location.origin}/near/failed`,
    );
    console.log("haha", walletConnection);
  };

  const logout = () => {
    walletConnection.signOut();
    localStorage.removeItem("ds_token");
    window.location.reload(window.location.origin);
  };

  useEffect(() => {
    (async () => {
      await connectNearWallet();
    })();
  }, []);

  return (
    <ConnectContext.Provider
      value={{
        accountID,
        walletConnection,
        contract,
        login,
        logout,
        utils,
      }}
    >
      {children}
    </ConnectContext.Provider>
  );
};

export default ConnectProvider;
