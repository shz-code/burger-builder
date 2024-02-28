import { useSelector } from "react-redux";
import { useGetOrdersQuery } from "../../features/orders/orderApi";
import Spinner from "../Spinner/Spinner";
import Order from "./Order/Order";

const Orders = () => {
  const { userId } = useSelector((state) => state.user);
  const { data, isLoading, isError } = useGetOrdersQuery(userId, {
    refetchOnMountOrArgChange: true,
  });

  let content = null;
  if (isLoading) content = <Spinner />;
  else if (!isLoading && isError)
    content = <p className="text-danger">Something went wrong</p>;
  else if (!isLoading && !isError && !data.length)
    content = (
      <p className="border shadow-sm rounded p-4 mb-4">You have no Orders!</p>
    );
  else if (!isLoading && !isError && data.length)
    content = data.map((order) => <Order order={order} key={order._id} />);

  return <div>{content}</div>;
};

export default Orders;
