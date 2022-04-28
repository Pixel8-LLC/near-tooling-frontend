import * as types from "../../constants/actions/fans";

const initialState = {
  contractAddress: "",
  contractAddressErr: null,
  loading: false,
};

export default function fansReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_CONTRACT_ADDRESS:
      return {
        ...state,
        contractAddress: action.payload,
        loading: false,
      };
    case types.SET_CONTRACT_ADDRESS_ERR:
      return {
        ...state,
        contractAddressErr: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
