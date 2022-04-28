import * as types from "../../constants/actions/fans";

export const setContractAddressAction = (payload = "") => ({
  type: types.SET_CONTRACT_ADDRESS,
  payload,
});

export const setContractAddressErrAction = (payload) => ({
  type: types.SET_CONTRACT_ADDRESS_ERR,
  payload,
});
