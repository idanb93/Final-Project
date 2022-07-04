import { Link } from 'react-router-dom';
import {useState} from 'react';

import bcrypt from 'bcryptjs';

function Signup() {

    const [signupData, setSignupData] = useState({
        company_name: '',
        email: '',
        password: '',
    });
    const register = () => {

        const salt = bcrypt.genSaltSync();
        const encpass = bcrypt.hashSync(signupData.password, salt);

        const signupDataValues = Object.values(signupData);

        for(let value of signupDataValues) {
            if (!value){
                alert('Please fill all the details!');
                return;
            }
        }

        fetch(`/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify({
                company_name: signupData.company_name,
                email: signupData.email,
                encpass
            })
        })
        .then(response=>response.json())
        .then(data=>{
            alert(data.msg);
        })
        .catch(err=>{
            alert(err);
        })

    }

    return (

        <>
            <section id='main-section'>
                <div id="login-container">

                    <h2>Signup</h2>

                    <form>

                    <div id='signup-inputs-container'>
                        <input className='signup-input' type={'text'} placeholder={'Company Name'} onChange={(e=>{setSignupData(prevUser=>{ return {...prevUser, company_name: e.target.value}} )} )}/>
                        <input className='signup-input' type={'text'} placeholder={'Email'} onChange={(e=>{setSignupData(prevUser=>{ return {...prevUser, email: e.target.value}} )} )}/>
                        <input className='signup-input' type={'password'} placeholder={'Password'} onChange={(e=>{setSignupData(prevUser=>{ return {...prevUser, password: e.target.value}} )} )}/>
                        <input className='signup-input' type={'password'} placeholder={'Re-enter Password'} />
                    </div>

                    <div>
                        <Link className="navbar-brand text-white text-lg brand-text" to="/signup"> <button className='signup-input' type='submit' onClick={register}>SIGN UP</button> </Link>
                    </div>

                    </form>
                </div>
            </section>
        </>
    )
}

export default Signup;