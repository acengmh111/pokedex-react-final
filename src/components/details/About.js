import React from 'react';
import heart from '../../assets/images/Heart.svg';
const About = (props) => {
    return (
        <div id={props.dataId} className="active">
            <table>
                <tbody>
                    <tr>
                        <td><strong>Weight</strong></td>
                        <td>:</td>
                        <td>{props.weight} kgs</td>
                    </tr>
                    <tr>
                        <td><strong>Height</strong></td>
                        <td>:</td>
                        <td>{props.height} m</td>
                    </tr>
                    <tr>
                        <td><strong>Base XP</strong></td>
                        <td>:</td>
                        <td style={{display: 'flex', alignItems: 'center'}}>
                            <img style={{marginRight: '10px'}} src={heart} alt="heart"/> {props.base_xp} 
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default About;