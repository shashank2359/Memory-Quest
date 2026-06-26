export default function Header({
  moves,
  timer,
  restart,
  best,
}) {
  return (
    <div className="header">
      <h1>🧠 Memory Game</h1>

      <div className="stats">
        <div>Moves: {moves}</div>
        <div>Time: {timer}s</div>
        <div>
          Best:
          {best
            ? `${best.moves} moves`
            : "--"}
        </div>
      </div>

      <button onClick={restart}>
        Restart
      </button>
    </div>
  );
}