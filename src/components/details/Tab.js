import React from 'react';

const Tab = React.forwardRef((props, ref) => {
    return (
        <div className={props.dataClass} ref={ref} id={props.dataId}>
            <button onClick={(e) => props.event(props.dataId, props.dataId)}>{props.title}</button>
            <span></span>
        </div>
    );
})

export default Tab;