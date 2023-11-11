import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FloatButton } from "antd";
import { Router } from "react-chrome-extension-router";
import "../popup/assets/css/style.css";
import LayoutApp from "./components/LayoutApp";
import ReverseShell from "./components/system/linux/ReverseShell";

const queryClient = new QueryClient();

const Home = () => {
  return (
    <>
      <ReverseShell />
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LayoutApp>
        <Router>
          <Home />
        </Router>
        <FloatButton.BackTop />
      </LayoutApp>
    </QueryClientProvider>
  );
};

export default App;
