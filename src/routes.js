import { lazy } from "react";

const Layout = lazy(() => import("./components/Layout/Layout"));
const WalletActivity = lazy(() => import("./pages/WalletActivity"));
const Flex = lazy(() => import("./pages/Flex"));
const SingleNFT = lazy(() => import("./pages/SingleNFT"));
const Fans = lazy(() => import("./pages/Fans"));

const routes = () => [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <WalletActivity /> },
      {
        path: "/flex",
        element: <Flex />,
        children: [{ path: "/flex/:id", element: <SingleNFT /> }],
      },
      { path: "/fans", element: <Fans /> },
    ],
  },
];

export default routes;
