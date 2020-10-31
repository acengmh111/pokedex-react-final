import React from 'react';
// import sprintf from 'sprintf-js';
var sprintf = require('sprintf-js').sprintf;

function Header(props) {
    const capital = {
        textTransform: 'capitalize'
    }
    const types = props.types.map((x,i) => 
        (<span key={i}>{x.type.name}</span>)
    )
    return (
        <div className="detail__header" style={capital}>
            <div className="head">
                <h1>{props.name}</h1>
                <p>#{sprintf('%03d', props.id)}</p>
            </div>
            <div className="body">
                {
                    types
                }
                {/* <span>Grass</span>
                <span>Poison</span> */}
                <p>Pokemon</p>
            </div>
        </div>
    );
}

export default Header;