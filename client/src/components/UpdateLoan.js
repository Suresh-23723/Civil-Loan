import React from 'react';
import { useNavigate } from "react-router-dom";
import './UpdateLoan.css';
const UpdateLoan = () => {
  
    const navigate = useNavigate();
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
                  <input class="form-check-input" type="radio" name="duration" id="d12" value="12" onChange={() => {}}/>
                  <label class="form-check-label" for="duration12">
                      12 Months
                  </label>
                  </div>
                  <div class="form-check">
                  <input class="form-check-input" type="radio" name="duration" id="d18" value="18" onChange={() => {}}/>
                  <label class="form-check-label" for="duration18">
                      18 Months
                  </label>
                  </div>
                  <div class="form-check">
                  <input class="form-check-input" type="radio" name="duration" id="d24" value="24" onChange={() => {}}/>
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
                  <input class="form-check-input" type="radio" name="serviceType" id="SCB" value="SCB" onChange={() => {}}/>
                  <label class="form-check-label" for="duration12">
                      Small Scale Business Loan
                  </label>
                  </div>
                  <div class="form-check">
                  <input class="form-check-input" type="radio" name="serviceType" id="MF" value="MF" onChange={() => {}}/>
                  <label class="form-check-label" for="duration18">
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
                  <button type="submit" class="btn btn-primary" id="Update">Update</button>
              </div>
          </div>
          <div class="alert" role="alert">
              {}
          </div>
      </form>
      </div>
      </div>
    );
}

export default UpdateLoan;