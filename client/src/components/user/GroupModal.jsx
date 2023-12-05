import { useEffect, useState } from "react";
import { Modal, Input, Form, List, AutoComplete, Skeleton, Tag } from "antd";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { findUser } from "../../api/services/userService";

const GroupModal = ({ visible, onCreate, onCancel, editData }) => {
  const [form] = Form.useForm();
  // const [name, setName] = useState(editData?.chatName || "");
  const [members, setMembers] = useState(editData?.users || []);
  const [selectedUserNames, setSelectedUserNames] = useState([]);
  const [users, setUsers] = useState([]);
  // const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    members: [],
  });

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const updatedFormData = {
        ...formData,
        chatName: values.chatName,
        users: values.users,
      };
      form.resetFields();
      onCreate(updatedFormData);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  useEffect(() => {
    if (editData) {
      form.setFieldsValue(editData);
      setFormData(editData);
      if (editData.users) {
        setMembers(editData.users);
        const selectedNames = editData.users.map((user) => user.name);
        setSelectedUserNames(selectedNames);
      }
    }
  }, [editData, form]);

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const response = await findUser(searchTerm);
        setUsers(response.data.data);
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
  }, [searchTerm]);

  const handleAddUser = async (userId) => {
    try {
      const userExists = members.includes(userId);
      console.log(userExists);
      if (userExists) {
        return toast.error("User already exists");
      } else {
        setMembers([...members, userId]);
        const selectedUser = users.find((user) => user._id === userId);
        setSelectedUserNames([...selectedUserNames, selectedUser.name]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleRemoveUser = (userName) => {
    const updatedUserNames = selectedUserNames.filter(
      (name) => name !== userName
    );
    const userIdToRemove = users.find((user) => user.name === userName)?._id;
    const updatedMembers = members.filter(
      (userId) => userId !== userIdToRemove
    );
    setSelectedUserNames(updatedUserNames);
    setMembers(updatedMembers);
  };

  const autoCompleteOptions = users.map((user) => ({
    value: user.name,
    label: (
      <List.Item>
        {loading ? (
          <Skeleton avatar active />
        ) : (
          <List.Item.Meta
            className="flex items-center gap-x-2"
            onClick={() => handleAddUser(user._id)}
            avatar={
              <div className="overflow-hidden rounded-full w-11 h-11 mx-auto shadow-md shadow-black ">
                <img src={user.image} alt="Profile" />
              </div>
            }
            title={
              <div className="flex-col items-center">
                <h1 className="text-[13px] capitalize font-semibold">
                  {user.name}
                </h1>
                <h1 className="text-xs text-gray-500 font-sans">
                  {user.email}
                </h1>
              </div>
            }
          />
        )}
      </List.Item>
    ),
  }));

  return (
    <Modal
      visible={visible}
      title={editData ? "Group Info" : "Create Group"}
      okText={editData ? "Save" : "Create"}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleSubmit}
      centered
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Group name"
          name="chatName"
          rules={[
            {
              pattern: /^(?=.*[A-Za-z])[A-Za-z\s]+$/,
              message: "Please enter Group name",
            },
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Enter group name" className="p-2" />
        </Form.Item>
        <Form.Item label="Add users">
          <AutoComplete
            className="w-full h-10"
            placeholder="Search user"
            value={searchTerm}
            onChange={(value) => setSearchTerm(value)}
            options={autoCompleteOptions}
            style={{ maxWidth: "100%" }}
            allowClear
          />
          <div className="mt-2">
            {selectedUserNames.map((name) => (
              <Tag key={name} closable onClose={() => handleRemoveUser(name)}>
                {name}
              </Tag>
            ))}
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

GroupModal.propTypes = {
  visible: PropTypes.node.isRequired,
  onCreate: PropTypes.node.isRequired,
  onCancel: PropTypes.node.isRequired,
  editData: PropTypes.node.isRequired,
};

export default GroupModal;
