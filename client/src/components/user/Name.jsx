import PropTypes from "prop-types";

function Name({ children }) {
  return (
    <div className="bg-medium-dark text-white sticky top-0 z-20 rounded-xl h-16 flex justify-center px-4 shadow-sm shadow-black">
      <div className="flex justify-between w-full container items-center gap-x-2">
        {children}
      </div>
    </div>
  );
}

Name.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Name;
