import PropTypes from "prop-types";
import imageLinks from "../../assets/images/imageLinks";

function AuthCard({ children }) {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="flex rounded-2xl shadow-2xl max-w-4xl bg-light-dark  p-5 m-1 items-center">
        <div className="md:w-1/2 px-8 md:px-14">{children}</div>
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src={imageLinks.auth} alt="Auth" />
        </div>
      </div>
    </section>
  );
}

AuthCard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthCard;
