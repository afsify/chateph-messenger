import { useRef, useEffect } from "react";
import { Button, Form, Input } from "antd";
import PropTypes from "prop-types";

const InputOTP = ({ otpValues, setOtpValues, onFinish }) => {
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (/^\d+$/.test(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
      if (value !== "" && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === "" && index >= 0) {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
      const newOtpValues = [...otpValues];
      newOtpValues[index] = "";
      setOtpValues(newOtpValues);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newOtpValues = pastedData.split("").slice(0, 6);
      setOtpValues(newOtpValues);
      newOtpValues.forEach((value, index) => {
        inputRefs.current[index].value = value;
      });
      inputRefs.current[5].focus();
    }
  };

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  return (
    <Form className="flex flex-col mt-3" onFinish={onFinish}>
      <div className="flex justify-center">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <Form.Item key={index} style={{ margin: "0 7px" }}>
            <Input
              type="text"
              className="p-2"
              style={{ width: "40px", textAlign: "center" }}
              maxLength={1}
              onChange={(e) => handleChange(index, e.target.value)}
              onPaste={handlePaste}
              value={otpValues[index]}
              ref={(input) => (inputRefs.current[index] = input)}
            />
          </Form.Item>
        ))}
      </div>
      <Button
        size="large"
        className="text-white font-semibold hover:scale-105 duration-300 mt-6"
        htmlType="submit"
      >
        Submit
      </Button>
    </Form>
  );
};

InputOTP.propTypes = {
  otpValues: PropTypes.node.isRequired,
  setOtpValues: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
};

export default InputOTP;
