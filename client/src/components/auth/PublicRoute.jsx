import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAdmin } from "../../api/services/adminService";
import { getUser } from "../../api/services/userService";
import { showLoading, hideLoading } from "../../utils/alertSlice";
import PropTypes from "prop-types";

function PublicRoute({ role, route }) {
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
          setAuth(response.data.auth);
        }
      } catch (error) {
        setAuth(false);
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

  return auth ? <Navigate to={route} /> : <Outlet />;
}

PublicRoute.propTypes = {
  role: PropTypes.node.isRequired,
  route: PropTypes.node.isRequired,
};

export default PublicRoute;
