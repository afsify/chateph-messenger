import { adminPath } from "./routeConfig";
import Signin from "../pages/admin/Signin";
import { Routes, Route } from "react-router-dom";
import UserManage from "../pages/admin/UserManage";
import PublicRoute from "../components/auth/PublicRoute";
import PrivateRoute from "../components/auth/PrivateRoute";

function AdminRoute() {
  return (
    <Routes>
      <Route element={<PublicRoute role={"admin"} route={`/admin/${adminPath.userManage}`} />}>
        <Route path={adminPath.signin} element={<Signin />} />
      </Route>
      <Route element={<PrivateRoute role={"admin"} route={`/admin/${adminPath.signin}`} />}>
        <Route path={adminPath.userManage} element={<UserManage />} />
      </Route>
    </Routes>
  );
}

export default AdminRoute;
