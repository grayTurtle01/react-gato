import {useState} from 'react'

import Board from './Board'

function Game(props){

    // Initial state
    const [history, setHistory] = useState( [ { 
                                                squares: Array(9).fill(null),
                                                indexs: []
                                              } ] )

    const [xIsNext, tooglePlayer] = useState(true)
    const [moveNumber, setMove] = useState(0)
    const [isAscendig, toggleOrder] = useState(true)


    ///// Functions 
    function handleClick(i){


      const current_history = history.slice(0, moveNumber + 1)
      const current = current_history[ current_history.length - 1 ]
  
      // make copyes of the arrays
      const squares = current.squares.slice()
      const indexs = current.indexs.slice()
      
  
      // Ignoring clicks for filled squares
      if( squares[i] != null ){
        return;
      }
  
      // Block the board if there is a winner
      if( calculateWinner(squares) ){
        return; 
      }
  
      // Fill empty square
      squares[i] = xIsNext? 'X' : 'O'

      // Save the square index
      indexs.push(i)

  
      // Update histoy
      const updated_history = current_history.concat( [
                                                         {squares: squares,
                                                          indexs: indexs}
                                                      ])

      setHistory(updated_history )

      // Toogle Player
      tooglePlayer( !xIsNext )

      // Update moveNumber
      setMove( current_history.length)
  
    }
  
    function jumpTo(move){

      // update moveNumber
      setMove( move )

      // Check which is the next player
      tooglePlayer( (move % 2) === 0 ) 


    }
  
    function handleToggle(){
      toggleOrder( !isAscendig )
    }

    //// Variables
    const current = history[moveNumber]

    let status;

    let winner = calculateWinner(current.squares)

    if ( winner ){
        status = "The winner is: " + winner
    }
    else{
        status = 'Next player: ' + (xIsNext? 'X' : 'O');
    }

    //  Buttons messages
    const moves = history.map( (step, move) => {

          let board_index = step.indexs[move-1]
          let [x,y] = boardIndex_to_coords(board_index)

          let description = (move === 0 ? 'Go to game start':
                                          `Go to move  ${move}  |  ( ${x},${y} )` )
            return( 
                <li key={move}>
                    <button onClick={ ()=> jumpTo(move) }
                            style={ {color:  move==moveNumber? 'blue' : 'black'} }>
                        {description}
                    </button>
                </li>
            )
    })

    // Select button order
    if( isAscendig === false)
       moves.reverse()

  
    // Return Component
    return (
         <div className="game">

            <div className="game-board">
                <Board squares={current.squares}
                        handleClick={ handleClick } />
            </div>

            <div className="game-info">
                <div>{ status }</div>

                <button onClick={ handleToggle }>
                  { isAscendig ? 'Ascending': 'Descending'}
                </button>

                <ol>{ moves }</ol>
            </div>


        </div>
    );
    
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

function boardIndex_to_coords(boardIndex){
  const rows = 3
  const columns = 3
  

  let x = boardIndex % columns
  let y = parseInt(boardIndex / rows)

  x++
  y++

  return [x,y]

}