import { Modal } from "antd";
import PropTypes from "prop-types";
import imageLinks from "../../assets/images/imageLinks";

const AccountModal = ({ visible, toggleModal, user }) => {
  return (
    <Modal visible={visible} onCancel={toggleModal} footer={null} centered>
      <div className="text-center p-5">
        <div className="cursor-pointer hover:scale-110 duration-300">
          <div className="overflow-hidden rounded-full w-60 h-60 mx-auto shadow-md shadow-black mb-5">
            <img src={user?.image || imageLinks.profile} alt="Account" />
          </div>
        </div>
        <h2 className="text-2xl text-gray-300 font-semibold capitalize">
          {user?.name}
        </h2>{" "}
        <p className="text-sm text-gray-500">{user?.email}</p>{" "}
        <h3 className="text-md text-gray-400 capitalize">{user?.place}</h3>{" "}
      </div>
    </Modal>
  );
};

AccountModal.propTypes = {
  visible: PropTypes.node.isRequired,
  toggleModal: PropTypes.node.isRequired,
  user: PropTypes.node.isRequired,
};

export default AccountModal;
