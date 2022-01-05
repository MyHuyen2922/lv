import React, { Component } from 'react';
import axios from 'axios';

class DishAPI extends Component {
    constructor (props){
        super(props);
        this.baseURL='http://localhost:80';
    }

    ReceiptAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('/Receipt.php', thamso)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
    DeliveredAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('/Delivered.php', thamso)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
    EditAccountAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('/EditShipperAcc.php', thamso)
            .then(response => {
                console.log(response)
                return response;
            })
    }
    OrdersAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('/OrdersShipper.php', thamso)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
    ChangePassAPI(thamso){
        const api = axios.create({baseURL : this.baseURL});
        return api.post('/ChangePassShipper.php', thamso)
        .then(response =>{
            console.log(response);
            return response.data;
        })
        .catch(error =>{
            console.log(error);
        })
    }
}
export default DishAPI;