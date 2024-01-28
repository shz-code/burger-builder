const Order = (props) => {
  const ingredientSummary = props.order.ingredients.map((item) => {
    return (
      <span className="border shadow-sm rounded p-2 ms-1" key={item.type}>
        {item.amount}x{" "}
        <span style={{ textTransform: "capitalize" }}>{item.type}</span>
      </span>
    );
  });
  return (
    <div className="border shadow-sm rounded p-4 mb-4">
      <p>Order Number: {props.order.id}</p>
      <p>Delivery Address: {props.order.deliveryAddress}</p>
      <hr />
      {ingredientSummary}
      <hr />
      <p>Total: {props.order.amount} BDT</p>
    </div>
  );
};

export default Order;
