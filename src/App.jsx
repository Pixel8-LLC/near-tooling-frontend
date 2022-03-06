import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import history from "./@history";
import Loading from "./components/Loading";

const WalletActivity = lazy(() => import("./pages/WalletActivity"));
const Flex = lazy(() => import("./pages/Flex"));
function App() {
  return (
    <Router history={history}>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <WalletActivity />
              </Layout>
            }
          />
          <Route
            path="/flex"
            element={
              <Layout>
                <Flex />
              </Layout>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
