import React from 'react';
import { useState } from 'react';
import './Loan.css';
import { useNavigate } from 'react-router-dom';


const Loan = ({data}) => {
    
    const navigate = useNavigate();
    const [modalTitle, setModalTitle] = useState("Warning");
    const [modalBody, setModalBody] = useState("Loan details will be deleted permanently !!!");
    const deleteLoan = (mobile, code) => {
        
        const value = {
            mobile: mobile,
            type: code
        }
        const nvalue = {
            method: 'DELETE',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(value)
        }

        fetch(`http://localhost:8000/request/delete`,nvalue)
            .then(res => res.json())
            .then(resData => {
                setModalBody(resData.message);
                setModalTitle(resData.status);
                data = data.filter((loan) => {
                    return !((loan.mobile === mobile && loan.code === code));
                })
            });
        
    }

    const updateLoan = () => {
        navigate("/updateloan");
    }
    return data.map(loan => {
        return (
            <div>
            <li>
                <div class="card bg-light mb-3">
                    <div class="card-header">{(loan.code === "MF")? "Micro-Finance Loan" : "Small Scale Industries Loan"}</div>
                        <div class="card-body">
                            <p class="amount-duration"><span id="amt">Amount: ₹ {loan.amt}</span>Duration : {loan.duration} months</p>
                            <p class="description">Description : {loan.msg}</p>
                            <button class="delete" data-toggle="modal" data-target="#exampleModalCenter" >Delete</button>
                            <button class="update" onClick={() => {updateLoan()}}>Update</button>
                        </div>
                </div>
            </li>
            <div class="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">{modalTitle}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            {modalBody}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => {
                                deleteLoan(loan.mobile,loan.code);
                                window.location.reload();
                            }}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        );
    });
}

export default Loan;