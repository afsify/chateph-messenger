import Name from "./Name";
import io from "socket.io-client";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import Linkify from "react-linkify";
import AccountModal from "./AccountModal";
import EmojiInput from "react-input-emoji";
import { format as timeAgo } from "timeago.js";
import ScrollableFeed from "react-scrollable-feed";
import { useState, useEffect, useRef } from "react";
import { Button, Skeleton, Spin, Tooltip } from "antd";
import imageLinks from "../../assets/images/imageLinks";
import { SendOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { listMessage, sendMessage } from "../../api/services/userService";
var socket, selectedChatCompare;

function ChatWindow({
  userData,
  skeleton,
  selectedChat,
  notification,
  setSelectedChat,
  setNotification,
  toggleAccountModal,
  isAccountModalVisible,
}) {
  const messagesEndRef = useRef(null);
  const [messages, setMessage] = useState([]);
  const [typing, setTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [fetchAgain, setFetchAgain] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  const fetchMessage = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const { data } = await listMessage(selectedChat._id);
      setMessage(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessages = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        setNewMessage("");
        const { data } = await sendMessage({
          content: newMessage,
          chatId: selectedChat,
        });
        socket.emit("new message", data);
        setMessage([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occurred!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    socket = io(import.meta.env.VITE_USER_URL);
    socket.emit("setup", userData);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchMessage();
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessage([...messages, newMessageReceived]);
      }
    });
  });

  const typingHandler = (text) => {
    setNewMessage(text);
    if (socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isSameSender = (messages, m, i, userId) => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender._id !== m.sender._id ||
        messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userId
    );
  };

  const isLastMessage = (messages, i, userId) => {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender._id !== userId &&
      messages[messages.length - 1].sender._id
    );
  };

  const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
  };

  return (
    <div className="h-screen flex">
      <div className="bg-light-gray w-full pt-6 px-2 relative duration-300 overflow-y-scroll scrollable-container">
        <Name>
          <div className="flex items-center">
            <div
              onClick={toggleAccountModal}
              className="overflow-hidden rounded-full w-11 h-11 mx-auto shadow-md shadow-black cursor-pointer hover:scale-110 duration-300"
            >
              {skeleton ? (
                <Skeleton.Avatar active />
              ) : (
                <img
                  src={
                    selectedChat.users.find((user) => user._id !== userData._id)
                      ?.image || imageLinks.profile
                  }
                  alt="Profile"
                />
              )}
              <AccountModal
                visible={isAccountModalVisible}
                toggleModal={toggleAccountModal}
                user={selectedChat.users.find(
                  (user) => user._id !== userData._id
                )}
              />
            </div>
            <h2 className="text-xl text-gray-300 ml-3 font-semibold">
              {selectedChat.users.find((user) => user._id !== userData._id)
                ?.name || "Unknown User"}
            </h2>
          </div>
          <div onClick={() => setSelectedChat()} className="flex">
            <ArrowLeftOutlined className="text-2xl text-gray-300" />
          </div>
        </Name>
        {loading ? (
          <Spin
            size="large"
            className="flex h-screen justify-center items-center"
          />
        ) : (
          <ScrollableFeed>
            {messages.length < 10 && (
              <div className="md:h-screen md:mt-0 mt-16"></div>
            )}
            {messages &&
              messages.map((m, i) => (
                <div className="flex" key={m._id}>
                  {(isSameSender(messages, m, i, userData._id) ||
                    isLastMessage(messages, i, userData._id)) && (
                    <Tooltip title={m.sender.name} placement="top">
                      <div className="relative overflow-hidden mt-3 mr-1 cursor-pointer rounded-full w-9 h-9">
                        <img
                          src={m.sender?.image || imageLinks.profile}
                          alt={m.sender.name}
                        />
                        {isTyping && (
                          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded-full flex items-center justify-center">
                            <div className="animate-bounce text-center">
                              <div className="inline-block w-[0.30rem] h-[0.30rem] bg-white rounded-full"></div>
                              <div className="inline-block w-[0.30rem] h-[0.30rem] bg-white rounded-full mx-[0.20rem]"></div>
                              <div className="inline-block w-[0.30rem] h-[0.30rem] bg-white rounded-full"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </Tooltip>
                  )}
                  <span
                    className={`${
                      m.sender._id === userData._id
                        ? "ml-auto max-w-xs bg-blue-200"
                        : isSameSender(messages, m, i, userData._id) ||
                          isLastMessage(messages, i, userData._id)
                        ? "mr-auto max-w-xs bg-green-200"
                        : "ml-10 max-w-xs bg-green-200"
                    } mt-${
                      isSameUser(messages, m, i, userData._id) ? 1 : 3
                    } rounded-2xl p-2 max-w-3/4`}
                    style={{ overflowWrap: "break-word" }}
                  >
                    <Linkify
                      componentDecorator={(href, text, key) => (
                        <a
                          href={href}
                          key={key}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {text}
                        </a>
                      )}
                    >
                      {m.content}
                    </Linkify>
                    <div className="text-xs font-sans text-gray-500">
                      {timeAgo(m.createdAt)}
                    </div>
                  </span>
                </div>
              ))}
            <div ref={messagesEndRef}></div>
          </ScrollableFeed>
        )}
        <div className="box-border flex md:sticky md:bottom-0 justify-center">
          <div className="flex md:sticky bottom-0 md:w-full fixed w-[99%] z-30 p-2 gap-x-2">
            <div className="flex-grow relative">
              <EmojiInput
                placeholder="Enter a message..."
                value={newMessage}
                onChange={(text) => {
                  typingHandler(text);
                }}
                onEnter={(text) =>
                  sendMessages({ key: "Enter", target: { value: text } })
                }
                className="rounded-full"
              />
              {newMessage ? (
                <div className="absolute z-30 right-10 top-1/2 transform -translate-y-1/2 mr-2">
                  <Button
                    style={{ background: "transparent", border: "none" }}
                    className="rounded-full"
                    onClick={() =>
                      sendMessages({
                        key: "Enter",
                        target: { value: newMessage },
                      })
                    }
                    icon={
                      <SendOutlined
                        style={{ fontSize: "20px", color: "#151415" }}
                      />
                    }
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ChatWindow.propTypes = {
  userData: PropTypes.node.isRequired,
  skeleton: PropTypes.node.isRequired,
  selectedChat: PropTypes.node.isRequired,
  notification: PropTypes.node.isRequired,
  setSelectedChat: PropTypes.node.isRequired,
  setNotification: PropTypes.node.isRequired,
  toggleAccountModal: PropTypes.node.isRequired,
  isAccountModalVisible: PropTypes.node.isRequired,
};

export default ChatWindow;
