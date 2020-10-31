import React from 'react';
import '../../assets/css/General.css';
import FailImage from '../../assets/images/pikachu.svg';
const ModalFire = React.forwardRef((props, ref) => {
    return (
        <div className="modal__fire">
            <div className="modal__dialog">
                <div className="modal__header">
                        {props.status == "success" ?
                        (
                            <h4 style={{color: '#6AB976', fontFamily: 'DMRegular'}}>Congratulations</h4> 
                        )
                        :
                        (
                            <h4 style={{color: '#333', fontFamily: 'DMRegular'}}>Hey</h4> 
                        )
                        }           
                </div>
                <div className="modal__body" style={{textAlign: 'center'}}>
                    {
                        props.status === "success" ?
                        (
                           <>
                           <h4 style={{textAlign: 'left', color: '#333'}}>You've Catch {props.name}</h4>
                           <input placeholder="Enter Nickname" ref={ref}></input> 
                           </>
                        )
                        :
                        (
                            <>
                            <img src={FailImage} alt="image_failed"></img>
                            <h4 style={{color: '#EB5757'}}>Sorry, Better Luck Next Time</h4>
                            </>
                        )
                    }
                    
                </div>
                <div className="modal__footer">
                    {
                        props.status === "success" ?
                        (   
                            <>
                            <button className="btn-danger" onClick={props.cancel}>Cancel</button>
                            <button className="btn-success" onClick={props.go}>Save</button>
                            </>
                        )
                        :
                        (
                            <button className="btn-danger" onClick={props.cancel}>Close</button>
                        )
                    }
                </div>
            </div>
        </div>
    );
})

export default ModalFire;