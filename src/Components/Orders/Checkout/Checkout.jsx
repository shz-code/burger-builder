import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, ModalBody } from "reactstrap";
import Spinner from "../../Spinner/Spinner";

const Checkout = () => {
  const { totalPrice } = useSelector((state) => state.burger);
  const [values, setValues] = useState({
    deliveryAddress: "",
    phone: "",
    paymentType: "Cash On Delivery",
  });
  const [modalMsg, setModalMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const submitHandler = () => {
    // this.setState({ isLoading: true });
    // const order = {
    //   ingredients: this.props.ingredients,
    //   customer: this.state.values,
    //   price: this.props.totalPrice,
    //   orderTime: new Date(),
    //   userId: this.props.userId,
    // };
    // axios
    //   .post(
    //     "https://burger-builder-4f837.firebaseio.com/orders.json?auth=" +
    //       this.props.token,
    //     order
    //   )
    //   .then((response) => {
    //     if (response.status === 200) {
    //       this.setState({
    //         isLoading: false,
    //         isModalOpen: true,
    //         modalMsg: "Order Placed Successfully!",
    //       });
    //       this.props.resetIngredients();
    //     } else {
    //       this.setState({
    //         isLoading: false,
    //         isModalOpen: true,
    //         modalMsg: "Something Went Wrong! Order Again!",
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     this.setState({
    //       isLoading: false,
    //       isModalOpen: true,
    //       modalMsg: "Something Went Wrong! Order Again!",
    //     });
    //   });
  };

  let form = (
    <div>
      <h4 className="border rounded p-4 shadow-sm">
        Payment: {totalPrice} BDT
      </h4>
      <form className="border rounded p-4">
        <textarea
          name="deliveryAddress"
          value={values.deliveryAddress}
          className="form-control mb-2"
          placeholder="Your Address"
          onChange={(e) =>
            setValues((prev) => ({ ...prev, deliveryAddress: e.target.value }))
          }
        ></textarea>
        <input
          name="phone"
          className="form-control my-2"
          value={values.phone}
          placeholder="Your Phone Number"
          onChange={(e) =>
            setValues((prev) => ({ ...prev, phone: e.target.value }))
          }
        />
        <select
          name="paymentType"
          className="form-control my-2"
          value={values.paymentType}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, paymentType: e.target.value }))
          }
        >
          <option value="Cash On Delivery">Cash On Delivery</option>
          <option value="Bkash">Bkash</option>
        </select>
        <Button
          className="mr-auto brand-bg border-0"
          onClick={submitHandler}
          // disabled={!this.props.purchasable}
        >
          Place Order
        </Button>
        <Button
          color="secondary border-0 ms-2"
          className="ml-1"
          onClick={() => {}}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
  return (
    <div>
      {false ? <Spinner /> : form}
      <Modal isOpen={modalOpen} onClick={() => {}}>
        <ModalBody>
          <p>{modalMsg}</p>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Checkout;
