import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRoutes } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loading from "./components/Loading";
import ConnectProvider from "./ConnectProvider";
import routes from "./routes";

function App() {
  const element = useRoutes(routes());
  const queryClient = new QueryClient();

  return (
    <ConnectProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>{element}</Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer />
      </QueryClientProvider>
    </ConnectProvider>
  );
}

export default App;
