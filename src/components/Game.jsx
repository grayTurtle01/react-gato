import React from 'react'

import Board from './Board'

class Game extends React.Component {

    constructor(){
      super()
  
      this.state = {
        
        history : [  { squares: Array(9).fill(null) } ],
  
        xIsNext : true,
  
        moveNumber : 0
        
      }
  
    }
  
    handleClick = (i)=> {
      const history = this.state.history.slice(0, this.state.moveNumber + 1)
      const current = history[history.length - 1]
  
      const squares = current.squares.slice()
  
      // Ignoring clicks for clicked squares
      if( squares[i] != null ){
        return;
      }
  
      // Block the board if there is a winner
      if( calculateWinner(squares) ){
        return; 
      }
  
      squares[i] = this.state.xIsNext? 'X' : 'O'
  
      this.setState({
        history: history.concat([ {squares: squares} ]),
        xIsNext : !this.state.xIsNext,
        moveNumber : history.length
  
      })
  
    }
  
    jumpTo = (move)=>{
      this.setState({
        moveNumber : move,
        xIsNext: (move % 2) === 0
      })
    }
  
  
    render() {
      const history = this.state.history
      const current = history[this.state.moveNumber]
  
      let status;
  
      let winner = calculateWinner(current.squares)
  
      if ( winner ){
        status = "The winner is: " + winner
      }
      else{
        status = 'Next player: ' + (this.state.xIsNext? 'X' : 'O');
      }
  
      const moves = history.map( (step, move) => {
  
        let description = move === 0 ? 'Go to game start':
                                      'Go to move ' + move 
        return( 
          <li key={move}>
            <button onClick={ ()=> this.jumpTo(move) }>
                {description}
            </button>
          </li>
        )
      })
  
  
      return (
        <div className="game">
  
          <div className="game-board">
            <Board squares={current.squares}
                   handleClick={ this.handleClick } />
          </div>
  
          <div className="game-info">
            <div>{ status }</div>
            <ol>{ moves }</ol>
          </div>
  
  
        </div>
      );
    }
}
  
export default Game;  

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}