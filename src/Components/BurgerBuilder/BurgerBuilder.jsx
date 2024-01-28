import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "reactstrap";
import Burger from "./Burger/Burger";
import Controls from "./Controls/Controls";
import ModalContent from "./Modal/ModalContent";

const BurgerBuilder = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { ingredients, totalPrice } = useSelector((state) => state.burger);

  return (
    <div>
      <div className="d-flex flex-md-row flex-column">
        <Burger ingredients={ingredients} />
        <Controls price={totalPrice} setModalOpen={setModalOpen} />
      </div>
      <Modal isOpen={modalOpen}>
        <ModalContent
          ingredients={ingredients}
          setModalOpen={setModalOpen}
          totalPrice={totalPrice}
        />
      </Modal>
    </div>
  );
};

export default BurgerBuilder;
