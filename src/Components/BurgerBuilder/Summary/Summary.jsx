const Summary = ({ ingredients }) => {
  return (
    <div>
      <ul>
        {ingredients.map((item) => (
          <li key={item.itemType}>
            <span className="text-uppercase fw-bold">{item.itemType}</span>:{" "}
            {item.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Summary;
