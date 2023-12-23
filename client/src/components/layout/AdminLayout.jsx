import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { adminPath } from "../../routes/routeConfig";
import { adminActions } from "../../utils/adminSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MenuOutlined,
  TeamOutlined,
  CloseOutlined,
  LeftCircleFilled,
  PoweroffOutlined,
} from "@ant-design/icons";

function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [nav, setNav] = useState(false);
  const [open, setOpen] = useState(true);

  const adminMenu = [
    {
      id: 1,
      title: "Users",
      icon: <TeamOutlined />,
      path: `/admin/${adminPath.userManage}`,
    },
  ];

  return (
    <div className="container mx-auto flex">
      <aside className="h-screen px-2 hidden md:flex">
        <div
          className={` ${
            open ? "w-72" : "w-20 "
          } bg-light-dark my-2 rounded-xl p-5 pt-8 relative duration-300`}
        >
          <LeftCircleFilled
            style={{ fontSize: "35px", color: "#151415" }}
            className={`absolute bg-white hover:scale-105 transition-transform cursor-pointer -right-4 top-12
           border-2 rounded-full ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex items-center">
            <h1
              className={`text-white text-4xl font-signature duration-500 ${
                !open && "rotate-[360deg] scale-0"
              }`}
            >
              ChatHub
            </h1>
          </div>
          <ul className="pt-2">
            {adminMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <li
                  key={menu.id}
                  className={`${
                    !open && "flex justify-center mt-4"
                  } flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-lg items-center gap-x-4
                  ${menu.gap ? "mt-9" : "mt-2"} ${
                    isActive && " bg-light-white font-semibold"
                  } `}
                  onClick={() => navigate(menu.path)}
                >
                  {menu.icon}
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {menu.title}
                  </span>
                </li>
              );
            })}
            <li
              onClick={() => {
                localStorage.removeItem("adminToken");
                dispatch(adminActions.adminLogout());
                navigate(`/admin/${adminPath.signin}`);
              }}
              className={`${
                !open && "flex justify-center mt-4"
              } flex rounded-md p-2 mt-2 cursor-pointer hover:bg-light-red text-gray-300 text-lg items-center gap-x-4 `}
            >
              <PoweroffOutlined />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Logout
              </span>
            </li>
          </ul>
        </div>
      </aside>
      <main className="w-full p-2 overflow-y-scroll h-screen scrollable-container">
        {children}
      </main>
      {nav && (
        <div className="flex top-0 bottom-0 left-0 w-full p-3 fixed z-40">
          <ul className="flex flex-col justify-center items-center rounded-xl w-full shadow-black shadow-md bg-dark-purple ">
            {adminMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <li
                  key={menu.id}
                  className="px-2 py-2 cursor-pointer text-white text-3xl"
                >
                  <Link
                    className={`${
                      isActive && "bg-light-white px-4 rounded-xl font-semibold"
                    }`}
                    onClick={() => setNav(!nav)}
                    to={menu.path}
                  >
                    {menu.title}
                  </Link>
                </li>
              );
            })}
            <li className="px-2 py-2 text-white cursor-pointer text-3xl">
              <div
                onClick={() => {
                  localStorage.removeItem("adminToken");
                  dispatch(adminActions.adminLogout());
                  navigate(`/admin/${adminPath.signin}`);
                }}
              >
                <span>Logout</span>
              </div>
            </li>
          </ul>
        </div>
      )}
      <div className="py-4 px-4 box-border w-full flex justify-center bottom-0 left-0 fixed z-50 md:hidden">
        <div className="w-[99%] bg-dark-purple py-4 flex justify-around items-center px-4 shadow-black shadow-md rounded-2xl">
          <div className="flex justify-around w-full container items-center">
            <div
              onClick={() => navigate(`/admin/${adminPath.userManage}`)}
              className="flex items-center text-white hover:bg-light-white transition duration-300 cursor-pointer rounded-xl px-2 text-2xl"
            >
              <TeamOutlined />
            </div>
            {nav ? (
              <div
                onClick={() => setNav(!nav)}
                className="flex items-center text-white hover:bg-light-white transition duration-300 cursor-pointer rounded-xl px-2 text-2xl"
              >
                <CloseOutlined />
              </div>
            ) : (
              <div
                onClick={() => setNav(!nav)}
                className="flex items-center text-white hover:bg-light-white transition duration-300 cursor-pointer rounded-xl px-2 text-2xl"
              >
                <MenuOutlined />
              </div>
            )}
            <div
              onClick={() => {
                localStorage.removeItem("adminToken");
                dispatch(adminActions.adminLogout());
                navigate(`/admin/${adminPath.signin}`);
              }}
              className="flex items-center text-white hover:bg-light-white transition duration-300 cursor-pointer rounded-xl px-2 text-2xl"
            >
              <PoweroffOutlined />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
