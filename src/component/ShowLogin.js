import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Logout from './Logout';
import UserAPI from '../API/UserAPI';

class ShowLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0
        }
    }
    componentDidMount() {
        let thamso = new FormData();
        if (localStorage.getItem('idkh') !== null) {
            thamso.append('idkh', localStorage.getItem('idkh'));
        }
        const api = new UserAPI();
        api.DishCartAPI(thamso)
            .then(reponse => {
                console.log(reponse);
                this.setState({
                    number: reponse.length,
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        if (localStorage.getItem('idkh') === null) {
            return (
                <div className="col-12 text-right">
                    <Link to="/Createuser" className="btn btn-outline-info  ml-89">Đăng Kí</Link> &emsp;
                    <Link to="/Login" className="btn btn-outline-info">Đăng Nhập</Link>
                </div>
            );
        }
        else {
            return (
                <div className="col-12 text-right">
                    <Link to="/cart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cart4 text-primary" viewBox="0 0 16 16">
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                        </svg>
                    </Link>
                    <span className="rounded-circle bg-danger slgh">
                        {
                            this.state.number !== 0 ? (
                                this.state.number
                            ) : (
                                null
                            )
                        }
                    </span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <img src={"http://localhost:80/" + localStorage.getItem('avatar')} className="rounded-circle avatar" alt="avt" />&nbsp;
                    <div className="btn-group" role="group">
                        <button id="btnGroupDrop1" type="button" className="btn btn-outline-primary dropdown-toggle nameUser" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="caret">{localStorage.getItem('username')}</span>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                            <Link to="/myaccount" className="dropdown-item" href="#">Tài khoản của tôi</Link>
                            <Link to="/ordersuser" className="dropdown-item" href="#">Đơn Mua</Link>
                            <Logout />
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default ShowLogin;