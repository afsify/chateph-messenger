import { useEffect } from "react";
import { getUser } from "../../api/services/userService";
import PropTypes from "prop-types";

const UserLayout = ({ children }) => {
  const logged = localStorage.getItem("userToken") !== null;

  useEffect(() => {
    if (logged) {
      const fetchUserData = async () => {
        try {
          const userResponse = await getUser();
          const encodedUserData = btoa(
            JSON.stringify(userResponse.data.userData)
          );
          localStorage.setItem("userData", encodedUserData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [logged]);

  return <div className="container mx-auto flex">{children}</div>;
};

UserLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserLayout;
