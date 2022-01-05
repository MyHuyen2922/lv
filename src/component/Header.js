import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.jpg';
import '../css/Header.css';
import ShowLogin from './ShowLogin';
import Search from './Search';

class Header extends Component {
    render() {
        return (
            <div className="container-fluid ">
                <div className="row col-12">
                    <div className="col-3 mt-2">
                        <Link to="/">
                            <img onClick={this.showDish} src={Logo} className="logo" alt="logo" />
                        </Link>
                    </div>
                    <div className="col-5">
                        <Search />
                    </div>
                    <div className="col-1">

                    </div>
                    <div className="col-3 mt-3">
                        <ShowLogin />
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;