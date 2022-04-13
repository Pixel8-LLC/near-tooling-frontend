import ntAxios from "./lib/ntAxios";

export function getWalletActivity({ account_id, page = 0, perPage = 20 }) {
  return ntAxios(`/activity`, {
    params: {
      account_id,
      page,
      perPage,
    },
  }).then((result) => result.data);
}
