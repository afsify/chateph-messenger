import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import imageLinks from "../../assets/images/imageLinks";

function ProfileMenu({ userData, logged }) {
  const menuRef = useRef();
  const [open, setOpen] = useState(false);

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
          <div className="overflow-hidden rounded-full w-34 h-34 mx-auto shadow-md shadow-black ">
            <img src={userData?.image || imageLinks.profile} alt="Profile" />
          </div>
          <h3 className="text-center text-lg font-semibold text-gray-300 ">
            {userData.name}
            <span className="text-sm ml-5 text-gray-500 capitalize">
              {userData.place}
            </span>
          </h3>
          <span className="text-xs font-semibold text-center text-gray-700">
            Accounts vanish in 24 hours!
          </span>
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
