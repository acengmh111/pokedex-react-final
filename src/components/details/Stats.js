import React from 'react';

const Stats = (props) => {
    let stats
    if(props.stats != null){
        stats = props.stats.map((data, i) => (
            <div key={i}>
                <p>{data.stat.name}</p>
                <div>
                    <span>Base Stat : <span>{data.base_stat}</span></span>
                    <span>Effort : <span>{data.effort}</span></span>
                </div>
            </div>
        ))
    }
    return (
        <div id={props.dataId}>
            <div className="stats_wrapper">
                {
                    stats
                }
            </div>
        </div>
    );
}

export default Stats;