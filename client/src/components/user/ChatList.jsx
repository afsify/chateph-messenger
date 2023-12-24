import { Skeleton } from "antd";
import PropTypes from "prop-types";
import imageLinks from "../../assets/images/imageLinks";

function ChatList({
  chatData,
  userData,
  skeleton,
  selectedChat,
  setSelectedChat,
}) {
  return (
    <div className="md:mt-5 mt-20">
      <ul className="space-y-4">
        {chatData.map((chat) => {
          const receiver = chat.users.filter(
            (user) => user._id !== userData._id
          );
          return (
            <li
              key={chat._id}
              onClick={() => setSelectedChat(chat)}
              className={`${
                selectedChat === chat && "bg-medium-white"
              } border border-light-white relative rounded-md p-3 cursor-pointer hover:bg-light-white flex items-center shadow-sm shadow-black hover:shadow-lg hover:shadow-black gap-2`}
            >
              <div className="flex items-center gap-3">
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
                <div>
                  <h1 className="text-md font-semibold text-gray-300">
                    {skeleton ? (
                      <Skeleton.Input style={{ width: 100 }} active />
                    ) : (
                      receiver[0]?.name
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
                        <span className="capitalize">receiver[0]?.place</span>
                      )}
                    </p>
                  )}
                </div>
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
  setSelectedChat: PropTypes.node.isRequired,
};

export default ChatList;
