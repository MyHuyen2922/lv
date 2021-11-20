import React, { Component } from "react";
import axios from "axios";

class UserAPI {
    constructor() {
        this.baseURL = 'http://localhost:80';
    }
    EditAccountAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('/EditAccount.php', thamso)
            .then(response => {
                console.log(response)
                return response;
            })
    }
    AddCartAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('/AddCart.php', thamso)
            .then(response => {
                console.log(response)
                return response;
            })
            .catch(error => {
                console.log(error);
            })
    }
    BuyAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('/Buy.php', thamso)
            .then(response => {
                console.log(response)
                return response;
            })
            .catch(error => {
                console.log(error);
            })
    }
    ChangeQuantityAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('/ChangeQuantity.php', thamso)
            .then(response => {
                console.log(response)
                return response;
            })
            .catch(error => {
                console.log(error);
            })
    }
    ChangeSizeAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('/ChangeSize.php', thamso)
            .then(response => {
                console.log(response)
                return response;
            })
            .catch(error => {
                console.log(error);
            })
    }
    DishCartAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('/Cart.php', thamso)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
    DeleteDishCartAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('/DeleteCart.php', thamso)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
    OrdersAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('/Orders.php', thamso)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
    DeleteOrdersAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('/DeleteOrders.php', thamso)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
    CommentAPI(thamso){
        const api = axios.create({baseURL : this.baseURL});
        return api.post('/Comment.php', thamso)
        .then(response =>{
            console.log(response);
            return response.data;
        })
        .catch(error =>{
            console.log(error);
        })
    }
    ChangePassAPI(thamso){
        const api = axios.create({baseURL : this.baseURL});
        return api.post('/ChangePass.php', thamso)
        .then(response =>{
            console.log(response);
            return response.data;
        })
        .catch(error =>{
            console.log(error);
        })
    }
    GetAllItemAPI(thamso){
        const api = axios.create({baseURL : this.baseURL});
        return api.post('/GetAllItem.php', thamso)
        .then(response =>{
            console.log(response);
            return response.data;
        })
        .catch(error =>{
            console.log(error);
        })
    }
    GetCommentAPI(thamso){
        const api = axios.create({baseURL : this.baseURL});
        return api.post('/GetComment.php', thamso)
        .then(response =>{
            console.log(response);
            return response.data;
        })
        .catch(error =>{
            console.log(error);
        })
    }
    GetAllDishAPI(thamso){
        const api = axios.create({baseURL : this.baseURL});
        return api.post('/GetAllDish.php', thamso)
        .then(response =>{
            console.log(response);
            return response.data;
        })
        .catch(error =>{
            console.log(error);
        })
    }
    SearchAPI(thamso){
        const api = axios.create({baseURL : this.baseURL});
        return api.post('/Search.php', thamso)
        .then(response =>{
            console.log(response);
            return response.data;
        })
        .catch(error =>{
            console.log(error);
        })
    }
    SearchCostAPI(thamso){
        const api = axios.create({baseURL : this.baseURL});
        return api.post('/SearchCost.php', thamso)
        .then(response =>{
            console.log(response);
            return response.data;
        })
        .catch(error =>{
            console.log(error);
        })
    }   
    BestSellingAPI(thamso){
        const api = axios.create({baseURL : this.baseURL});
        return api.post('/BestSelling.php', thamso)
        .then(response =>{
            console.log(response);
            return response.data;
        })
        .catch(error =>{
            console.log(error);
        })
    }
    ShowOrdersAPI(thamso){
        const api = axios.create({baseURL : this.baseURL});
        return api.post('/ShowOrders.php', thamso)
        .then(response =>{
            console.log(response);
            return response.data;
        })
        .catch(error =>{
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
    SearchListCostAPI(thamso){
        const api = axios.create({baseURL : this.baseURL});
        return api.post('/SearchListCost.php', thamso)
        .then(response =>{
            console.log(response);
            return response.data;
        })
        .catch(error =>{
            console.log(error);
        })
    } 
    ReportAPI(thamso){
        const api = axios.create({baseURL : this.baseURL});
        return api.post('/Report.php', thamso)
        .then(response =>{
            console.log(response);
            return response.data;
        })
        .catch(error =>{
            console.log(error);
        })
    } 
    LoginGoogleAPI(thamso){
        const api = axios.create({baseURL : this.baseURL});
        return api.post('/LoginGoogle.php', thamso)
        .then(response =>{
            console.log(response);
            return response.data;
        })
        .catch(error =>{
            console.log(error);
        })
    } 
    VnPayAPI(thamso){
        const api = axios.create({baseURL : this.baseURL});
        return api.post('/VnPay.php', thamso)
        .then(response =>{
            console.log(response);
            return response.data;
        })
        .catch(error =>{
            console.log(error);
        })
    } 

}
export default UserAPI;