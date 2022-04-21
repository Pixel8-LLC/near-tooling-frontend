import * as types from "../../constants/actions/topBar";

/* eslint-disable no-case-declarations */

const initialState = {
  showConnectWallet: true,
  loading: false,
};

export default function topBarReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_SHOW_CONNECT_WALLET:
      return {
        ...state,
        showConnectWallet: action.payload,
        loading: true,
      };
    default:
      return state;
  }
}
