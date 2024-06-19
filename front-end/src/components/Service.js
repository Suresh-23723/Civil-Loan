import React from "react";
const Service = ({ isOpen, onClose, handleEMIClick,handleReqClick, service }) => {
    if (!isOpen) return null;
    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    background: "rgb(243, 212, 245)",
                    height: 475,
                    width: 450,
                    margin: "auto",
                    padding: "2%",
                    border: "2px solid #000",
                    borderRadius: "10px",
                    boxShadow: "2px solid black",
                }}
            >
                <h3>{service.type}</h3>
                <div class="lead">{service.description}</div>
                <br/>
                <div class="pair">
                    <p>Service code: {service.code}</p>
                </div>
                <div class="pair">
                    <p>Minimum Loan Amount: ₹{service.loanMin}</p>
                </div>
                <div class="pair">
                    <p>Maximum Loan Amount: ₹{service.loanMax}</p>
                </div>
                <div class="pair">
                    <p>Rate of interest: {service.rateOfEMI*100}%</p>
                </div>
                <button type="button" class="btn btn-primary btn-lg" onClick={handleEMIClick}>Calculate EMI</button>
                <button type="button" class="btn btn-primary btn-lg" onClick={handleReqClick}>Request Loan</button>

            </div>
        </div>
    );
};
 
export default Service;