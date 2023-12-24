import PropTypes from "prop-types";
import { Image as AntImage } from "antd";
import imageLinks from "../../assets/images/imageLinks";

function AuthCard({ children }) {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="flex rounded-2xl shadow-2xl max-w-4xl bg-light-dark p-5 m-1 items-center">
        <div className="md:w-1/2 px-8 md:px-14">{children}</div>
        <div className="md:flex hidden w-1/2">
          {imageLinks.auth ? (
            <img className="rounded-2xl" src={imageLinks.auth} alt="Auth" />
          ) : (
            <div className="flex items-center rounded-2xl justify-center bg-gray-300 animate-pulse w-[482px] h-[573px]">
              <AntImage
                preview={false}
                src={imageLinks.horizontal}
                alt="Image Skeleton"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

AuthCard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthCard;
