import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalBody } from "reactstrap";
import { useInitMutation } from "../../../features/orders/orderApi";
import Spinner from "../../Spinner/Spinner";

const Checkout = () => {
  const { totalPrice, ingredients } = useSelector((state) => state.burger);
  const { userId, email } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const [values, setValues] = useState({
    deliveryAddress: "",
    phone: "",
    paymentType: "Cash On Delivery",
  });
  const [modalMsg, setModalMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [init, { isLoading }] = useInitMutation();

  const submitHandler = async () => {
    const body = {
      ingredients: ingredients,
      deliveryAddress: values.deliveryAddress,
      amount: totalPrice,
      userId: userId,
      paymentType: values.paymentType,
      email: email,
      phone: values.phone,
    };
    try {
      const res = await init(body);
      if (res.data.payment) {
        setModalOpen(true);
        setModalMsg("Order Placed Successfully");
      } else if (res.data.status) {
        setModalOpen(true);
        window.location = res.data.url;
      }
    } catch (err) {
      console.log(err);
      setModalOpen(true);
      setModalMsg("Something Went Wrong");
    }
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
          <option value="Pay Now">Pay Now</option>
        </select>
        <Button
          className="mr-auto brand-bg border-0"
          onClick={submitHandler}
          disabled={!values.deliveryAddress || !values.phone}
        >
          Place Order
        </Button>
        <Button
          color="secondary border-0 ms-2"
          className="ml-1"
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
  return (
    <div>
      {isLoading ? <Spinner /> : form}
      <Modal isOpen={modalOpen} onClick={() => navigate("/")}>
        <ModalBody>
          <p>{modalMsg}</p>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Checkout;
