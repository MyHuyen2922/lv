import React, { Component } from 'react';
import LoginAPI from '../../API/LoginAPI';
import { Redirect } from 'react-router-dom';
import Loader from '../Loader';

class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            direct: '',
            loading: true,
        }
    }

    onForgetPass = (e) => {
        e.preventDefault();
        this.setState({loading: false})
        let data = document.getElementById('form-forgetpassword');
        let thamso = new FormData(data);
        const api = new LoginAPI();
        api.ForgetPassAPI(thamso)
        .then(response =>{
            console.log(response);
            if(response[0].code === 200){
                console.log(response);
                localStorage.setItem('maxacnhan', response[0].confirm_code);
                localStorage.setItem('fetch_email', response[0].fetch_email);
                this.setState({direct: '/confirmcode', loading:true})
               
            }
            else{
                alert("Nhập lại email !!!");
            }
        })
        .catch(error =>{
            console.log(error);
        })

    }

    render() {
        if(this.state.loading === false){
            return <div className="col-2 offset-5 mt-4"><div className="col-4 offset-4"><Loader/></div></div>
        }
        if (this.state.direct !== '') {
            return <Redirect to={this.state.direct} />
        }
        return (
            <form id="form-forgetpassword">
                <div className="row">
                    <div className="col-6 offset-3">
                        <h2 className="text-center">Quên Mật Khẩu</h2>
                        <div className="col-8 offset-1">
                            <input type="text" name="email" placeholder="Nhập email" className="form-control mailForgetPass" />
                        </div>
                        <div className="col-8 offset-1 mt-3" >
                            <button onClick={this.onForgetPass} type="submit" class="btn btn-info">Lấy Lại Mật Khẩu</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default ForgetPassword;