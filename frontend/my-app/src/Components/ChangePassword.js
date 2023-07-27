import React, { useState } from "react";
import axios from 'axios';
import { useParams,useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const { token } = useParams();
    const [pass, setPass] = useState("");
    const navigate = useNavigate();
    // console.log(token)
    // const oldUser = async () => {
    //     try {
    //         const user = await axios.get(`http://localhost:8010/user/${token}`)
    //         // console.log(user.data.exisitingUser)
    //         const oldUser = await user.data;
    //         return oldUser.exisitingUser
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // console.log(oldUser());
    // const user =  oldUser();
    // console.log(user)
    const updatePassword = async () => {
        try {
            const newPassword = await axios.put(`http://localhost:8010/user/changepassword/${token}/${pass}`)
            console.log(newPassword)
            navigate(`/loginpage`)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="card  width1">
                <div className="card-header bg-success p-4">
                    <h3 className="mb-0 text-light text-center">Change Password</h3>
                </div>
                <div className="card-body">
                    <div className="form-group mb-3">
                        <label className="form-label mb-2">New Password</label>
                        <input className="form-control mb-2" type="password" id="inputpasswordNew" onChange={(e) => { setPass(e.target.value) }} />
                    </div>
                    {/* <div className="form-group mb-3">
                        <label className="form-label mb-2">Verify New Password</label>
                        <input className="form-control mb-2" type="password" id="inputpasswordNewVerify" />
                    </div> */}
                    <div className="form-group text-center my-3">
                        <button type="submit" className="btn btn-success w-100" onClick={() => {updatePassword() }}>Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword;