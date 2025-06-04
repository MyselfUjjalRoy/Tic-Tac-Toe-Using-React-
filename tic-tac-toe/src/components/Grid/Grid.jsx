import { useState } from "react";
import Card from "../Card/Card";
import isWinner from "../../helpers/checkWinner";
import "./Grid.css";

function Grid({ numberOfCards }) {
  const [board, setBoard] = useState(Array(numberOfCards).fill(""));
  const [turn, setTurn] = useState(true); // true => O, false => X
  const [winner, setWinner] = useState(null);

  function play(index) {
    if (board[index] !== "" || winner) return; // Prevent click on filled or ended cell

    const newBoard = [...board];
    newBoard[index] = turn ? "O" : "X";

    const win = isWinner(newBoard, turn ? "O" : "X");

    if (win) {
      setWinner(win);
    } else if (!newBoard.includes("")) {
      setWinner("Draw"); // No empty cell left, and no winner
    }

    setBoard(newBoard);
    setTurn(!turn);
  }

  function reset() {
    setTurn(true);
    setWinner(null);
    setBoard(Array(numberOfCards).fill(""));
  }

  return (
    <div className="grid-wrapper">
      {/* Show Winner or Draw message */}
      {winner && (
        <>
          <h1 className="turn-highlight">
            {winner === "Draw" ? "Match is Drawn!" : `Winner is ${winner}`}
          </h1>
          <button className="reset" onClick={reset}>Reset Game</button>
        </>
      )}

      {/* Show Current Turn only if game is not over */}
      {!winner && (
        <h1 className="turn-highlight">Current Turn: {turn ? "O" : "X"}</h1>
      )}

      {/* Grid rendering */}
      <div className="grid">
        {board.map((el, idx) => (
          <Card
            key={idx}
            player={el}
            index={idx}
            gameEnd={!!winner}
            onPlay={play}
          />
        ))}
      </div>
    </div>
  );
}

export default Grid;
