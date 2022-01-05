import axios from 'axios';
import React, { Component } from 'react';

class LoginAPI {
    constructor() {
        this.baseURL = 'http://localhost:80';
    }

    LoginAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('/login.php', thamso)
            .then(response => {
                console.log(response);
                return response;
            })
            .catch(error => {
                console.log(error);
            })
    }
    ShowAccountAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('/login.php', thamso)
            .then(response => {
                console.log(response);
                return response;
            })
            .catch(error => {
                console.log(error);
            })
    }

    ForgetPassAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('/ForgetPassword.php', thamso)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
    ResetPassAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('/ResetPassword.php', thamso)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error =>{
                console.log(error);
            })
    }
}
export default LoginAPI;
