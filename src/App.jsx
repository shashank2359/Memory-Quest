import "./App.css";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import WinModal from "./components/WinModal";

import panda from "./assets/panda.png";
import fox from "./assets/fox.png";
import rabbit from "./assets/rabbit.png";
import puppy from "./assets/puppy.png";
import kitten from "./assets/kitten.png";
import lion from "./assets/lion.png";
import frog from "./assets/frog.png";
import teddy from "./assets/teddy.png";

import flipSound from "./assets/flip.mp3";
import winSound from "./assets/win.mp3";

const flipAudio = new Audio(flipSound);
const winAudio = new Audio(winSound);

const easyAnimals = [
  panda,
  fox,
  rabbit,
  puppy,
  kitten,
  lion,
  frog,
  teddy,
];

const mediumAnimals = [
  panda,
  fox,
  rabbit,
  puppy,
  kitten,
  lion,
  frog,
  teddy,
  panda,
  fox,
];

const hardAnimals = [
  panda,
  fox,
  rabbit,
  puppy,
  kitten,
  lion,
  frog,
  teddy,
  panda,
  fox,
  rabbit,
  puppy,
  kitten,
  lion,
  frog,
  teddy,
  panda,
  fox,
];

export default function App() {
  const [difficulty, setDifficulty] = useState("Easy");

  const [cards, setCards] = useState([]);

  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);

  const [disabled, setDisabled] = useState(false);

  const [moves, setMoves] = useState(0);

  const [timer, setTimer] = useState(0);

  const [gameStarted, setGameStarted] =
    useState(false);

  const [won, setWon] = useState(false);

  const [best, setBest] = useState(null);

  // load best score
  useEffect(() => {
    const saved =
      localStorage.getItem(
        `best-${difficulty}`
      );

    if (saved)
      setBest(JSON.parse(saved));
    else
      setBest(null);

    startGame();
  }, [difficulty]);

  // timer starts only after first click
  useEffect(() => {
    if (!gameStarted || won) return;

    const interval = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);

    return () =>
      clearInterval(interval);
  }, [gameStarted, won]);

  const getAnimals = () => {
    if (difficulty === "Easy")
      return easyAnimals;

    if (difficulty === "Medium")
      return mediumAnimals;

    return hardAnimals;
  };

  const startGame = () => {
    const selected = getAnimals();

    const shuffled = [
      ...selected,
      ...selected,
    ]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({
        id: index,
        image,
        flipped: false,
        matched: false,
      }));

    setCards(shuffled);

    setFirst(null);
    setSecond(null);

    setDisabled(false);

    setMoves(0);

    setTimer(0);

    setWon(false);

    setGameStarted(false);
  };

  const handleClick = (card) => {
    flipAudio.currentTime = 0;
    flipAudio.play();
    if (
      card.flipped ||
      card.matched ||
      disabled
    )
      return;

    if (!gameStarted)
      setGameStarted(true);

    setCards((prev) =>
      prev.map((c) =>
        c.id === card.id
          ? {
              ...c,
              flipped: true,
            }
          : c
      )
    );

    if (!first)
      setFirst(card);
    else setSecond(card);
  };

  useEffect(() => {
    if (first && second) {
      setDisabled(true);

      setMoves((m) => m + 1);

      if (
        first.image ===
        second.image
      ) {
        setCards((prev) =>
          prev.map((card) =>
            card.image ===
            first.image
              ? {
                  ...card,
                  matched: true,
                }
              : card
          )
        );

        resetTurn();
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id ===
                first.id ||
              card.id ===
                second.id
                ? {
                    ...card,
                    flipped: false,
                  }
                : card
            )
          );

          resetTurn();
        }, 1000);
      }
    }
  }, [second]);

  const resetTurn = () => {
    setFirst(null);
    setSecond(null);

    setDisabled(false);
  };

  useEffect(() => {
    if (
      cards.length &&
      cards.every(
        (card) =>
          card.matched
      )
    ) {
      setWon(true);

      winAudio.currentTime = 0;
      winAudio.play();

      const current = {
        moves,
        timer,
      };

      if (
        !best ||
        current.moves <
          best.moves ||
        (current.moves ===
          best.moves &&
          current.timer <
            best.timer)
      ) {
        localStorage.setItem(
          `best-${difficulty}`,
          JSON.stringify(
            current
          )
        );

        setBest(current);
      }
    }
  }, [cards]);

 return (
  <>
    <div className="cloud cloud1"></div>
    <div className="cloud cloud2"></div>
    <div className="cloud cloud3"></div>

    <div className="app">
      <h1 className="title">
        🎮 Memory Quest
      </h1>

      <div className="stats">
        <div>
          Moves
          <span>
            {moves}
          </span>
        </div>

        <div>
          Time
          <span>
            {timer}s
          </span>
        </div>

        <div>
          Best
          <span>
            {best
              ? `${best.moves}`
              : "--"}
          </span>
        </div>
      </div>

      <div className="controls">
        <select
          value={
            difficulty
          }
          onChange={(e) =>
            setDifficulty(
              e.target.value
            )
          }
        >
          <option>
            Easy
          </option>

          <option>
            Medium
          </option>

          <option>
            Hard
          </option>
        </select>

        <button
          className="restart"
          onClick={
            startGame
          }
        >
          Restart
        </button>
      </div>

      <div className={`grid ${difficulty.toLowerCase()}`}>
        {cards.map(
          (card) => (
            <Card
              key={
                card.id
              }
              card={
                card
              }
              handleClick={
                handleClick
              }
              disabled={
                disabled
              }
            />
          )
        )}
      </div>

       {
        won &&
        <WinModal
          moves={moves}
          timer={timer}
          restart={startGame}
        />
      }

    </div>
  </>
); 
}