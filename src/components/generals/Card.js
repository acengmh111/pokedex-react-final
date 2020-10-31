import React from 'react';
function Card(props) {
    const capital = {
        textTransform: 'capitalize'
    }
    return (
        <div style={capital} key={props.card_key}>
            <img src={props.image} alt="pokomon"></img>
            {
                props.list ? 
                (
                    <>
                    <h2 className="gray1"> {props.name} </h2>
                    <p className="gray3">( {props.real_name == "" ? "-" : props.real_name} )</p>
                    <p className="gray2">{props.type}</p>
                    <button className="catch_poke" onClick={props.release}>Release</button>
                    </>
                )
                :
                (
                    <>
                    <h2 className="gray1"> {props.name} </h2>
                    <p className="gray2">{props.type}</p>
                    <button className="catch_poke">{props.owned} Owned</button>
                    </>
                )
            }
        </div>
    );
}

export default Card;