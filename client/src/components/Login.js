import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import './Login.css';

const printErr = (err) => {
    var ans = 'You have error in ';

    if(err.mobile) {
        ans += 'mobile, ';
    }

    if(err.password) {
        ans += 'password, ';
    }

    if(ans === 'You have error in ') {
        return '';
    }
    return ans.substr(0,ans.length-2);
}

const validate = values => {
    const errors = {};
  
    if (values.mobile.length === 0) {
        errors.mobile = 'Required';
      } else if (values.mobile.length !== 10) {
        errors.mobile = 'Must be 10 characters';
      }

    if (values.password.length === 0) {
        errors.password = 'Required';
    }
    return errors;
  };

const Login = () => {
    
    const [message,setMessage] = useState("");
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            mobile : '',
            password: '',
        },validate,
    });

    const handleClick = (e) => {
        e.preventDefault();
        
        var errStr = printErr(formik.errors);
        if(errStr !== '') {
            setMessage(errStr);
        } else {
            const nvalue = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mobile: formik.values.mobile,
                    password: formik.values.password
                }),
            }
            fetch(`http://localhost:8000/member/login`,nvalue)
            .then((res) => res.json())
            .then((data) => {
                if(data.status === 'success') {
                    navigate("/landing", {state: data.user});
                } else {
                    setMessage(data.message);
                }
            })
        }
    }

    return(
        <div>
            <div class="top">
                <div class="mr-auto display-4">Login</div>
                <button class="btn btn-primary" id="home" onClick = {()=> navigate("/")}>Home</button>
            </div>
            <div class="LoginForm">
                <form>
                    
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="Mobile" class="col-sm-2 col-form-label">Mobile</label>
                            <input type="text" class="form-control" id="mobile" name="mobile" 
                            placeholder="Enter your mobile number" onChange={formik.handleChange} value={formik.values.mobile}/>
                            {formik.errors.mobile ? <div>{formik.errors.mobile}</div> : null}
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="password" >Password</label>
                            <input type="password" class="form-control" id="password" name="password" 
                            placeholder="Enter your new Password" onChange={formik.handleChange} value={formik.values.password}/>
                            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-10">
                            <button type="button" class="btn btn-primary" onClick={handleClick}>Login</button>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-12">
                            <p>{message}</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>    
    );
}

export default Login;
