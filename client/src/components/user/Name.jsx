import PropTypes from "prop-types";

function Name({ children }) {
  return (
    <div className="box-border flex md:sticky md:top-0 justify-center">
      <div className="bg-medium-dark text-white md:sticky fixed md:top-0 z-20 md:w-full w-[99%] rounded-xl h-16 flex justify-center px-4 shadow-sm shadow-black">
        <div className="flex justify-between w-full container items-center gap-x-2">
          {children}
        </div>
      </div>
    </div>
  );
}

Name.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Name;
