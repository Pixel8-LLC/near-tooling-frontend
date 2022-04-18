import ntAxios from "./lib/ntAxios";

export function getNftEvents(params) {
  return ntAxios(`/nft-events`, {
    params,
  }).then((result) => result.data);
}
