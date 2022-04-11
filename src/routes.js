import { lazy } from "react";

const Layout = lazy(() => import("./components/Layout/Layout"));
const WalletActivity = lazy(() => import("./pages/WalletActivity"));
const Flex = lazy(() => import("./pages/Flex"));
const SingleNFT = lazy(() => import("./pages/SingleNFT"));
const Fans = lazy(() => import("./pages/Fans"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Airdrop = lazy(() => import("./pages/Airdrop"));
const NearSuccess = lazy(() => import("./common/Success"));

const routes = () => [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <WalletActivity /> },
      {
        path: "/flex",
        children: [
          { index: true, element: <Flex /> },
          { path: "/flex/:id", element: <SingleNFT /> },
        ],
      },
      {
        path: "/airdrop",
        children: [{ index: true, element: <Airdrop /> }],
      },
      { path: "/fans", element: <Fans /> },
      { path: "/near/success", element: <NearSuccess /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export default routes;
