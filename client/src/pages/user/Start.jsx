import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Button, Form, Input, Radio } from "antd";
import { userPath } from "../../routes/routeConfig";
import { userActions } from "../../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../../components/auth/AuthCard";
import { getUser } from "../../api/services/userService";
import { userStart } from "../../api/services/userService";
import { showLoading, hideLoading } from "../../utils/alertSlice";

function Start() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const loginResponse = await userStart(values);
      dispatch(hideLoading());
      if (loginResponse.data.success) {
        if (loginResponse.data.token) {
          localStorage.setItem("userToken", loginResponse.data.token);
          dispatch(userActions.userLogin());
          const userResponse = await getUser();
          const encodedUserData = btoa(
            JSON.stringify(userResponse.data.userData)
          );
          localStorage.setItem("userData", encodedUserData);
          toast.success(loginResponse.data.message);
          navigate(userPath.home);
        }
      } else {
        if (loginResponse.data.message) {
          toast.error(loginResponse.data.message);
        } else {
          toast.error("Unknown Error");
        }
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <AuthCard>
      <h2 className="font-bold text-3xl text-dark-purple hover:text-blue-500 cursor-pointer">
        ChatHub
      </h2>
      <p className="text-sm mt-3 text-dark-purple">
        Connect Today, Cherish the Moment Tomorrow
      </p>
      <Form rm className="flex flex-col mt-3" onFinish={onFinish}>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Username should be 3 to 20 lowercase letters",
              pattern: /^[a-z]{3,20}$/,
            },
          ]}
        >
          <Input placeholder="Username" className="p-2" />
        </Form.Item>
        <Form.Item
          name="place"
          rules={[
            {
              required: true,
              message: "Please enter your place using letters ",
              pattern: /^[a-zA-Z]+$/,
            },
          ]}
        >
          <Input placeholder="Place" className="p-2" />
        </Form.Item>
        <div className="flex justify-center items-center">
          <Form.Item
            name="gender"
            rules={[
              {
                required: true,
                message: "Please select your gender",
              },
            ]}
          >
            <Radio.Group className="flex items-center space-x-4">
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <Button
          size="large"
          className="text-white font-semibold hover:scale-105 duration-300"
          htmlType="submit"
        >
          Start
        </Button>
      </Form>
      <div className="mt-3 text-sm flex justify-center items-center text-dark-purple py-4">
        <Link to="/admin/signin">
          <p className="text-center">Engage in chats that last for a day</p>
        </Link>
      </div>
    </AuthCard>
  );
}

export default Start;
