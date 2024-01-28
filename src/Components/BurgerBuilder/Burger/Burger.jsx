import Ingredient from "../Ingredient/Ingredient";
import "./Burger.css";

const Burger = ({ ingredients }) => {
  let ingredientArr = ingredients
    .map((item) => {
      let amountArr = [...Array(item.amount).keys()];
      return amountArr.map(() => {
        return <Ingredient type={item.type} key={Math.random()} />;
      });
    })
    .reduce((arr, element) => {
      return arr.concat(element);
    }, []);

  if (ingredientArr.length === 0) {
    ingredientArr = <p>Please add some ingredients!</p>;
  }
  return (
    <div className="Burger">
      <Ingredient type="bread-top" />
      {ingredientArr}
      <Ingredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
