import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Input from '@mui/material/Input';
import { Button, Paper, Typography } from '@mui/material';

import bcrypt from 'bcryptjs';

function Login(props) {

    let navigate = useNavigate();

    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: '',
    });

    const authenticate = () => {
        
        const salt = bcrypt.genSaltSync();
        const encpass = bcrypt.hashSync(loginDetails.password, salt);
        
        const loginDetailsValues = Object.values(loginDetails);

        for (let value of loginDetailsValues) {
            if (!value) {
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
                    encpass,
                })
            })
                .then(response => response.json())
                .then(data => {
                    alert(data.msg);
                    if (data.isValidUser) {
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
        catch (err) {
            console.log(err);
        }

    }

    return (
        <section id='main-section'>
            <div id="login-container">

                <Typography variant="h1" component="h3">
                    LOGIN
                </Typography>
                <form>
                    <div id='login-inputs'>
                        <Paper elevation={3} />
                        <Input
                            placeholder='Email'
                            defaultValue=""
                            type='email'
                            onChange={(e) => {
                                setLoginDetails(prevLoginDetails => {
                                    return {
                                        ...prevLoginDetails, email: e.target.value
                                    }
                                })
                            }
                            } />

                        <Input
                            placeholder="Password"
                            defaultValue=""
                            type='password'
                            onChange={(e) => {
                                setLoginDetails(prevLoginDetails => {
                                    return {
                                        ...prevLoginDetails, password: e.target.value
                                    }
                                })
                            }
                            } />

                    </div>

                    <div className="login-button-div">

                        <Button variant="contained"
                            size="medium"
                            onClick={authenticate}
                        >
                            SIGN IN
                        </Button>
                    </div>
                </form>

                <div id="dont-have-an-account">
                <Typography variant="h3" component="h4">
                    Don't have an account ?
                </Typography>
                    <Link to="/signup">
                        <Button
                            variant="contained"
                            size="medium">
                            SIGN UP
                        </Button>
                    </Link>
                </div>
            </div>
        </section >
    )
}

export default Login;