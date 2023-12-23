import Home from "../pages/user/Home";
import Start from "../pages/user/Start";
import { userPath } from "./routeConfig";
import { Routes, Route } from "react-router-dom";
import PublicRoute from "../components/auth/PublicRoute";
import PrivateRoute from "../components/auth/PrivateRoute";

function UserRoute() {
  return (
    <Routes>
      <Route element={<PublicRoute role={"user"} route={userPath.home} />}>
        <Route path={userPath.start} element={<Start />} />
      </Route>
      <Route element={<PrivateRoute role={"user"} route={userPath.home} />}>
        <Route path={userPath.home} element={<Home />} />
      </Route>
    </Routes>
  );
}

export default UserRoute;
