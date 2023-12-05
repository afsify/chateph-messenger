import imageLinks from "../../assets/images/imageLinks";
import PropTypes from "prop-types";
import { Skeleton } from "antd";

function DefaultWindow({ skeleton }) {
  return (
    <div className="h-screen flex">
      <div className="bg-light-dark flex justify-center items-center w-full">
        <div className="bg-medium-dark text-white rounded-xl flex justify-center p-6 shadow-sm shadow-black">
          <div className="flex-col w-full container items-center">
            <div className="overflow-hidden rounded-full w-20 h-20 mx-auto shadow-md shadow-black">
              {skeleton ? (
                <Skeleton.Avatar active />
              ) : (
                <img src={imageLinks.logo} alt="Logo" />
              )}
            </div>
            <h1 className="text-2xl mt-2">Welcome to ChatHub</h1>
            <h1 className="text-sm text-center mt-1">Please select a chat</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

DefaultWindow.propTypes = {
  skeleton: PropTypes.node.isRequired,
};

export default DefaultWindow;
