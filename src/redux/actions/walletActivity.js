import * as types from "../../constants/actions/walletActivity";

export const setWalletAddressAction = (payload = "") => ({
  type: types.SET_WALLET_ADDRESS,
  payload,
});

export const setWalletAddressErrAction = (payload) => ({
  type: types.SET_WALLET_ADDRESS_ERR,
  payload,
});

export const setFetchedOnceAction = (payload) => ({
  type: types.SET_FETCHED_ONCE,
  payload,
});
