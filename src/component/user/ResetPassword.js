import React, { Component } from 'react';
import md5 from 'md5';
import LoginAPI from '../../API/LoginAPI';
import { Redirect } from 'react-router-dom';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirm_password: '',
            direct: ''
        }
        this.onResetPassword = this.onResetPassword.bind(this);
    }
    onChange = (e) => {
        e.preventDefault();
        const {name, value} =e.target;
        this.setState({
            [name]:value
        })
    }
    onResetPassword = (e) => {
        e.preventDefault();
        if(md5(this.state.password) === md5(this.state.confirm_password)) {
            let data = document.getElementById('form-resetpassword');
            let thamso = new FormData(data);
            thamso.append("email", localStorage.getItem('fetch_email'));
            console.log(thamso);
            const api = new LoginAPI();
            api.ResetPassAPI(thamso)
            .then(response => {
                console.log(response);
                localStorage.removeItem('fetch_email');
                localStorage.removeItem('maxacnhan');
                this.setState({direct: '/Login'});
            })
            .catch(error =>{
                console.log(error)
            })
        }
        else {
            alert("Không hợp lệ");
        }
    }
    render() {
        if (this.state.direct !== '') {
            return <Redirect to={this.state.direct} />
        }
        if(localStorage.getItem('maxacnhan') === null){
            return <Redirect to='/forgetpassword'/>
        }
        return (
            <form id="form-resetpassword">
                <div className="row">
                    <div className="col-6 offset-3">
                        <h2 className="text-center">Nhập mật khẩu mới</h2>
                        <div className="col-8 offset-1 mb-2">
                            <input type="password" name="password" onChange={this.onChange} placeholder="Nhập mật khẩu mới" className="form-control mailForgetPass" />
                        </div>
                        <div className="col-8 offset-1">
                            <input type="password" name="confirm_password" onChange={this.onChange} placeholder="Xác nhận mật khẩu mới" className="form-control mailForgetPass" />
                        </div>
                        <div className="col-8 offset-1 mt-3" >
                            <button onClick={this.onResetPassword} type="submit" class="btn btn-info">Xác Nhận</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default ResetPassword;