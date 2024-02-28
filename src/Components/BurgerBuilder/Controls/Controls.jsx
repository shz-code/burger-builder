import { Button, Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import BuildControls from "./BuildControls";

const controls = [
  { label: "Salad", itemType: "salad" },
  { label: "Cheese", itemType: "cheese" },
  { label: "Meat", itemType: "meat" },
];

const Controls = ({ price, setModalOpen }) => {
  return (
    <div className="container ml-md-5" style={{ textAlign: "center" }}>
      <Card className="my-5 text-center">
        <CardHeader className="brand-bg text-white">
          <h4>Add Ingredients</h4>
        </CardHeader>
        <CardBody>
          {controls.map((item, index) => {
            return <BuildControls item={item} key={index} />;
          })}
        </CardBody>
        <CardFooter>
          <h5>
            Price: <strong>{price}</strong> BDT
          </h5>
        </CardFooter>
        <Button
          className="brand-bg rounded-bottom border-0"
          disabled={price === 80}
          onClick={() => setModalOpen(true)}
        >
          Order Now
        </Button>
      </Card>
    </div>
  );
};

export default Controls;
