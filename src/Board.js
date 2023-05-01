import React, { useState } from "react";
import Box from "./Box";

const Board = () => {
  const WININGS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [xPlaying, isXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [score, setScore] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);

  const handleClick = (boxIdx) => {
    const updateBoard = board.map((value, idx) => {
      if (idx === boxIdx) {
        return xPlaying ? "X" : "O";
      } else {
        return value;
      }
    });

    const checkWinner = (board) => {
      for (let i = 0; i < WININGS.length; i++) {
        const [a, b, c] = WININGS[i];
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
          setGameOver(true);
          return board[a];
        }
      }
    };

    const winner = checkWinner(updateBoard);
    if (gameOver) {
      restartGame();
      isXPlaying(true);
    } else {
      if (winner === "X") {
        let { xScore } = score;
        xScore += 1;
        setScore({ ...score, xScore });
      } else if (winner === "O") {
        let { oScore } = score;

        oScore += 1;
        setScore({ ...score, oScore });
      }
      setBoard(updateBoard);
      isXPlaying(!xPlaying);
    }
  };

  const restartGame = () => {
    setGameOver(false);
    isXPlaying(true);
    setBoard(Array(9).fill(null));
  };
  return (
    <div className="w-full h-[100svh] flex flex-col gap-4 justify-center items-center">
      <div className="flex   bg-[#9064FD] w-3/4  text-[#3b329a] font-bold text-2xl">
        <span
          className={` w-1/2 h-full text-center ${
            xPlaying ? "border-b-4 border-white" : ""
          }`}
        >
          X : {score.xScore}
        </span>
        <span
          className={` w-1/2 h-full text-center ${
            !xPlaying ? "border-b-4 border-white" : ""
          }`}
        >
          O : {score.oScore}
        </span>
      </div>
      <div className="w-3/4 h-[40vh] bg-[#9064FD] p-2 gap-2 grid grid-cols-3 rounded-md ">
        {board.map((value, boxIdx) => {
          return (
            <Box
              key={boxIdx}
              value={value}
              handleClick={() => value == null && handleClick(boxIdx)}
            />
          );
        })}
      </div>
      <button
        onClick={restartGame}
        className="bg-[#9064FD] p-4 w-22 h-22 text-white text-xl rounded-md"
      >
        Restart
      </button>
    </div>
  );
};

export default Board;
