import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./utils/store";
import App from "./App.jsx";
import "./index.css";
import "antd/dist/antd";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID}>
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
);
