import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import './EMI.css';
const EMI = () => {
    let navigate = useNavigate();
    const [amount,setAmount] = useState(0);
    const [duration,setDuration] = useState(0);
    const [serviceType,setServiceType] = useState("");
    const [ans,setAns] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const value = {
            amount: amount,
            duration: duration,
        }
        const nvalue = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value),
        };

        fetch(`http://localhost:8000/service/${serviceType}/calculate`, nvalue)
        .then(res => res.json())
        .then(data => {
            if(data.status === 'success') {
                setAns('EMI for the amount and the duration is ₹ '+data.EMI);
            } else{
                setAns(data.message);
            }
        });
    }
    return (
        <div class="myEMI">
            <div class="top">
                <div class="mr-auto display-4">EMI Calculator</div>
                <button class="btn btn-primary" id="home" onClick = {()=> navigate("/")}>Home</button>
            </div>
            <div class="myForm">
                <form onSubmit={handleSubmit}>
                    <div class="form-group row">
                        <label for="Amount" class="col-sm-2 col-form-label">Amount</label>
                        <div class="col-sm-10">
                        <input type="number" class="form-control" id="amount" onChange={e => setAmount(e.target.value)} placeholder="Enter the amount"/>
                        </div>
                    </div>
                    <fieldset class="form-group">
                        <div class="row">
                        <legend class="col-form-label col-sm-2 pt-0">Duration</legend>
                        <div class="col-sm-10">
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="duration" id="d12" value="12" onChange={e => setDuration(e.target.value)}/>
                            <label class="form-check-label" for="duration12">
                                12 Months
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="duration" id="d18" value="18" onChange={e => setDuration(e.target.value)}/>
                            <label class="form-check-label" for="duration18">
                                18 Months
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="duration" id="d24" value="24" onChange={e => setDuration(e.target.value)}/>
                            <label class="form-check-label" for="duration24">
                                24 Months
                            </label>
                            </div>
                        </div>
                        </div>
                    </fieldset>
                    <fieldset class="form-group">
                        <div class="row">
                        <legend class="col-form-label col-sm-2 pt-0">Service</legend>
                        <div class="col-sm-10">
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="serviceType" id="SCB" value="SCB" onChange={e => setServiceType(e.target.value)}/>
                            <label class="form-check-label" for="duration12">
                                Small Scale Business Loan
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="serviceType" id="MF" value="MF" onChange={e => setServiceType(e.target.value)}/>
                            <label class="form-check-label" for="duration18">
                                Micro-finance Loan
                            </label>
                            </div>
                        </div>
                        </div>
                    </fieldset>
                    <div class="form row">
                        <div class="col text-center">
                            <button type="submit" class="btn btn-primary" id="getEMI">Get EMI</button>
                        </div>
                    </div>
                    <div class="alert" role="alert">
                        {ans}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EMI;