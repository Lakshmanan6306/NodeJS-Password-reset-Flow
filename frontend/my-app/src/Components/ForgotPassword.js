import React, { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const getUser = async () => {

        // console.log(email)
        try {
            const response = await axios.get(`http://localhost:8010/user/forgotpassword/${email}`);
            toast();
            console.log(response.data);

        } catch (error) {
            console.log(error)
            toast();
        }
    }

    return (
        <>
            <div>
                <div className="card text-center width1">
                    <div className="card-header bg-primary text-light h5">Password reset</div>
                    <div className="card-body px-5">
                        <p className="card-text py-2">
                            Enter your email address and we'll send you an email with instructions to reset your password.
                        </p>
                        <div className="form">
                            <input type="email" className="form-control my-3" id="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                            <button className="btn btn-primary w-100" onClick={() => { getUser() }}>Reset Password</button>
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                            <a className="btn text-primary" href="#">Login</a>
                            <a className="btn text-primary" href="#">Register</a>
                        </div>
                    </div>
                </div>
                <ToastContainer/>
            </div>
        </>
    )
}

export default ForgotPassword;