import React, { useState, useEffect } from "react";
import "./TicTac.css";
import { Link } from "react-router-dom";

function Square({ value, disabled = false, onClick }) {

  return (
    <button className="square" onClick={onClick} disabled={disabled}>
      {value}
    </button>
  );
}

export default function Game(props) {
  const [ squares, setSquares ] = useState(Array(9).fill(null));
  const [ status, setStatus ] = useState('RUNNING');
  const [ loading, setLoading ] = useState(false);
  
  const symbol = "X";

  useEffect(() => {
    fetch('/api/v1/games/' + props.match.params.id)
      .then(res => {
        if(res.ok) {
          return res.json();
        } else {
          return Promise.reject(res);
        }
      })
      .then((data) => setSquares(data.board))
      .catch((res) => {
        console.log(res.statusText);
        if(res.statusText === "Not Found")
            props.history.push('/games');
      })
  }, []);

  const onClick = (i) => () => {
    if(squares[i]){
      return;
    }
    setLoading(true);
    const nextSquares = squares.slice();
    nextSquares[i] = symbol;

    fetch('/api/v1/games/' + props.match.params.id, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        board: nextSquares,
        index: i
      })
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        } else {
          return Promise.reject(res);
        }
      })
      .then((data) => {
        setSquares(data.board);
        setStatus(data.status);
        setLoading(false);
      })
      .catch((res) => {
        setLoading(false);
        res.json().then(console.log);
      })
      
  }

  function renderSquare(i) {
    return (
      <Square
        disabled={status !== 'RUNNING' || loading}
        value={squares[i]}
        onClick={onClick(i)}
      />
    );
  }


  return (
    <div className="container">
      <div className="game">
        <div className="game-board">
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
        <div className="game-info">{status !== 'RUNNING' ? status : ''}</div>
        <Link to="/">Go to games list</Link>
      </div>
    </div>
  );
}
