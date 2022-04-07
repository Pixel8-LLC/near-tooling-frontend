import { keyStores } from "near-api-js";

export const API_ENDPOINT_URL = "https://near-tool-api.herokuapp.com/";

export const net =
  process.env.REACT_APP_CONTEXT === "production" ? "mainnet" : "testnet";

export const config = {
  networkId: net,
  keyStore: new keyStores.BrowserLocalStorageKeyStore(), // optional if not signing transactions
  nodeUrl: `https://rpc.${net}.near.org`,
  walletUrl: `https://wallet.${net}.near.org`,
  helperUrl: `https://helper.${net}.near.org`,
  explorerUrl: `https://explorer.${net}.near.org`,
  appKeyPrefix: "nt_app",
};
