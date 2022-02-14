
function Square({handleClick, value, winner_indices, board_index}){

    return (
      <button className="square"
              onClick={ handleClick }
              style={ { 'color': winner_indices.indexOf(board_index) !== -1?  'red': 'black'  } }
              >

        {value}

      </button>
    );
}

export default Square;