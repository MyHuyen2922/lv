import React, { Component } from 'react';
import axios from 'axios';

class AdminAPI {
    constructor() {
        this.baseURL = 'http://localhost:80';
    }

    DeleteDishAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('/admin/DeleteDish.php', thamso)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }

    EditDishAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('admin/EditDish.php', thamso)
            .then(response => {
                console.log(response);
                return response.data;
            })
    }
    OrdersAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('/OrdersAdmin.php', thamso)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
    CreateShipperAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('/CreateShipper.php', thamso)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
    DiscountAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('/Discount.php', thamso)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
    GetDiscountAPI() {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('/GetDiscount.php')
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
    ListShipperAPI() {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('/ListShipper.php')
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
    DeleteShipperAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('DeleteShipper.php', thamso)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
    ListUserAPI() {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('/ListUser.php')
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
    DeleteUserAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('DeleteUser.php', thamso)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
    DeleteDiscountAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('DeleteDiscount.php', thamso)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
    DiscountDishAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('/DiscountDish.php', thamso)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
    DeleteDiscountDishAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('DeleteDiscountDish.php', thamso)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
    GetCommentAdminAPI() {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('GetCommentAdmin.php')
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
    GetReportAPI() {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('GetReport.php')
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
    DeleteCommentAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('DeleteCommentAdmin.php', thamso)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
    GetDishOrdersAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('GetDishOrders.php', thamso)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
    GetStopAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('GetStop.php',thamso)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
    SearchDateAPI(thamso) {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('SearchSaleDate.php', thamso)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
    TestAPI() {
        const api = axios.create({ baseURL: this.baseURL });
        return api.post('Test.php')
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }     
    GetConsignmentAPI(){
        const api=axios.create({baseURL: this.baseURL});
        return api.post('/GetConsignment.php')
        .then(response => {
            console.log(response); 
            return response.data;  
        })
        .catch( error => {
            console.log(error);
        })
    }
    Cake_ConsignmentAPI(){
        const api=axios.create({baseURL: this.baseURL});
        return api.post('/Cake_Consignment.php')
        .then(response => {
            console.log(response); 
            return response.data;  
        })
        .catch( error => {
            console.log(error);
        })
    }
    Add_ConsignmentAPI(thamso){
        const api=axios.create({baseURL: this.baseURL});
        return api.post('/Add_Consignment.php',thamso)
        .then(response => {
            console.log(response); 
            return response.data;  
        })
        .catch( error => {
            console.log(error);
        })
    }
    Delete_ConsignmentAPI(thamso){
        const api=axios.create({baseURL: this.baseURL});
        return api.post('/Delete_Consignment.php',thamso)
        .then(response => {
            console.log(response); 
            return response.data;  
        })
        .catch( error => {
            console.log(error);
        })
    }
    
}
export default AdminAPI;