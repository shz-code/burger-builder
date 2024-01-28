const Summary = ({ ingredients }) => {
  return (
    <div>
      <ul>
        {ingredients.map((item) => (
          <li key={item.type}>
            <span className="text-uppercase fw-bold">{item.type}</span>:{" "}
            {item.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Summary;
