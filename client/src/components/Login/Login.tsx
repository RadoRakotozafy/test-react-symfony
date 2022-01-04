import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export interface LoginProps {}

function Login({ }: LoginProps) {
    const [login, setlogin] = useState("");
    const [password, setpassword] = useState("");
    const [showLoginMessage, setshowLoginMessage] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleSubmit = () => {
        console.log('login');
        axios.post(`http://127.0.0.1:8001/api/login_check`, {
            username: login,
            password
        })
        .then(async (response) => {
            console.log(response.data);
            if(response.data.token){
                await localStorage.setItem("token", response.data.token);
                
                navigate(`/`, {
                    state: {
                        datetime: Date.now()
                    }
                });
                
            }
            else {
                // redirect to login - token expired - show message
                console.log("error");
                setshowLoginMessage(true);
                setTimeout(() => {
                    setshowLoginMessage(false);
                }, 3000);
            }

        })
        .catch(error => {
            console.log('error');
            console.error(error);
        }); 
    }
    return <>
        <div className="wrapper fadeInDown">
            <div id="formContent" className='pt-3'>
                <form>
                    <input type="text" id="login" className="fadeIn second form-control" name="login" placeholder="login" onChange={e => setlogin(e.target.value)}/>
                    <input type="text" id="password" className="fadeIn third form-control" name="password" placeholder="password" onChange={e => setpassword(e.target.value)} />
                    <input type="button" className="fadeIn fourth" value="Log In" onClick={handleSubmit} />
                </form>

                {
                    showLoginMessage ? 
                    <div className="alert alert-warning">
                        Login ou mot de passe incorrect.
                    </div>
                    : null
                }
            </div>
        </div>
    </>;
};

export default Login;
