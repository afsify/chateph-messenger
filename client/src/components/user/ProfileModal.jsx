import { useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { Image } from "cloudinary-react";
import { useDispatch } from "react-redux";
import { CameraOutlined } from "@ant-design/icons";
import { cloudUpload } from "../../api/cloudinary";
import imageLinks from "../../assets/images/imageLinks";
import { Form, Input, Button, Upload, Modal } from "antd";
import { updateProfile } from "../../api/services/userService";
import { hideLoading, showLoading } from "../../utils/alertSlice";

function ProfileModal({
  visible,
  toggleModal,
  userData,
  setProfileModalVisible,
}) {
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState(userData?.name || "");
  const [phone, setPhone] = useState(userData?.phone || "");
  const [place, setPlace] = useState(userData?.place || "");
  const [image, setImage] = useState(userData?.image || imageLinks.profile);

  const onFinish = async () => {
    try {
      const updatedData = {
        image,
        name,
        phone,
        place,
      };
      dispatch(showLoading());
      const response = await updateProfile(updatedData);
      setProfileModalVisible(false);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error Updating Profile:", error);
      toast.error("Something went wrong");
    }
  };

  const customRequest = async (options) => {
    try {
      const formData = new FormData();
      formData.append("file", options.file);
      formData.append("upload_preset", import.meta.env.VITE_CLOUD_PRESET);
      setUploading(true);
      const response = await cloudUpload(formData);
      const cloudinaryImageUrl = response.data.secure_url;
      setImage(cloudinaryImageUrl);
      setUploading(false);
    } catch (error) {
      console.log("Error Uploading Image", error);
      setUploading(false);
    }
  };

  const validateName = (rule) => {
    if (!name && rule) {
      return Promise.reject("Please enter your name");
    }
    return Promise.resolve();
  };
  return (
    <Modal visible={visible} onCancel={toggleModal} footer={null}>
      <h2 className="text-3xl font-bold mb-4 text-center uppercase">Profile</h2>
      <div className="w-40 h-40 mx-auto mb-6 relative">
        <div className="overflow-hidden rounded-full w-40 h-40 mx-auto">
          {uploading ? (
            <div className="w-full h-full bg-gray-800 flex justify-center items-center">
              <div className="relative h-24 w-24">
                <div className="rounded-full h-24 w-24 border-t-4 border-t-blue-500 animate-spin absolute"></div>
                <div className="h-full w-full flex justify-center items-center">
                  <h1 className="text-blue-500 text-3xl font-mono font-extrabold">
                    &lt;/&gt;
                  </h1>
                </div>
              </div>
            </div>
          ) : (
            <Image
              className="object-cover w-full h-full"
              cloudName={import.meta.env.VITE_CLOUD_NAME}
              publicId={image}
              width="auto"
              height="150"
              crop="scale"
              alt="Profile"
            />
          )}
        </div>
        <Upload
          customRequest={customRequest}
          accept="image/*"
          showUploadList={false}
        >
          <Button className="flex items-center justify-center text-base p-2 rounded-full absolute bottom-2 right-2">
            <CameraOutlined />
          </Button>
        </Upload>
      </div>
      <Input
        value={userData?.email}
        placeholder="Email"
        className="p-2 mb-8"
        disabled
      />
      <Form className="flex flex-col gap-2" onFinish={onFinish}>
        <Form.Item
          name="name"
          rules={[
            {
              pattern: /^(?=.*[A-Za-z])[A-Za-z\s]+$/,
              message: "Please enter your name",
            },
            {
              validator: validateName,
            },
          ]}
        >
          <label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="p-2"
            />
          </label>
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            {
              pattern: /^\d{10}$/,
              message: "Phone number must be 10 digits",
            },
          ]}
        >
          <label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              className="p-2"
            />
          </label>
        </Form.Item>
        <Form.Item
          name="place"
          rules={[
            {
              pattern: /^(?=.*[A-Za-z])[A-Za-z\s]+$/,
              message: "Please enter your place",
            },
          ]}
        >
          <label>
            <Input
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="Place"
              className="p-2"
            />
          </label>
        </Form.Item>
        <Button
          size="large"
          className="text-white font-semibold hover:scale-105 duration-300"
          htmlType="submit"
        >
          Update
        </Button>
      </Form>
    </Modal>
  );
}

ProfileModal.propTypes = {
  visible: PropTypes.node.isRequired,
  toggleModal: PropTypes.node.isRequired,
  userData: PropTypes.node.isRequired,
  setProfileModalVisible: PropTypes.node.isRequired,
};

export default ProfileModal;
