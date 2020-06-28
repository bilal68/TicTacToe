import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";

export default function (props) {

  const [games, setGames] = useState([]);
  const [getGames, setGamesAfterDelete] =useState(false);

  useEffect(() => {
    axios.get('/api/v1/games')
      .then((res) => setGames(res.data||[]))
      .catch((err)=>{console.log(err);
      })
  }, [getGames]);

  const onNewGame = () => {
    fetch('/api/v1/games', {
      method: "POST"
    })
      .then(res => res.json())
      .then((data) => {
        console.log(props);
        props.history.push(data.location);
      })
  }

  const onDelete = (id)=>{
   console.log(id);
   
    axios.delete(`/api/v1/games/${id}`, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
    }).then( res => {
          setGamesAfterDelete(!getGames)
      
      })
      .catch((err) => {
console.log(err);
      })
        
  }
  return (
    <div>
      <button onClick={onNewGame}>New Game</button>
      {/* <button onClick={()=>{onDelete(12)}}>Delete</button> */}
      <table>
        <thead>
          <th>Status</th>
          <th>Board</th>
          <th>Action</th>
        </thead>
        <tbody>
          {games.map(game => (
            <tr>
              {console.log(game.id)}
              <td>{game.status}</td>
              <td>{game.board}</td>
              {game.status === 'RUNNING' && <td><Link to={"/games/" + game.id} >Go to game</Link></td>}
              <td><button onClick={()=>{onDelete(game.id)}}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};