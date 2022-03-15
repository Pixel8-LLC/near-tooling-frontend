import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Loading from "./components/Loading";
import routes from "./routes";

function App() {
  const element = useRoutes(routes());

  return <Suspense fallback={<Loading />}>{element}</Suspense>;
}

export default App;
