import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login(props) {

    let navigate = useNavigate();

    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: '',
    });

    const authenticate = () => {

        const loginDetailsValues = Object.values(loginDetails);

        for(let value of loginDetailsValues) {
            if (!value){
                alert('Please fill all the details!');
                return;
            }
        }

        try {
            fetch('/signin', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: loginDetails.email,
                    password: loginDetails.password,
                })
            })
                .then(response => response.json())
                .then(data=>{
                    alert(data.msg);
                    if (data.isValidUser){
                        props.onLogin(true);
                        navigate('/scanners', { replace: true });
                    } else {
                        navigate('/', { replace: true });
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
        catch (err){
            console.log(err);
        }

    }

    return (
        <section id='main-section'>
            <div id="login-container">

                <h2>Login</h2>

                <form>
                    <div id='login-inputs'>
                        <input className='login-input' type={'text'} placeholder={'Email'} onChange={(e) => { setLoginDetails(prevLoginDetails => { return { ...prevLoginDetails, email: e.target.value } }) }} />
                        <input className='login-input' type={'password'} placeholder={'Password'} onChange={(e) => { setLoginDetails(prevLoginDetails => { return { ...prevLoginDetails, password: e.target.value } }) }} />
                    </div>

                    <div className="login-button-div">
                        <button className="login-input" type="button" onClick={authenticate}>LOG IN</button>
                    </div>
                </form>

                <div id="dont-have-an-account">
                    <b>Don't have an account? </b>
                    <Link className="navbar-brand text-white text-lg brand-text" to="/signup"> <button id="signup-button">SIGN UP</button> </Link>
                </div>
            </div>
        </section>
    )
}

export default Login;