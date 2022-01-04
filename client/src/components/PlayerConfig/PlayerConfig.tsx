import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export interface PlayerConfigProps {
    id: number;
    name: string;
    hp: number | string | null;
    st: number | string | null;
    mp: number | string | null;
}

export interface PlayerPointProps {
    id: number;
    name: string;
    hp: number;
    st: number;
    mp: number;
}

function PlayerConfig() {
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
    const navigate = useNavigate();

    useEffect(() => {
        getPlayers();
        return () => {
            
        }
    }, []);

    const getPlayers = async () => {
      await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/get-players`).then((response) => {
        console.log(response.data);
        setplayers(response.data);
        setplayer1({
            ...response.data[0],
            hp: 100,
            st: 30,
            mp: 40
        });
        setplayer2({
            ...response.data[1],
            hp: 100,
            st: 30,
            mp: 40
        });
      });
    }

    const setPlayerConfig = () => {
      axios.post(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/set-player-config`, {
        players: [ player1, player2 ]
      }).then((response) => {
        console.log(response.data);
        navigate(`/game`, {
            state: {
              datetime: Date.now()
            }
          });
      });
    }

    return <>
        <div className="container">
            <h1 className="text-center">Configurations de jeu</h1>
            {
                players ? 
                <>
                <div className="row">
                    {
                        players.map((item, index) =>
                            <div className="col-6 p-2" key={"player-" + index}>
                                <div className="d-flex flex-column justify-content-between border rounded p-3">
                                    <h3 className="font-weight-bold">{ item.name }</h3>
                                    {
                                        index === 0 ?
                                        <>
                                        <div className="form-group">
                                            <label htmlFor={'hp-' + index}>HP</label>
                                            <input type="text" id={'hp-' + index}className="form-control" placeholder="HP" readOnly disabled value={player1.hp} onChange={e => setplayer1({
                                                ...player1, hp: parseInt(e.target.value)
                                            })} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={'st-' + index}>ST</label>
                                            <input type="number" id={'st-' + index} className="form-control" placeholder="ST" min={0} max={100} value={player1.st} onChange={e => setplayer1({
                                            ...player1, st: parseInt(e.target.value)
                                        })} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={'mp-' + index}>MP</label>
                                            <input type="number" id={'mp-' + index} className="form-control" placeholder="MP" min={0} max={100} value={player1.mp} onChange={e => setplayer1({
                                            ...player1, mp: parseInt(e.target.value)
                                        })} />
                                        </div>
                                        </>
                                        :
                                        <>
                                        <div className="form-group">
                                            <label htmlFor={'hp-' + index}>HP</label>
                                            <input type="text" id={'hp-' + index}className="form-control" placeholder="HP" readOnly disabled value={player2.hp} onChange={e => setplayer2({
                                                ...player2, hp: parseInt(e.target.value)
                                            })} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={'st-' + index}>ST</label>
                                            <input type="number" id={'st-' + index} className="form-control" placeholder="ST" min={0} max={100} value={player2.st} onChange={e => setplayer2({
                                            ...player2, st: parseInt(e.target.value)
                                        })} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={'mp-' + index}>MP</label>
                                            <input type="number" id={'mp-' + index} className="form-control" placeholder="MP" min={0} max={100} value={player2.mp} onChange={e => setplayer2({
                                            ...player2, mp: parseInt(e.target.value)
                                        })} />
                                        </div>
                                        </>
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="text-center">
                    <button className="btn btn-info text-center" onClick={setPlayerConfig}>Enregistrer et jouer</button>
                </div>
                </>
                : <span>Aucun joueur</span>
            }
        </div>
    </>;
};

export default PlayerConfig;
