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
      className={`
        memory-card
        ${
          card.flipped ||
          card.matched
            ? "flip"
            : ""
        }
        ${
          card.matched
            ? "matched"
            : ""
        }
      `}
      onClick={
        handleCardClick
      }
    >

      <div className="memory-inner">

        {/* FRONT SIDE */}

        <div className="memory-front">

          <div className="card-question">
            ?
          </div>

        </div>

        {/* BACK SIDE */}

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