
function Square(props){
  // Destructuring the props
   const {handleClick, value, winner_indices, board_index} = props 

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