import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAdmin } from "../../api/services/adminService";
import { getUser } from "../../api/services/userService";
import { userActions } from "../../utils/userSlice";
import { showLoading, hideLoading } from "../../utils/alertSlice";
import PropTypes from "prop-types";
import { userPath } from "../../routes/routeConfig";

function PrivateRoute({ role }) {
  const [auth, setAuth] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (role === "admin") {
          const response = await getAdmin();
          setAuth(response.data.auth);
        } else if (role === "user") {
          const response = await getUser();
          if (response.data.auth) {
            dispatch(userActions.userLogin());
          } else {
            dispatch(userActions.userLogout());
          }
          setAuth(response.data.auth);
        }
      } catch (error) {
        setAuth(false);
        dispatch(hideLoading());
      } finally {
        dispatch(hideLoading());
      }
    };
    fetchData();
  }, [role, dispatch]);

  if (auth === null) {
    dispatch(showLoading());
    return null;
  }

  return auth ? <Outlet /> : <Navigate to={userPath.login} />;
}

PrivateRoute.propTypes = {
  role: PropTypes.node.isRequired,
};

export default PrivateRoute;
