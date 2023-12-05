import PropTypes from "prop-types";

function Title({ children }) {
  return (
    <div className="bg-light-dark text-white sticky top-0 z-20 rounded-xl h-14 flex justify-center px-4">
      <div className="flex justify-between w-full container items-center">
        {children}
      </div>
    </div>
  );
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Title;
