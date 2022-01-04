import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlayerConfigProps, PlayerPointProps } from '../PlayerConfig/PlayerConfig';
import { useNavigate } from 'react-router-dom';

const Game: React.FC = (props) => {
    const [players, setplayers] = useState<PlayerConfigProps[] | null>(null);
    const [player1, setplayer1] = useState<PlayerPointProps>({
        id: 0,
        name: "",
        hp: 100,
        st: 30,
        mp: 40,
    });
    const [player2, setplayer2] = useState<PlayerPointProps>({
        id: 0,
        name: "",
        hp: 100,
        st: 30,
        mp: 40,
    });
    const [gameDone, setgameDone] = useState<boolean>(false);
    const [winnerId, setwinnerId] = useState<number | null>(null);

    
    useEffect(() => {
        console.log("called");
        getPlayers();
        return () => {
            
        }
    }, [props]);

    /*
    useFocusEffect(
        React.useCallback(() => {
            getPlayers();
    
          return () => {};
        }, [])
    );
    */

    const navigate = useNavigate();

    const getPlayers = async () => {
      await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/get-players`).then((response) => {
        console.log(response.data);
        setplayers(response.data);
        setplayer1({
            ...response.data[0]
        });
        setplayer2({
            ...response.data[1]
        });
      });
    }

    const hitOpponent = (player: PlayerPointProps, actionPoint: number) => {
        let id = player.id;
        let hp = player.hp - actionPoint >= 0 ? player.hp - actionPoint : 0;

        switch (player.id) {
            case 1:
                setplayer1({
                    ...player1,
                    hp
                });
                break;
            case 2:
                setplayer2({
                    ...player2,
                    hp
                });
                break;
        
            default:
                break;
        }
        
        axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/set-player-hp`, {
            id,
            hp
        }).then((response) => {
            console.log(response.data);
            if(hp === 0){
                highlightWinner(player);
            }
        });
    }

    const highlightWinner = (player: PlayerPointProps) => {
        switch (player.id) {
            case 1:
                setwinnerId(2);
                break;
            case 2:
                setwinnerId(1);
                break;
        
            default:
                break;
        }
        setgameDone(true);
    }

    return <>
        <div className="container">
            <h1 className="text-center">Jeu</h1>
            {
                players ? 
                <>
                <div className="row">
                    {
                        players.map((item, index) =>
                            <div className="col-6 p-2" key={"player-" + index}>
                                <div className="d-flex flex-column justify-content-around align-items-center border rounded p-3">
                                    <h3 className="font-weight-bold">{ item.name }</h3>
                                    {
                                        index === 0 ?
                                        <>
                                        <div className="form-group">
                                            <span className="text-center h1 font-weight-bold">{player1.hp}</span>
                                        </div>
                                        {
                                            !gameDone ? 
                                            <div className="form-group d-flex justify-content-around align-items-center">
                                                <button className="btn btn-primary" onClick={() => hitOpponent(player2, player1.st)}>Frapper</button>
                                                <button className="btn btn-warning ml-2" onClick={() => hitOpponent(player2, player1.mp)}>Lancer sort</button>
                                            </div>
                                            :
                                            <div className="result">
                                                {
                                                    winnerId === player1.id ? <span className="badge badge-success badge-pill">Victoire</span> : <span className="badge badge-danger badge-pill">Défaite</span>
                                                }
                                            </div>
                                        }
                                        </>
                                        :
                                        <>
                                        <div className="form-group">
                                            <span className="text-center h2 font-weight-bold">{player2.hp}</span>
                                        </div>
                                        {
                                            !gameDone ? 
                                            <div className="form-group d-flex justify-content-around align-items-center">
                                                <button className="btn btn-primary" onClick={() => hitOpponent(player1, player2.st)}>Frapper</button>
                                                <button className="btn btn-warning ml-2" onClick={() => hitOpponent(player1, player2.mp)}>Lancer sort</button>
                                            </div>
                                            :
                                            <div className="result">
                                                {
                                                    winnerId === player2.id ? <span className="badge badge-success badge-pill">Victoire</span> : <span className="badge badge-danger badge-pill">Défaite</span>
                                                }
                                            </div>
                                        }
                                        </>
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="text-center">
                    <button className="btn btn-info" onClick={() => navigate(`/`)}>Rejouer</button>
                </div>
                </>
                : <span>Aucun joueur</span>
            }
        </div>
    </>;
};

export default Game;
