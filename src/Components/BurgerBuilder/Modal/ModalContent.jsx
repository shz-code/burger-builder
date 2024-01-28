import { useNavigate } from "react-router-dom";
import { Button, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Summary from "../Summary/Summary";

const ModalContent = ({ totalPrice, ingredients, setModalOpen }) => {
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate("/checkout");
  };
  return (
    <>
      <ModalHeader>Your Order Summary</ModalHeader>
      <ModalBody>
        <h5>Total Price: {totalPrice.toFixed(0)} BDT</h5>
        <Summary ingredients={ingredients} />
      </ModalBody>
      <ModalFooter>
        <Button className="brand-bg border-0" onClick={handleCheckout}>
          Continue to Checkout
        </Button>
        <Button color="secondary" onClick={() => setModalOpen(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </>
  );
};

export default ModalContent;
