
import Square from './Square'

function Board(props) {

    const rows = 3
    const columns = 3

    
    function build_grid(){

      const grid = []
      let row_squares = []

      for( let y = 0; y < rows; y++){
        for(let x = 0; x < columns; x++){
          
          let board_index =  (rows * y) + x
          
          let square = <Square value={props.squares[board_index]} 
                               handleClick={ ()=> props.handleClick(board_index)}
                               key={board_index} 
          />
          
          row_squares.push(square)
        }
        
        let row_div = (
          <div className='board-row' key={y}>
            {row_squares}
        </div>
        )
        
        grid.push(row_div)
        row_squares = []
      }
      
      return grid
    }
      
    const grid = build_grid()
    
    return (
        <div>
          

          <div className="status">{props.status}</div>
  
          {grid}
         
        </div>
      );
    
}

export default Board;
  