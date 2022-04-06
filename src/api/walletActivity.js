import ntAxios from "./lib/ntAxios";

export function getWalletActivity({ account_id, page = 1, perPage = 20 }) {
  return ntAxios(`/activity`, {
    params: {
      account_id,
      page,
      perPage,
    },
  }).then((result) => result.data);
}
