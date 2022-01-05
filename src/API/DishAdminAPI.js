import React, { Component } from 'react';
import axios from 'axios';

class DishAdminAPI extends Component {
    constructor (props){
        super(props);
        this.baseURL='http://localhost:80';
    }

    DishAdminAPI(thamso){
        const api=axios.create({baseURL:this.baseURL});
        return api.post('/DishAdmin.php', thamso)
        .then(response => {
            console.log(response);
            return response.data;   
        })
        .catch( error => {
            console.log(error);
        })
    }
    DishCakeAdminAPI(thamso){
        const api=axios.create({baseURL:this.baseURL});
        return api.post('/DishCakeAdmin.php',thamso)
        .then(response => {
            console.log(response);
            return response.data;   
        })
        .catch( error => {
            console.log(error);
        })
    }

} 
export default DishAdminAPI;