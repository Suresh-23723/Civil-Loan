import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './UpdateLoan.css';
const UpdateLoan = () => {
  
    const navigate = useNavigate();
    const [message,setMessage] = useState("");

    function update(e) {
        e.preventDefault();
        const mobile = document.querySelector('#mobile').value || "";
        const amount = document.querySelector('#amount').value || "";
        const duration = document.querySelector('input[name="duration"]:checked').value || "";
        const service = document.querySelector('input[name="serviceType"]:checked').value || "";
        const description = document.querySelector('#description').value || "";

        const obj = {
            mobile,
            amount,
            msg: description,
            code: service,
            duration
        }

        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(obj)
        };

        fetch("http://localhost:8000/request/update", requestOptions)
            .then(res => res.json())
            .then(data => setMessage(data.message));
    }
    return (
      <div>
      <div className="header">
        <div className="head">Update Loan Details</div>
        <button class="btn btn-primary" id="home" onClick = {()=> navigate("/")}>Home</button>
      </div>

      <div class="myForm">
      <form >
          <div class="form-group row">
              <label for="Mobile" class="col-sm-2 col-form-label">Mobile</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="mobile" placeholder="Enter the mobile number"/>
              </div>
          </div>
          <div class="form-group row">
              <label for="Amount" class="col-sm-2 col-form-label">Amount</label>
              <div class="col-sm-10">
                <input type="number" class="form-control" id="amount" placeholder="Enter the amount"/>
              </div>
          </div>
          <fieldset class="form-group">
              <div class="row">
              <legend class="col-form-label col-sm-2 pt-0">Duration</legend>
              <div class="col-sm-10">
                  <div class="form-check">
                  <input class="form-check-input" type="radio" name="duration" id="d12" value="12" />
                  <label class="form-check-label" for="duration12">
                      12 Months
                  </label>
                  </div>
                  <div class="form-check">
                  <input class="form-check-input" type="radio" name="duration" id="d18" value="18" />
                  <label class="form-check-label" for="duration18">
                      18 Months
                  </label>
                  </div>
                  <div class="form-check">
                  <input class="form-check-input" type="radio" name="duration" id="d24" value="24" />
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
                  <input class="form-check-input" type="radio" name="serviceType" id="SCB" value="SCB"/>
                  <label class="form-check-label" for="SSBL">
                      Small Scale Business Loan
                  </label>
                  </div>
                  <div class="form-check">
                  <input class="form-check-input" type="radio" name="serviceType" id="MF" value="MF"/>
                  <label class="form-check-label" for="MF">
                      Micro-finance Loan
                  </label>
                  </div>
              </div>
              </div>
          </fieldset>
          <div class="form-group row">
              <label for="Description" class="col-sm-2 col-form-label">Description</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="description" placeholder="Enter the Description"/>
              </div>
          </div>
          <div class="form row">
              <div class="col text-center">
                  <button class="btn btn-primary" id="Update" onClick={update}>Update</button>
              </div>
          </div>
          <div class="alert" role="alert">
              {message}
          </div>
      </form>
      </div>
      </div>
    );
}

export default UpdateLoan;