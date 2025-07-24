import { useState, useRef } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { Link } from "react-router-dom";
import "../styles/Chessgame.css"


function Chessgame() {
  const gameRef = useRef(new Chess());
  const [fen, setFen] = useState(gameRef.current.fen());
  const [history, setHistory] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [moveSquares, setMoveSquares] = useState({});

  // Handle moves from user
  const makeMove = (sourceSquare, targetSquare) => {
    const game = gameRef.current;

    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion:
        game.get(sourceSquare)?.type === "p" &&
        (targetSquare[1] === "8" || targetSquare[1] === "1")
          ? "q"
          : undefined,
    });

    if (!move) return false;

    setFen(game.fen());
    setHistory(game.history({ verbose: true }));
    setMoveSquares({});
    checkGameOver();
    return true;
  };

  // Highlight legal moves
  const onMouseOverSquare = (square) => {
    const game = gameRef.current;
    const moves = game.moves({ square, verbose: true });
    if (moves.length === 0) return;

    const squaresToHighlight = {};
    moves.forEach((move) => {
      squaresToHighlight[move.to] = {
        background: "radial-gradient(circle, #90ee90 40%, transparent 50%)",
        borderRadius: "50%",
      };
    });

    setMoveSquares(squaresToHighlight);
  };

  const onMouseOutSquare = () => {
    setMoveSquares({});
  };

  // Check for game end conditions
  const checkGameOver = () => {
    const game = gameRef.current;
    if (game.isGameOver()) {
      setGameOver(true);

      if (game.isCheckmate()) {
        const winnerColor = game.turn() === "w" ? "Black" : "White";
        setWinner(`${winnerColor} wins by checkmate`);
      } else if (game.isDraw()) {
        setWinner("Draw");
      } else {
        setWinner("Game over");
      }
    }
  };

  const handleRestart =() =>{
    const game = new Chess();
    gameRef.current = game;
    setFen(game.fen());
    setHistory([]);
    setGameOver(false);
    setWinner("");
    setMoveSquares({}); 
  };

  return (
    <div className="app-container">
  <h2>Chess Game</h2>

  <div className="chessboard-container">
    <Chessboard
      position={fen}
      onPieceDrop={(sourceSquare, targetSquare) =>
        gameOver ? false : makeMove(sourceSquare, targetSquare)
      }
      boardWidth={500}
      customSquareStyles={moveSquares}
      onMouseOverSquare={onMouseOverSquare}
      onMouseOutSquare={onMouseOutSquare}
    />
  </div>

  {gameOver && (
    <div className="winner-message">
      <h3>{winner}</h3>
    </div>
  )}

  <div className="button-container">
  <button className="restart-button" onClick={handleRestart}>Restart</button>
  <Link to="/bot" className="restart-button link-button">Play with Bot</Link>
</div>

</div>

    
  );
}
export default Chessgame;
