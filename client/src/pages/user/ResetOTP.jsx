import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../utils/alertSlice";
import { checkOTP } from "../../api/services/userService";
import AuthCard from "../../components/auth/AuthCard";
import { userPath } from "../../routes/routeConfig";
import InputOTP from "../../components/user/InputOTP";

function ResetOTP() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email } = location.state || {};
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);

  const onFinish = async () => {
    try {
      const otp = otpValues.join("");
      const values = {
        otp,
        email,
      };
      dispatch(showLoading());
      const response = await checkOTP(values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate(userPath.resetPassword, {
          state: { email: response.data.email },
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <AuthCard>
      <h2 className="font-bold text-3xl text-dark-purple">Verification</h2>
      <p className="text-sm mt-3 text-dark-purple">
        OTP has been sent via email to{" "}
        <span className="font-semibold">{email}</span>
      </p>
      <InputOTP
        otpValues={otpValues}
        setOtpValues={setOtpValues}
        onFinish={onFinish}
      />
      <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
        <hr className="border-gray-400" />
        <p className="text-center text-sm">OR</p>
        <hr className="border-gray-400" />
      </div>
      <div className="mt-3 text-sm flex justify-center items-center text-dark-purple py-4">
        <p>OTP not received?</p>
        <Link
          to={userPath.forgotPassword}
          className="pl-1 text-blue-900 font-semibold hover:text-blue-500 hover:underline"
        >
          Forgot Password
        </Link>
      </div>
    </AuthCard>
  );
}

export default ResetOTP;
