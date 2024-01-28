import { useDispatch } from "react-redux";
import {
  addIngredient,
  removeIngredient,
} from "../../../features/burger/burgerSlice";

const BuildControls = ({ item }) => {
  const { label } = item;
  const dispatch = useDispatch();

  const removed = () => {
    dispatch(removeIngredient(item));
  };
  const added = () => {
    dispatch(addIngredient(item));
  };

  return (
    <div className="d-flex justify-content-between">
      <div className="mr-auto ml-5 fw-bold lead">{label}</div>
      <div>
        <button className="btn btn-danger btn-sm m-1" onClick={removed}>
          Less
        </button>
        <button className="btn btn-success btn-sm m-1" onClick={added}>
          More
        </button>
      </div>
    </div>
  );
};

export default BuildControls;
