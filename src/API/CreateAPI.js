import axios from 'axios';
import React, { Component } from 'react';

class CreateAPI{
    constructor (){
        this.baseURL='http://localhost:80';
        this.Createuser=this.Createuser.bind(this);
    }

    Createuser(thamso){
        const api=axios.create({baseURL: this.baseURL});
        return api.post('/Createuser.php', thamso)
        .then(response => {
            console.log(response); 
            return response.data;  
        })
        .catch( error => {
            console.log(error);
        })
    }

}
export default CreateAPI;
