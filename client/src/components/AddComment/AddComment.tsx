import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export interface AddCommentProps {}

const AddComment: React.FC = (props) => {
    const [content, setcontent] = useState("");
    const [showLoginMessage, setshowLoginMessage] = useState<boolean>(false);
    const navigate = useNavigate();
    let { id, slug } = useParams();
    const handleSubmit = () => {

        const token = localStorage.getItem("token");
        console.log(token);
        if(token){
            if(content !== ""){
                axios.post(`http://127.0.0.1:8001/api/c/comment-car`, {
                    content,
                    car: id
                }, {
                    headers: {"Authorization" : `Bearer ${token}`}
                })
                .then(async (response) => {
                    console.log(response.data);
                    if(response.data.status === 200){
                        navigate(`/`);
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
                    console.log('errorc');
                    setshowLoginMessage(true);
                    setTimeout(() => {
                        setshowLoginMessage(false);
                    }, 3000);
                    console.error(error);
                }); 
            }
            else {
                console.log("nocontent");
                setshowLoginMessage(true);
                setTimeout(() => {
                    setshowLoginMessage(false);
                }, 3000);
            }
        }
        else {
            navigate(`/login`);
        }
    }

    return <>
        <div className="wrapper fadeInDown">
            <div id="formContent" className='pt-3'>
                <h4>Votre commentaire sur {slug}</h4>
                <form>
                    <textarea onChange={e => setcontent(e.target.value)} name="" id="" cols={30} rows={10}></textarea>
                    <input type="button" className="fadeIn fourth" value="Commenter" onClick={handleSubmit} />
                </form>

                {
                    showLoginMessage ? 
                    <div className="alert alert-warning">
                        Veuillez saisir un commentaire.
                    </div>
                    : null
                }
            </div>
        </div>
    </>;
};

export default AddComment;
