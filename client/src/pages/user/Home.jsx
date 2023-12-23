import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import Name from "../../components/user/Name";
import { FilterOutlined } from "@ant-design/icons";
import ChatList from "../../components/user/ChatList";
import ChatWindow from "../../components/user/ChatWindow";
import UserLayout from "../../components/layout/UserLayout";
import ProfileMenu from "../../components/user/ProfileMenu";
import DefaultWindow from "../../components/user/DefaultWindow";
import { List, AutoComplete, Skeleton, Dropdown, Menu } from "antd";
import {
  findUser,
  fetchChat,
  accessChat,
} from "../../api/services/userService";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skeleton, setSkeleton] = useState(false);
  const filterOptions = ["all", "male", "female"];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChat, setSelectedChat] = useState();
  const [notification, setNotification] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [isAccountModalVisible, setAccountModalVisible] = useState(false);
  const logged = localStorage.getItem("userToken") !== null;
  const encodedUserData = localStorage.getItem("userData");
  const userData = encodedUserData ? JSON.parse(atob(encodedUserData)) : null;

  const toggleAccountModal = () => {
    setAccountModalVisible(!isAccountModalVisible);
  };

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const response = await findUser(searchTerm);
        const filteredUsers = response.data.data.filter((user) => {
          if (filter === "all") {
            return true;
          } else {
            return user.gender === filter;
          }
        });
        setUsers(filteredUsers);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (searchTerm) {
      fetchUsers();
    } else {
      setUsers([]);
    }
  }, [searchTerm, filter]);

  const handleAccessChat = async (userId) => {
    const existingChatIds = new Set(chatData.map((chat) => chat._id));
    try {
      const values = {
        userId,
      };
      setLoading(true);
      const response = await accessChat(values);
      if (!existingChatIds.has(response.data._id)) {
        setChatData([...chatData, response.data]);
        setSelectedChat(response.data);
      } else {
        setSelectedChat(response.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        setSkeleton(true);
        const response = await fetchChat();
        setChatData(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      } finally {
        setSkeleton(false);
      }
    };
    fetchChatData();
  }, []);

  const autoCompleteOptions = users.map((user) => ({
    value: user.name,
    label: (
      <List.Item>
        {loading ? (
          <Skeleton avatar active />
        ) : (
          <List.Item.Meta
            className="flex items-center gap-x-2"
            onClick={() => handleAccessChat(user._id)}
            avatar={
              <div className="overflow-hidden rounded-full w-11 h-11 mx-auto shadow-md shadow-black ">
                <img src={user.image} alt="Profile" />
              </div>
            }
            title={
              <div className="flex-col items-center">
                <h1 className="text-[13px] font-semibold">
                  {user.name}
                </h1>
                <h1 className="text-xs text-gray-500 font-sans">
                  {user.place}
                </h1>
              </div>
            }
          />
        )}
      </List.Item>
    ),
  }));

  const handleFilterClick = () => {
    setFilterVisible(!filterVisible);
  };

  const handleFilterSelect = (value) => {
    setFilter(value);
    setFilterVisible(false);
  };

  const filterMenu = (
    <Menu onClick={(e) => handleFilterSelect(e.key)}>
      {filterOptions.map((option) => (
        <Menu.Item className="text-center capitalize" key={option}>
          {option}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <UserLayout>
      <aside
        className={`${
          selectedChat && "hidden md:flex"
        } flex w-full md:w-80 h-screen relative`}
      >
        <div className="bg-light-dark w-full md:w-80 pt-6 px-1 relative duration-300 overflow-y-scroll scrollable-container">
          <Name>
            <AutoComplete
              className="w-full h-10 relative"
              placeholder="Search User"
              value={searchTerm}
              onChange={(value) => setSearchTerm(value)}
              options={autoCompleteOptions}
              style={{ maxWidth: "100%" }}
              allowClear
            />
            <Dropdown
              className="absolute right-24 "
              overlay={filterMenu}
              trigger={["click"]}
              visible={filterVisible}
              onVisibleChange={(visible) => setFilterVisible(visible)}
              placement="bottom"
            >
              <FilterOutlined
                className="hover:text-gray-500 text-lg text-light-gray"
                onClick={handleFilterClick}
              />
            </Dropdown>
            <ProfileMenu userData={userData} logged={logged} />
          </Name>
          <ChatList
            chatData={chatData}
            userData={userData}
            skeleton={skeleton}
            selectedChat={selectedChat}
            notification={notification}
            setSelectedChat={setSelectedChat}
            setNotification={setNotification}
          />
        </div>
      </aside>
      <main className={`${!selectedChat && "hidden md:block"} w-full`}>
        {selectedChat ? (
          <ChatWindow
            skeleton={skeleton}
            userData={userData}
            selectedChat={selectedChat}
            notification={notification}
            setSelectedChat={setSelectedChat}
            setNotification={setNotification}
            toggleAccountModal={toggleAccountModal}
            isAccountModalVisible={isAccountModalVisible}
          />
        ) : (
          <DefaultWindow skeleton={skeleton} />
        )}
      </main>
    </UserLayout>
  );
};

export default Home;
