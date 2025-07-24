import { useState, useRef } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import "../styles/Bot.css";

function Bot() {
  const gameRef = useRef(new Chess());
  const [fen, setFen] = useState(gameRef.current.fen());
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");

  
  const pieceValues = {
    p: 1,
    n: 3,
    b: 3,
    r: 5,
    q: 9,
    k: 1000,
  };

  
  const makeBotMove = () => {
    const game = gameRef.current;
    if (game.isGameOver()) return;

    const possibleMoves = game.moves({ verbose: true });

    
    const captureMoves = possibleMoves.filter(move => move.captured);
    let move;

    if (captureMoves.length > 0) {
      
      move = captureMoves.reduce((best, current) =>
        pieceValues[current.captured] > pieceValues[best.captured] ? current : best
      );
    } else {
      
      move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    }

    game.move(move);
    setFen(game.fen());
    checkGameOver();
  };

  const makeMove = (source, target) => {
    const game = gameRef.current;
    const move = game.move({
      from: source,
      to: target,
      promotion: "q",
    });

    if (!move) return false;

    setFen(game.fen());
    checkGameOver();

    setTimeout(() => {
      if (!game.isGameOver()) makeBotMove();
    }, 500); 

    return true;
  };

  const checkGameOver = () => {
    const game = gameRef.current;
    if (game.isGameOver()) {
      setGameOver(true);
      if (game.isCheckmate()) {
        const winnerColor = game.turn() === "w" ? "Black" : "White";
        setWinner(`${winnerColor} wins by checkmate`);
      } else {
        setWinner("Draw");
      }
    }
  };

  const handleRestart = () => {
    const newGame = new Chess();
    gameRef.current = newGame;
    setFen(newGame.fen());
    setGameOver(false);
    setWinner("");
  };

  return (
    <div className="bot-page">
    <h2>Player vs Bot</h2>
  
    <div className="chessboard-wrapper">
      <Chessboard
        position={fen}
        onPieceDrop={(s, t) => !gameOver && makeMove(s, t)}
        boardWidth={480}
      />
    </div>
  
    {gameOver && <h3 className="boat-board">{winner}</h3>}
  
    <button className="bot-controls button" onClick={handleRestart}>
      Restart Game
    </button>
  </div>
  
  );
}

export default Bot;
