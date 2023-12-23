import toast from "react-hot-toast";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../../components/auth/AuthCard";
import { adminLogin } from "../../api/services/adminService";
import { adminPath, userPath } from "../../routes/routeConfig";
import { hideLoading, showLoading } from "../../utils/alertSlice";

function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await adminLogin(values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        if (response.data.token) {
          localStorage.setItem("adminToken", response.data.token);
          navigate(`/admin/${adminPath.userManage}`);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const responseMessage = (response) => {
    let credential = jwt_decode(response.credential);
    const values = {
      name: credential.name,
      email: credential.email,
      password: credential.sub,
      exp: credential.exp,
    };
    adminLogin(values).then((response) => {
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("adminToken", response.data.token);
        navigate(`/admin/${adminPath.userManage}`);
      } else {
        toast.error(response.data.message);
      }
    });
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <AuthCard>
      <h2 className="font-bold text-3xl text-dark-purple">Signin</h2>
      <p className="text-sm mt-3 text-dark-purple">
        Signin as admin to access admin panel
      </p>
      <Form className="flex flex-col mt-3" onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email",
              type: "email",
            },
          ]}
        >
          <Input placeholder="Email" className="p-2" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
            {
              pattern: /^(?=.*[A-Za-z])[\s\S]*$/,
              message: "Password cannot be empty",
            },
          ]}
        >
          <Input.Password placeholder="Password" className="p-2" />
        </Form.Item>
        <Button
          size="large"
          className="text-white font-semibold hover:scale-105 duration-300"
          htmlType="submit"
        >
          Signin
        </Button>
      </Form>

      <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
        <hr className="border-gray-400" />
        <p className="text-center text-sm">OR</p>
        <hr className="border-gray-400" />
      </div>

      <div className="flex justify-center items-center mt-5">
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
      </div>

      <div className="mt-3 text-sm flex justify-center items-center text-dark-purple py-4">
        <p>Continue as a user?</p>
        <Link
          to={userPath.start}
          className="pl-1 text-blue-900 font-semibold hover:text-blue-500 hover:underline"
        >
          Login
        </Link>
      </div>
    </AuthCard>
  );
}

export default Signin;
