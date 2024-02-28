const Order = (props) => {
  const ingredientSummary = props.order.ingredients.map((item) => {
    return (
      <span className="border shadow-sm rounded p-2 ms-1" key={item._id}>
        {item.amount}x{" "}
        <span style={{ textTransform: "capitalize" }}>{item.itemType}</span>
      </span>
    );
  });
  return (
    <div className="border shadow-sm rounded p-4 mb-4">
      <p>Order Number: {props.order.orderId}</p>
      <p>Delivery Address: {props.order.deliveryAddress}</p>
      <hr />
      {ingredientSummary}
      <hr />
      <div className="d-flex justify-content-between">
        <p>Total: {props.order.amount} BDT</p>
        <p>Status: {props.order.status}</p>
      </div>
    </div>
  );
};

export default Order;
