export default function Card({
  card,
  handleClick,
  disabled,
}) {

  const handleCardClick = () => {

    if (
      disabled ||
      card.flipped ||
      card.matched
    ) {
      return;
    }

    handleClick(card);
  };

  return (
    <div
      className={`memory-card ${
        card.flipped || card.matched
          ? "flip"
          : ""
      } ${
        card.matched
          ? "matched"
          : ""
      }`}
      onClick={handleCardClick}
    >
      <div className="memory-inner">

        <div className="memory-front">
          <span className="card-question">
            ?
          </span>
        </div>

        <div className="memory-back">
          <img
            src={card.image}
            alt="animal"
            className="animal-image"
            draggable={false}
          />
        </div>

      </div>
    </div>
  );
}