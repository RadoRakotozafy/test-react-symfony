import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export interface CarsListProps {
    id: number;
    name: string;
    comments?: any;
}

interface CommentProps {
    id: number;
    content: string;
    user: string;
}

function CarsList({ }: CarsListProps) {
    const [cars, setcars] = useState<CarsListProps[] | null>([]);
    const [showLoginMessage, setshowLoginMessage] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        getCars();
        return () => {
            
        }
    }, []);

    const getCars = async () => {
        const token = localStorage.getItem("token");
        console.log(token);
        let result;
        if(token){
            console.log("token");
            result = await axios.get(`http://127.0.0.1:8001/api/c/cars`, { headers: {"Authorization" : `Bearer ${token}`} })
            .then((response) => {
                console.log(response.data);
                if(!response.data.code){
                    setcars(response.data);
                }
                else {
                    // redirect to login - token expired - show message
                    setshowLoginMessage(true);
                    setTimeout(() => {
                        setshowLoginMessage(false);
                    }, 3000);
                }
            })
            .catch(error => console.error(error)); 
        }
        else {
            console.log("no token");
            result = await axios.get(`http://127.0.0.1:8001/api/cars`).then((response) => {
                console.log(response.data);
                setcars(response.data);
            }); 
        }
    }
    return <>
        <div className="container">
            <h1 className="text-center">Liste de voitures</h1>
            {
                cars ? 
                <>
                <div className="row">
                    {
                        showLoginMessage ? 
                        <div className="alert alert-warning">
                            La session a expirée. Veuillez vous reconnecter. 
                        </div>
                        : null
                    }
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nom</th>
                                <th>Commentaires</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cars.map((item, index) =>
                                    <tr key={"car-" + item.id}>
                                        <td>{ item.id }</td>
                                        <td>{ item.name }</td>
                                        <td>
                                            {
                                                item.comments ? 
                                                item.comments.length > 0 ?
                                                    <ul>
                                                        {
                                                            item.comments.map((comment: CommentProps) => 
                                                                <li key={"comment-" + comment.id}>{comment.content} (<i>{comment.user}</i>)</li>
                                                            )
                                                        }
                                                    </ul>
                                                    : null
                                                : null
                                            }
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                </>
                : <span>Aucune voiture</span>
            }
        </div>
    </>;
};

export default CarsList;
