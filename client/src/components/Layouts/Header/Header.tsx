import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

export interface HeaderProps {}

function Header({ }: HeaderProps) {
    const navigate = useNavigate();
    return <>
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-white p-3 mb-5 border">
                <div className="container-fluid">
                    <button
                            className="navbar-toggler"
                            type="button"
                            data-mdb-toggle="collapse"
                            data-mdb-target="#navbarExample01"
                            aria-controls="navbarExample01"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarExample01">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => {
                                        navigate(`/`);
                                }} >Home</a>
                            </li>
                            {
                                localStorage.getItem('token') ? 
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" onClick={() => {
                                        localStorage.removeItem('token');
                                        navigate(`/login`);
                                    }}>Logout</a>
                                </li>
                                :
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link" aria-current="page" onClick={() => {
                                            navigate(`/login`);
                                        }}>Login</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={() => {
                                            navigate(`/register`);
                                        }}>Register</a>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    </>;
};

export default Header;
