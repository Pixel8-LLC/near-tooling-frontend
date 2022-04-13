import ntAxios from "./lib/ntAxios";

export function getUserNfts({ account_id, page = 0, perPage = 20 }) {
  return ntAxios(`/near/nfts`, {
    params: {
      account_id,
      page,
      perPage,
    },
  }).then((result) => result.data);
}
export function getUserNftByTokenId({ contract_id, token_id, account_id }) {
  return ntAxios(`/near/nfts/single`, {
    params: {
      contract_id,
      token_id,
      account_id,
    },
  }).then((result) => result.data);
}
