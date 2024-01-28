import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetOrdersQuery } from "../../features/orders/orderApi";
import Spinner from "../Spinner/Spinner";
import Order from "./Order/Order";

const Orders = () => {
  const { userId } = useSelector((state) => state.user);
  const [info, setInfo] = useState([]);
  const { data, isLoading, isError } = useGetOrdersQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (!isLoading && !isError) {
      if (data.length) {
        const userOrders = data.filter((item) => {
          if (userId === item.userId) return item;
        });
        setInfo([...userOrders]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError]);

  let content = null;
  if (isLoading) content = <Spinner />;
  else if (!isLoading && isError)
    content = <p className="text-danger">Something went wrong</p>;
  else if (!isLoading && !isError && !info.length)
    content = (
      <p className="border shadow-sm rounded p-4 mb-4">You have no Orders!</p>
    );
  else if (!isLoading && !isError && info.length)
    content = info.map((order) => <Order order={order} key={order.id} />);

  return <div>{content}</div>;
};

export default Orders;
