import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './component/Login';
import Home from './component/Home';
import Createuser from './component/Createuser';
import Admin from './component/admin/Admin';
import './App.css'
import ShowDish from './component/ShowDish';
import ForgetPassword from './component/user/ForgetPassword';
import ConfirmCode from './component/user/ConfirmCode';
import ResetPassword from './component/user/ResetPassword';
import MyAccount from './component/user/MyAccount';
import Cart from './component/user/Cart';
import OrdersUser from './component/user/OrdersUser';
import ChangePass from './component/user/ChangePass';
import OrdersAdmin from './component/admin/OrdersAdmin';
import Comment from './component/user/Comment';
import ShipperMGR from './component/admin/ShipperMGR';
import Shipper from './component/shipper/Shipper';
import ShipperAcc from './component/shipper/ShipperAcc';
import ChangePassShipper  from './component/shipper/ChangePassShipper';
import Discount from './component/admin/Discount';
import Search from './component/Search';
import Rate from './component/user/Rate';
import BessSelling from './component/user/BessSelling';
import ListShipper from './component/admin/ListShipper';
import ListUser from './component/admin/ListUser';
import detailOrders from './component/user/detailOrders';
import CommentMGR from './component/admin/CommentMGR';
import Sales from './component/admin/Sales';
import Test from './component/Test';

class App extends Component {
  render() {
    return (
      
            <div>
              <Router>
                <switch>
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/Createuser" component={Createuser}/>
                  <Route exact path="/Login" component={Login}/>
                  <Route exact path="/admin" component={Admin}/>
                  <Route exact path="/showDish" component={ShowDish}/>
                  <Route exact path="/forgetpassword" component={ForgetPassword}/>
                  <Route exact path="/confirmcode" component={ConfirmCode}/>
                  <Route exact path="/resetpassword" component={ResetPassword}/>
                  <Route exact path="/myaccount" component={MyAccount}/>
                  <Route exact path="/cart" component={Cart}/>
                  <Route exact path="/ordersuser" component={OrdersUser}/>
                  <Route exact path="/changepass" component={ChangePass}/>
                  <Route exact path="/ordersadmin" component={OrdersAdmin}/>
                  <Route exact path="/comment" component={Comment}/>
                  <Route exact path="/shipperMGR" component={ShipperMGR}/>
                  <Route exact path="/shipper" component={Shipper}/>
                  <Route exact path="/shipperacc" component={ShipperAcc}/>
                  <Route exact path="/changepassshipper" component={ChangePassShipper}/>
                  <Route exact path="/discount" component={Discount}/>
                  <Route exact path="/search" component={Search}/>
                  <Route exact path="/rate" component={Rate}/>
                  <Route exact path="/bessselling" component={BessSelling}/>
                  <Route exact path="/listshipper" component={ListShipper}/>
                  <Route exact path="/listuser" component={ListUser}/>
                  <Route exact path="/detailorders/:id" component={detailOrders}/>
                  <Route exact path="/commentMGR" component={CommentMGR}/>
                  <Route exact path="/sales" component={Sales}/>
                  <Route exact path="/test" component={Test}/>
                </switch>
                </Router>
            </div>
    ); 
  }
}

export default App;