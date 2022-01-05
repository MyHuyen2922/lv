import React, { Component } from 'react';
import axios from 'axios';

class DishAPI extends Component {
    constructor (props){
        super(props);
        this.baseURL='http://localhost:80';
    }

    DishAPI(thamso){
        const api=axios.create({baseURL:this.baseURL});
        return api.post('/Dish.php', thamso)
        .then(response => {
            console.log(response);
            return response.data;   
        })
        .catch( error => {
            console.log(error);
        })
    }

}
export default DishAPI;