import { BrowserRouter, Routes, Route } from "react-router-dom";
import Toaster from "./components/constant/Toaster";
import Spinner from "./components/constant/Spinner";
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";
import { ConfigProvider, theme } from "antd";

function App() {
  return (
    <BrowserRouter>
      <Spinner />
      <Toaster />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#081A51",
          },
          algorithm: theme.darkAlgorithm,
        }}
      >
        <Routes>
          <Route path={"/*"} element={<UserRoute />} />
          <Route path={"/admin/*"} element={<AdminRoute />} />
        </Routes>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
