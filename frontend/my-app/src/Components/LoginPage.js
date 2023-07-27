import { React } from 'react';

const LoginPage = () => {

    return (
        <>
            <div className='card width1'>
                <div className='card-header p-3 text-center bg-warning'>
                    <p className='h3 fw-bold'>Login here!</p>
                </div>
                <div className='card-body mt-2'>
                    <div className='form-group mb-3'>
                        <label className='form-label fs-5 fw-bold'>Email</label>
                        <input className='form-control' type='email' placeholder='email'/>
                    </div>
                    <div className='form-group mb-3'>
                        <label className='form-label fs-5 fw-bold '>Password</label>
                        <input className='form-control' type='password' placeholder='password'/>
                    </div>
                    <div className='form-group mt-5'>
                        <button className='btn btn-info w-100'>login</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LoginPage;