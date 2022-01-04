import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Login/Login.css';

export interface RegisterProps {}

function Register({ }: RegisterProps) {
    const [login, setlogin] = useState("");
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const [showLoginMessage, setshowLoginMessage] = useState<boolean>(false);
    const [showSuccessMessage, setshowSuccessMessage] = useState<boolean>(false);
    const [message, setmessage] = useState("");
    const navigate = useNavigate();
    const handleSubmit = () => {
        console.log('regsiter');
        if(login !== "" && password !== "" && email !== ""){
            if(validateEmail(email)){
                axios.post(`http://127.0.0.1:8001/api/register`, {
                    username: login,
                    password,
                    email,
                })
                .then((response) => {
                    console.log(response.data);
                    if(response.data.status === 200){
                        setshowSuccessMessage(true);
                        setTimeout(() => {
                            setshowSuccessMessage(false);
                            navigate(`/login`, {
                                state: {
                                    datetime: Date.now()
                                }
                            });
                        }, 3000);
        
                        
                    }
                    else {
                        // redirect to login - token expired - show message
                        console.log("error");
                        setmessage(response.data.message);
                        setshowLoginMessage(true);
                        setTimeout(() => {
                            setshowLoginMessage(false);
                        }, 3000);
                    }
        
                })
                .catch(error => {
                    console.log('errorc');
                    console.log(error);
                    setshowLoginMessage(true);
                    setTimeout(() => {
                        setshowLoginMessage(false);
                    }, 3000);
                    console.error(error);
                }); 
            }
            else {
                setmessage("Email invalide");
                setshowLoginMessage(true);
                setTimeout(() => {
                    setshowLoginMessage(false);
                }, 3000);
            }
        }
        else {
            setmessage("Veuillez remplir tous les champs");
            setshowLoginMessage(true);
            setTimeout(() => {
                setshowLoginMessage(false);
            }, 3000);
        }
    }

    const validateEmail = (email: string) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    return <>
        <div className="wrapper fadeInDown">
            <div id="formContent" className='pt-3'>
                <form>
                    <input type="text" id="login" className="fadeIn second form-control" name="login" placeholder="login" onChange={e => setlogin(e.target.value)} required/>
                    <input type="text" id="email" className="fadeIn third form-control" name="email" placeholder="email" onChange={e => setemail(e.target.value)} required />
                    <input type="text" id="password" className="fadeIn third form-control" name="password" placeholder="password" onChange={e => setpassword(e.target.value)} required />
                    <input type="button" className="fadeIn fourth" value="Register" onClick={handleSubmit} />
                </form>

                {
                    showLoginMessage ? 
                    <div className="alert alert-warning">
                        {message}
                    </div>
                    : null
                }
                {
                    showSuccessMessage ? 
                    <div className="alert alert-success">
                        Done
                    </div>
                    : null
                }
            </div>
        </div>
    </>;
};

export default Register;
