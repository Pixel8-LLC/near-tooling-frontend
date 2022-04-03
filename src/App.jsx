import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Loading from "./components/Loading";
import ConnectProvider from "./ConnectProvider";
import routes from "./routes";

function App() {
  const element = useRoutes(routes());

  return (
    <ConnectProvider>
      <Suspense fallback={<Loading />}>{element}</Suspense>
    </ConnectProvider>
  );
}

export default App;
