import { Button, Form, Input } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../utils/alertSlice";
import { resetPassword } from "../../api/services/userService";
import AuthCard from "../../components/auth/AuthCard";
import { userPath } from "../../routes/routeConfig";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email } = location.state || {};

  const onFinish = async (data) => {
    try {
      const values = {
        email,
        data,
      };
      dispatch(showLoading());
      const response = await resetPassword(values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate(userPath.login);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const validatePassword = (_, value) => {
    const passwordFieldValue = form.getFieldValue("password");
    if (passwordFieldValue === value) {
      return Promise.resolve();
    }
    return Promise.reject("Passwords do not match");
  };

  const [form] = Form.useForm();

  return (
    <AuthCard>
      <h2 className="font-bold text-3xl text-dark-purple">Reset Password</h2>
      <p className="text-sm mt-3 text-dark-purple">
        Set your new password for <span className="font-semibold">{email}</span>
      </p>
      <Form className="flex flex-col mt-3" onFinish={onFinish} form={form}>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Need 8-20 characters, one symbol & number",
              pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,20}$/,
            },
          ]}
        >
          <Input.Password placeholder="Password" className="p-2" />
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password",
              validator: validatePassword,
            },
          ]}
        >
          <Input.Password placeholder="Confirm Password" className="p-2" />
        </Form.Item>
        <Button
          size="large"
          className="text-white font-semibold hover:scale-105 duration-300"
          htmlType="submit"
        >
          Update
        </Button>
      </Form>
      <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
        <hr className="border-gray-400" />
        <p className="text-center text-sm">OR</p>
        <hr className="border-gray-400" />
      </div>
      <div className="mt-3 text-sm flex justify-center items-center text-dark-purple py-4">
        <p>Dont have an account?</p>
        <Link
          to={userPath.register}
          className="pl-1 text-blue-900 font-semibold hover:text-blue-500 hover:underline"
        >
          Register
        </Link>
      </div>
    </AuthCard>
  );
}

export default ResetPassword;
