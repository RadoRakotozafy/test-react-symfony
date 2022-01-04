import React, { useState, useEffect } from 'react';
import axios from 'axios';

export interface CarsListProps {
    id: number;
    name: string;
    comments?: any;
}

function CarsList({ }: CarsListProps) {
    const [cars, setcars] = useState<CarsListProps[] | null>([])

    useEffect(() => {
        getCars();
        return () => {
            
        }
    }, []);

    const getCars = async () => {
        const token = localStorage.getItem("token");
        let result;
        if(token){
            result = await axios.get(`http://127.0.0.1:8001/api/c/cars`, { headers: {"Authorization" : `Bearer ${token}`} });
        }
        else {
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
                    <table className="table">
                        <thead>
                            <td>Id</td>
                            <td>Nom</td>
                            <td>Commentaires</td>
                        </thead>
                        <tbody>
                            {
                                cars.map((item, index) =>
                                    <tr>
                                        <td>{ item.id }</td>
                                        <td>{ item.name }</td>
                                        <td></td>
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
