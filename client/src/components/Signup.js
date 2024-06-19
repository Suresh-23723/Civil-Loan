import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import './Signup.css';

const printErr = (err) => {
    var ans = 'You have error in ';
    if(err.name) {
        ans += 'name, ';
    }
    if(err.mobile) {
        ans += 'mobile, ';
    }
    if(err.email) {
        ans += 'email, ';
    }
    if(err.occupation) {
        ans += 'occupation, ';
    }
    if(err.password) {
        ans += 'password, ';
    }
    if(err.cpassword) {
        ans += 'confirm password, ';
    }

    if(ans === 'You have error in ') {
        return '';
    }
    return ans.substr(0,ans.length-2);
}
const validate = values => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Required';
    } else if (values.name.length > 15) {
      errors.name = 'Must be 15 characters or less';
    }
  
    if (!values.mobile) {
      errors.mobile = 'Required';
    } else if (values.mobile.length !== 10) {
      errors.mobile = 'Must be 10 characters';
    }
  
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    
    if (!values.occupation) {
        errors.occupation = 'Required';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (!/^(?=.*[!@#$%^&*])(?=.*[0-9]).{8,20}$/i.test(values.password)) {
    errors.password = 'Password does not match the criteria';
    }

    if (!values.cpassword) {
        errors.cpassword = 'Required';
    } else if (!(values.password === values.cpassword)) {
    errors.cpassword = 'Password does not match';
    }
    return errors;
  };
const Signup = () => {

    const [modalTitle,setModalTitle] = useState("");
    const [modalBody,setModalBody] = useState("");

    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: '',
            mobile: '',
            email: '',
            occupation: '',
            password: '',
            cpassword: '',
        },validate,
    });
    const handleClick = (e) => {
        e.preventDefault();
        setModalTitle("");
        setModalBody("");
        var errStr = printErr(formik.errors);
        if(errStr !== '') {
            setModalTitle('Error');
            setModalBody(printErr(formik.errors));
        } else {
            const nvalue = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formik.values.name,
                    mobile: formik.values.mobile,
                    email: formik.values.email,
                    occupation: formik.values.occupation,
                    password: formik.values.password
                }),
            }

            fetch(`http://localhost:8000/member/new`,nvalue)
            .then(res => res.json())
            .then(data => {
                setModalTitle(data.status);
                setModalBody(data.message);
            });
        }
        
    }
    return(
        <div>
            <div class="top">
                <div class="mr-auto display-4">Sign-up</div>
                <button class="btn btn-primary" id="home" onClick = {()=> navigate("/")}>Home</button>
            </div>
            <div class="signupForm">
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="Name" class="col-sm-2 col-form-label">Name</label>
                            <input type="text" class="form-control" id="name" name="name" 
                            placeholder="Enter your name" onChange={formik.handleChange}  value={formik.values.name}/>
                            {formik.errors.name ? <div>{formik.errors.name}</div> : null}
                        </div>
                        <div class="form-group col-md-6">
                            <label for="Mobile" class="col-sm-2 col-form-label">Mobile</label>
                            <input type="text" class="form-control" id="mobile" name="mobile" 
                            placeholder="Enter your mobile number" onChange={formik.handleChange} value={formik.values.mobile}/>
                            {formik.errors.mobile ? <div>{formik.errors.mobile}</div> : null}
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="Email" class="col-sm-2 col-form-label">Email</label>
                            <input type="email" class="form-control" id="email" name="email" 
                            placeholder="Enter your email address" onChange={formik.handleChange} value={formik.values.email}/>
                            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        </div>
                        <div class="form-group col-md-6">
                            <label for="Occupation" class="col-sm-2 col-form-label">Occupation</label>
                            <input type="text" class="form-control" id="occupation" name="occupation" 
                            placeholder="Enter your occupation" onChange={formik.handleChange} value={formik.values.occupation}/>
                            {formik.errors.occupation ? <div>{formik.errors.occupation}</div> : null}
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="password" >Password</label>
                            <input type="password" class="form-control" id="password" name="password" 
                            placeholder="Enter your new Password" onChange={formik.handleChange} value={formik.values.password}/>
                            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        </div>
                        <div class="form-group col-md-6">
                            <label for="Mobile">Confirm Password</label>
                            <input type="password" class="form-control" id="cpassword" name="cpassword"
                             placeholder="Enter your password again" onChange={formik.handleChange} value={formik.values.cpassword}/> 
                             {formik.errors.cpassword ? <div>{formik.errors.cpassword}</div> : null}
                        </div>
                        <small id="passwordHelpBlock" class="form-text text-muted">
                            Your password must be 8-20 characters long, contain atleast one digit and one special character
                        </small>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-10">
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onClick={handleClick}>Sign up</button>
                        </div>
                    </div>
                </form>
            </div>
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
    );
}

export default Signup;