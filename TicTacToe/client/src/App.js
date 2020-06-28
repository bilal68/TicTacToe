import React from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import GameList from './GamesList';
import Game from './TicTac';

export default function() {
  return (<
        Router >
    <
        div >
      <
        Switch >
        <
          Route exact path="/"
          component={GameList}
        /> <
          Route path="/games/:id"
          component={Game}
        /> <
          Route path="/delete/games/:id"
          component={GameList}
        /> <
          Route path="*"
          component={GameList}
        /> <
        /Switch> <
        /div> <
        /Router>
    );
}