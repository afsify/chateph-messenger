import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/auth/PrivateRoute";
import PublicRoute from "../components/auth/PublicRoute";
import Register from "../pages/user/Register";
import RegisterOTP from "../pages/user/RegisterOTP";
import Login from "../pages/user/Login";
import ForgotPassword from "../pages/user/ForgotPassword";
import ResetOTP from "../pages/user/ResetOTP";
import ResetPassword from "../pages/user/ResetPassword";
import Home from "../pages/user/Home";
import { userPath } from "./routeConfig";

function UserRoute() {
  return (
    <Routes>
      <Route element={<PublicRoute role={"user"} route={userPath.home} />}>
        <Route path={userPath.register} element={<Register />} />
        <Route path={userPath.registerOTP} element={<RegisterOTP />} />
        <Route path={userPath.login} element={<Login />} />
        <Route path={userPath.forgotPassword} element={<ForgotPassword />} />
        <Route path={userPath.resetOTP} element={<ResetOTP />} />
        <Route path={userPath.resetPassword} element={<ResetPassword />} />
      </Route>
      <Route element={<PrivateRoute role={"user"} route={userPath.home} />}>
        <Route path={userPath.home} element={<Home />} />
      </Route>
    </Routes>
  );
}

export default UserRoute;
