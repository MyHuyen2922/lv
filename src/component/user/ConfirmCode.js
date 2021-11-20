import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class ConfirmCode extends Component {
    constructor(props){
        super(props);
        this.state = {
            confrimcode: '',
            direct : ''
        }
    }
    onChange= (e) =>{
        e.preventDefault();
        this.setState({confrimcode : e.target.value})
    }
    onConfirmCode = (e) =>{
        e.preventDefault();
        if(this.state.confrimcode === localStorage.getItem('maxacnhan')){
            this.setState({direct: '/resetpassword'})
        }
        else{
            alert("Mã xác nhận không hợp lệ !!!")
        }
    }

    render() {
        if (this.state.direct !== '') {
            return <Redirect to={this.state.direct} />
        }
        return (
            <div>
                <form id="form-confirmcode">
                    <div className="row">
                        <div className="col-6 offset-3">
                            <h2 className="text-center">Nhập mã xác nhận</h2>
                            <div className="col-8 offset-1">
                                <p><i>Hệ thống đã gửi mã xác nhận về email cho bạn, Vui lòng nhập mã xác nhận để lấy lại mật khẩu</i></p>
                                <input type="text" name="confirmcode" onChange={this.onChange} placeholder="Nhập mã xác nhận" className="form-control mailForgetPass" />
                            </div>
                            <div className="col-8 offset-1 mt-3" >
                                <button onClick={this.onConfirmCode} type="submit" class="btn btn-info">Gửi</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default ConfirmCode;