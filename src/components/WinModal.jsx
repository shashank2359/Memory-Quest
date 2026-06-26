export default function WinModal({
  moves,
  timer,
  restart,
}) {
  return (
    <div className="overlay">
        {
Array.from({length:40}).map((_,i)=>(

<div
    key={i}
    className="confetti"
    style={{
        left:`${Math.random()*100}%`,
        background:
            `hsl(${Math.random()*360},
            90%,60%)`,
        animationDelay:
            `${Math.random()*2}s`
    }}
/>

))
}
      <div className="win-box">

        <h1>🎉 Congratulations!</h1>

        <h2>You Won!</h2>

        <p>
          Moves: {moves}
        </p>

        <p>
          Time: {timer}s
        </p>

        <button
          onClick={restart}
        >
          Play Again
        </button>

      </div>
    </div>
  );
}