import ntAxios from "./lib/ntAxios";

export function getWalletActivity(params) {
  return ntAxios(`/activity`, {
    params,
  }).then((result) => result.data);
}
