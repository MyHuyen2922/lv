import React, { Component } from 'react';
import Header from '../Header';
import Orders from './Orders';
import { Redirect } from 'react-router';

class OrdersUser extends Component {
    render() {
        if (localStorage.getItem('idkh') === null) {
            return <Redirect to="/" />
        }
        return (
            <div className="br">
                <div className="bg-yellow">
                    <Header />
                </div>
                <div className="mt-2">
                    <Orders />
                </div>
            </div>
        );
    }
}

export default OrdersUser;