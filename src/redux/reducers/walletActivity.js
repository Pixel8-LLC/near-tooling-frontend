import * as types from "../../constants/actions/walletActivity";

const initialState = {
  walletAddress: "",
  walletAddressErr: null,
  fetchedOnce: false,
  loading: false,
};

export default function walletActivityReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_WALLET_ADDRESS:
      return {
        ...state,
        walletAddress: action.payload,
        loading: false,
      };
    case types.SET_WALLET_ADDRESS_ERR:
      return {
        ...state,
        walletAddressErr: action.payload,
        loading: false,
      };
    case types.SET_FETCHED_ONCE:
      return {
        ...state,
        fetchedOnce: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
