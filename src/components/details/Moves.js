import React from 'react';

const Moves = (props) => {
    let moves
    if(props.moves != null){
        moves = props.moves.map((data, i) => (
            <div key={i}>{data.move.name}</div>
        ))
    }
    return (
        <div id={props.dataId}>
            <div className="moves_wrapper">
                {
                    moves
                }
            </div>
        </div>
    );
}

export default Moves;