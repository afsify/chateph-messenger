import { useState, useRef, useEffect } from "react";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { userActions } from "../../utils/userSlice";
import { userPath } from "../../routes/routeConfig";
import imageLinks from "../../assets/images/imageLinks";
import ProfileModal from "./ProfileModal";
import PropTypes from "prop-types";

function ProfileMenu({ userData, logged }) {
  const menuRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);

  const toggleProfileModal = () => {
    setProfileModalVisible(!isProfileModalVisible);
  };

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [menuRef]);

  return (
    <div className="relative">
      <div
        className="cursor-pointer hover:scale-110 duration-300"
        onClick={() => setOpen(!open)}
      >
        <div className="overflow-hidden rounded-full w-11 h-11 mx-auto shadow-md shadow-black ">
          <img src={userData?.image || imageLinks.profile} alt="Profile" />
        </div>
      </div>
      {logged && userData && (
        <div
          className={`${
            open ? "block" : "hidden"
          } absolute top-0 right-0 mt-16 w-48 p-4 bg-light-gray z-30 text-gray-400 shadow-xl rounded-lg`}
          ref={menuRef}
        >
          <h3 className="text-center text-lg uppercase font-semibold text-gray-300 ">
            {userData.name}
            <br />
            <span className="text-sm font-normal normal-case font-sans text-gray-500">
              {userData.email}
            </span>
          </h3>
          <ul className="mt-4 space-y-2">
            <li
              onClick={toggleProfileModal}
              className="flex items-center cursor-pointer px-2 py-1 hover:bg-light-purple hover:text-dark-purple rounded-md space-x-2"
            >
              <UserOutlined />
              <span className="font-medium hover:text-dark-purple">
                Profile
              </span>
            </li>
            <ProfileModal
              visible={isProfileModalVisible}
              toggleModal={toggleProfileModal}
              userData={userData}
              setProfileModalVisible={setProfileModalVisible}
            />
            <li
              onClick={() => {
                localStorage.removeItem("userToken");
                localStorage.removeItem("userData");
                dispatch(userActions.userLogout());
                navigate(userPath.login);
                toast.success("Logout Success");
              }}
              className="flex items-center cursor-pointer px-2 py-1 hover:bg-light-red hover:text-red-500 rounded-md space-x-2"
            >
              <LogoutOutlined />
              <span className="font-medium hover:text-red-500">Logout</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

ProfileMenu.propTypes = {
  userData: PropTypes.node.isRequired,
  logged: PropTypes.node.isRequired,
};

export default ProfileMenu;
