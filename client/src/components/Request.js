import React from 'react';
import './Request.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {useFormik} from 'formik';
import loan from '../images/loan.png';

const printErr = (err) => {
    var ans = 'You have error in ';
    if(err.email) {
        ans += 'email, ';
    }
    if(err.mobile) {
        ans += 'mobile, ';
    }
    if(err.description) {
        ans += 'description, ';
    }
    if(err.amount) {
        ans += 'amount, ';
    }
    if(err.duration) {
        ans += 'duration, ';
    }
    if(err.serviceType) {
        ans += 'service type, ';
    }

    if(ans === 'You have error in ') {
        return '';
    }
    return ans.substr(0,ans.length-2);
}
const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    
    if (!values.mobile) {
      errors.mobile = 'Required';
    } else if (values.mobile.length !== 10) {
      errors.mobile = 'Must be 10 characters';
    }
  
    
    if (!values.description) {
        errors.description = 'Required';
    }

    if (!values.amount) {
        errors.amount = 'Required';
    } else if (parseInt(values.amount) > 500000 || values.amount < 0) {
        errors.amount = 'Amount value exceeds the boundary';
    }

    if (!values.duration) {
        errors.duration = 'Required';
    } else if (values.duration === '') {
        errors.duration = 'Select a valid duration';
    }

    if (!values.serviceType) {
        errors.serviceType = 'Required';
    } else if (values.serviceType !== 'SCB' && values.serviceType !== 'MF') {
        errors.serviceType = 'Not Valid';
    }

    if (!values.tc) {
        errors.tc = 'Required';
    }

    return errors;
  };
const Request = () => {

    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            mobile: '',
            description: '',
            amount: '',
            duration: '',
            serviceType: '',
            tc:''
        },
        validate,
    })
    const [modalTitle, setModalTitle] = useState("");
    const [modalBody, setModalBody] = useState("");
    const handleClick = (e) => {
        e.preventDefault();
        setModalTitle("");
        setModalBody("");
        var errMsg = printErr(formik.errors);
        if(Object.keys(formik.errors).length === 0) {
            const value = {
                mobile: formik.values.mobile,
                email: formik.values.email,
                amt: parseInt(formik.values.amount),
                duration: parseInt(formik.values.duration),
                msg: formik.values.description,
                code: formik.values.serviceType,
            }
            const nvalue = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value),
            }

            fetch(`http://localhost:8000/service/${formik.values.serviceType}/form`,nvalue)
            .then(res => res.json())
            .then(data => {
                setModalTitle(data.status);
                setModalBody(data.message);
            });
        } else {
            if(formik.errors.tc === 'Required')
                errMsg = 'Please check the Terms and Conditions'
            setModalTitle('Error');
            setModalBody(errMsg);
        }
    }
    return(
        <div class="reqDiv">
            <div class="top">
                <div class="mr-auto display-4">Loan Application Form</div>
                <button class="btn btn-primary" id="home" onClick = {()=> navigate("/")}>Home</button>
            </div>
            <div class = "body">
            <div class="reqForm">
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="Email">Email</label>
                            <input type="email" class="form-control" id="email" placeholder="Email" name="email" onChange = {formik.handleChange}/>
                            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        </div>
                        <div class="form-group col-md-6">
                            <label for="Mobile">Mobile</label>
                            <input type="text" class="form-control" id="mobile"  placeholder="Mobile Number" name = "mobile" onChange = {formik.handleChange}/>
                            {formik.errors.mobile ? <div>{formik.errors.mobile}</div> : null}
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="Description">Describe about the Business</label>
                        <input type="text" class="form-control" id="description" name="description" placeholder="Enter your description as a sentence" 
                        onChange = {formik.handleChange}/>
                        {formik.errors.description ? <div>{formik.errors.description}</div> : null}
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="amount">Amount</label>
                            <input type="text" class="form-control" id="amount" name="amount" placeholder="Enter the amount" onChange = {formik.handleChange}/>
                            {formik.errors.amount ? <div>{formik.errors.amount}</div> : null}
                        </div>
                        <div class="form-group col-md-4">
                            <label for="duration">Duration</label>
                            <select id="duration" class="form-control" value= {formik.values.duration} name="duration" onChange={formik.handleChange}>
                                <option value="12" >12 Months</option>
                                <option value="18">18 Months</option>
                                <option value="24">24 Months</option>
                            </select>
                            {formik.errors.duration ? <div>{formik.errors.duration}</div> : null}
                        </div>
                        <div class="form-group col-md-2">
                            <label for="serviceType">Service Code</label>
                            <input type="text" class="form-control" id="serviceType" name="serviceType" onChange = {formik.handleChange}/>
                            {formik.errors.serviceType ? <div>{formik.errors.serviceType}</div> : null}
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="tc" name="tc" value = {formik.values.tc} onChange = {formik.handleChange}/>
                            <label class="form-check-label" for="gridCheck">
                                Accept Terms & Conditions
                            </label>
                        </div>
                    </div>
                    <div class="form row">
                        <div class="col">
                            <button type="button" class="btn btn-primary" id="submit" data-toggle="modal" data-target="#exampleModalCenter" onClick={handleClick}>Submit Request</button>
                        </div>
                    </div>    
                </form>
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                                <button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <img src={loan} alt=".." width="30%" height="50%"class = "rounded" id="img1"/>
            </div>
        </div>
    );
}

export default Request;