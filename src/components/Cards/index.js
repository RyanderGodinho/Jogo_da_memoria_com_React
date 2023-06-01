import "./style.css";

export default function Card({ card, image, handleShowCard }) {
  return (
    <div className="cards">
      <img
        id={card.id}
        src={image}
        alt="card"
        name={card.name}
        onClick={(event) => handleShowCard(event)}
      />
    </div>
  );
}
