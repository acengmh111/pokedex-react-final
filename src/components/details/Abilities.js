import React from 'react';

const Abilities = (props) => {
    let row_abilities
    
    if(props.abilities != null){
        row_abilities = props.abilities.map((data, i) => (
            <tr key={i}>
                <td></td>
                <td>{data.ability.name}</td>
                <td>{data.slot}</td>
            </tr>
        ))
    }
    
    return (
        <div id={props.dataId}>
            <table>
                <tbody>
                    <tr>
                        <td><strong>Name & Slot</strong></td>
                        <td></td>
                        <td></td>
                    </tr>
                    {
                        row_abilities
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Abilities;