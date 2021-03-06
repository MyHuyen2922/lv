import React, { Component } from 'react';
import '../css/login.css';
import LoginAPI from '../API/LoginAPI';
import { Redirect, Link } from 'react-router-dom';
import md5 from 'md5';
import GoogleLogin from 'react-google-login';
import UserAPI from '../API/UserAPI';
import FacebookLogin from 'react-facebook-login';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mk: '',
            email: '',
            direct: ''
        }
    }

    Change = (h) => {
        h.preventDefault();
        const { name, value } = h.target;
        this.setState({
            [name]: value
        })
    }
    Login = (h) => {
        h.preventDefault();
        let data = document.getElementById('login-form');
        let thamso = new FormData(data);
        const api = new LoginAPI();
        api.LoginAPI(thamso)
            .then(response => {
                console.log(response);
                console.log(md5(this.state.mk));
                if (response.data[0].mk === md5(this.state.mk)) {
                    localStorage.setItem('email', response.data[0].email);
                    localStorage.setItem('username', response.data[0].hoten);
                    localStorage.setItem("idkh", response.data[0].idkh);
                    localStorage.setItem("idshipper", response.data[0].idshipper);
                    localStorage.setItem("dc", response.data[0].dc);
                    localStorage.setItem("sdt", response.data[0].sdt);
                    localStorage.setItem("vaitro", response.data[0].vaitro);
                    localStorage.setItem("avatar", response.data[0].avatar);
                    localStorage.setItem("mk", response.data[0].mk);
                    if (response.data.vaitro === "user" && response.data[0].vaitro === "admin") {
                        this.setState({
                            direct: "/admin"
                        })
                    }
                    else if (response.data.vaitro === "shipper") {
                        this.setState({
                            direct: '/shipper'
                        })
                    }
                    else {
                        this.setState({
                            direct: '/'
                        })
                    }
                }
                else alert("Email ho???c m???t kh???u c???a b???n ch??a ????ng !!!");
            })
            .catch(error => {
                console.log(error)
            })
    }
    responseGoogle = (response) => {
        var profile = response.profileObj;
        var id = profile.googleId;
        var name = profile.name;
        id = id.split("");
        console.log(id);
        var idkh = '';
        for (let i = id.length - 9; i < id.length; i++) {
            idkh += String(id[i]);
        }
        let thamso = new FormData();
        thamso.append("idkh", idkh);
        thamso.append("hoten", name);
        const api = new UserAPI();
        api.LoginGoogleAPI(thamso)
            .then(response => {
                console.log(response);
                localStorage.setItem("idkh", response[0].idkh);
                localStorage.setItem("username", response[0].hoten);
                localStorage.setItem("avatar", response[0].avatar);
                this.setState({
                    direct: '/',
                })

            })
            .catch(error => {
                console.log(error);
            })

    }
    responseFacebook = (response) => {
        console.log(response);
        var id = response.id;
        var name = response.name;
        var idkh = '';
        for (let i = id.length - 8; i < id.length; i++) {
            idkh += String(id[i]);
        }
        let thamso = new FormData();
        thamso.append("idkh", idkh);
        thamso.append("hoten", name);
        const api = new UserAPI();
        api.LoginGoogleAPI(thamso)
            .then(response => {
                console.log(response);
                localStorage.setItem("idkh", response[0].idkh);
                localStorage.setItem("username", response[0].hoten);
                localStorage.setItem("avatar", response[0].avatar);
                this.setState({
                    direct: '/',
                })

            })
            .catch(error => {
                console.log(error);
            })

    }
    render() {
        var { email, mk } = this.state;
        if (this.state.direct !== '') {
            return <Redirect to={this.state.direct} />
        }
        return (
            <div>
                <div className="brLogin"></div>
                <div className="row">
                    <div className="login col-5 offset-6 mt-5 bggray">
                        <h2 align='center' className=" mt-3 mb-4">????NG NH???P NG?????I D??NG</h2>
                        <form id="login-form" onSubmit={this.Login}>
                            <div className="row form-group">
                                <div className="col-10 offset-1">
                                    <input type="text" placeholder="Nh???p email ????ng nh???p" onChange={this.Change} name="email" value={this.state.email} className="form-control" />
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-10 offset-1">
                                    <input type="password" placeholder="M???t kh???u" onChange={this.Change} name="mk" value={this.state.mk} className="form-control" />
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-10 offset-1">
                                    <button type="submit" className="btn btn-success dn">????NG NH???P</button><br />
                                    <Link to="/forgetpassword">
                                        <i className="text-muted">Qu??n m???t kh???u ?</i>
                                    </Link>
                                </div>
                            </div>

                            <div className="row col-10 offset-1 form-group">
                                <div className="col-6">
                                    <FacebookLogin
                                        appId="198804329003038"
                                        autoLoad={false}
                                        fields="name,email,picture"
                                        callback={this.responseFacebook}
                                        cssClass="btn btn-primary"
                                        icon="fa-facebook pr-2"
                                    />
                                </div>
                                <div className="col-6">
                                    <GoogleLogin className="logingg" clientId='280974906946-5h303vq8lvs1t2ghbco7437equ6rguf5.apps.googleusercontent.com'
                                        buttonText='Login with Google' onSuccess={this.responseGoogle} onFailure={this.responseGoogle} cookiePolicy={"single_host_origin"}>
                                    </GoogleLogin>

                                </div>

                            </div>
                            <div className="col-12 text-center mt-4">
                                <span className="dki">B???n m???i bi???t ?????n Cherry ? </span>
                                <span><Link to="/Createuser" className="giakm">????ng k??</Link></span>        
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

export default Login;