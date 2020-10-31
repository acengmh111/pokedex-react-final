import React from 'react';
import '../../assets/css/General.css';

function Modal(props) {
    return (
        <div className="modal">
            <div className="modal__dialog">
                
                {
                    props.list ?
                    (
                        <>
                        <div className="modal__header">
                            <h4 style={{textTransform: 'capitalize', color: '#EB5757'}}>Release pokemon ?</h4> 
                        </div>
                        <div className="modal__body">
                            <p>You sure want to <strong>Release</strong> your pokemon ?</p>
                        </div>
                        <div className="modal__footer">
                            <button className="btn-danger" onClick={props.cancel}>Cancel</button>
                            <button className="btn-success" onClick={props.go}>Yes</button>
                        </div>
                        </>
                    )
                    :
                    (
                        <>
                        <div className="modal__header">
                            <h4 style={{textTransform: 'capitalize'}}>Catch {props.name}</h4> 
                        </div>
                        <div className="modal__body">
                            You have 50% chance to got <span style={{textTransform: 'capitalize'}}>
                                {props.name}
                            </span>, you Wanna Catch It ?
                        </div>
                        <div className="modal__footer">
                            <button className="btn-danger" onClick={props.cancel}>Cancel</button>
                            <button className="btn-success" onClick={props.go}>Go</button>
                        </div>
                        </>
                    )

                }
                
            </div>
        </div>
    );
}

export default Modal;