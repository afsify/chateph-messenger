import { Skeleton, Menu, Dropdown } from "antd";
import imageLinks from "../../assets/images/imageLinks";
import { MoreOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

function ChatList({
  chatData,
  userData,
  skeleton,
  selectedChat,
  // notification,
  setSelectedChat,
  // setNotification,
  editGroupHandler,
}) {
  return (
    <div className="mt-5">
      <ul className="space-y-4">
        {chatData.map((chat) => {
          const receiver = chat.users.filter(
            (user) => user._id !== userData._id
          );
          const chatMenu = (
            <Menu>
              <Menu.Item key="1">Clear Chat</Menu.Item>
            </Menu>
          );
          const groupMenu = (
            <Menu>
              <Menu.Item
                onClick={() =>
                  editGroupHandler(chat._id, chat.chatName, chat.users)
                }
                key="1"
              >
                Group Info
              </Menu.Item>
              <Menu.Item key="2">Exit Group</Menu.Item>
            </Menu>
          );
          return (
            <li
              key={chat._id}
              className={`${
                selectedChat === chat && "bg-medium-white"
              } border border-light-white relative rounded-md p-3 cursor-pointer hover:bg-light-white flex items-center shadow-sm shadow-black hover:shadow-lg hover:shadow-black gap-2`}
            >
              <div
                onClick={() => setSelectedChat(chat)}
                className="flex items-center gap-3"
              >
                {chat.isGroupChat ? (
                  <div className="flex items-center">
                    {chat.users.slice(0, 3).map((user, index) => (
                      <div
                        key={user._id}
                        style={{
                          marginLeft: index > 0 ? "-30px" : "0",
                        }}
                        className="overflow-hidden rounded-full w-12 h-12 mx-auto shadow-md shadow-black"
                      >
                        {skeleton ? (
                          <Skeleton.Avatar active />
                        ) : (
                          <img
                            src={user?.image || imageLinks.profile}
                            alt="Profile"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-full w-12 h-12 mx-auto shadow-md shadow-black">
                    {skeleton ? (
                      <Skeleton.Avatar active />
                    ) : (
                      <img
                        src={receiver[0]?.image || imageLinks.profile}
                        alt="Profile"
                      />
                    )}
                  </div>
                )}
                <div>
                  <h1 className="text-md font-semibold capitalize text-gray-300">
                    {skeleton ? (
                      <Skeleton.Input style={{ width: 100 }} active />
                    ) : chat.isGroupChat ? (
                      chat.chatName
                    ) : (
                      receiver[0].name
                    )}
                  </h1>
                  {chat.latestMessage && (
                    <p className="text-gray-500 font-sans text-sm">
                      {skeleton ? (
                        <Skeleton.Input style={{ width: 150 }} active />
                      ) : chat.latestMessage ? (
                        <>
                          <span>
                            {chat.latestMessage.sender._id === userData._id
                              ? "Me"
                              : chat.latestMessage.sender.name}
                            :
                          </span>{" "}
                          {chat.latestMessage.content.length > 15
                            ? chat.latestMessage.content.substring(0, 16) +
                              "..."
                            : chat.latestMessage.content}
                        </>
                      ) : (
                        receiver[0].email
                      )}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-gray-300 absolute right-4 z-10 rounded-full hover:bg-light-white pt-1">
                <Dropdown
                  overlay={chat.isGroupChat ? groupMenu : chatMenu}
                  trigger={["click"]}
                  placement="bottomRight"
                  arrow
                >
                  <MoreOutlined className=" text-xl font-extrabold" />
                </Dropdown>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

ChatList.propTypes = {
  chatData: PropTypes.node.isRequired,
  userData: PropTypes.node.isRequired,
  skeleton: PropTypes.node.isRequired,
  selectedChat: PropTypes.node.isRequired,
  notification: PropTypes.node.isRequired,
  setSelectedChat: PropTypes.node.isRequired,
  setNotification: PropTypes.node.isRequired,
  editGroupHandler: PropTypes.node.isRequired,
};

export default ChatList;
