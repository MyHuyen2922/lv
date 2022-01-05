import React, { Component } from 'react';
import UserAPI from '../../API/UserAPI';

class ChangePass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldpass: '',
            newpass: '',
            confirm: ''
        }
    }
    Change = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        })
    }
    onChangePass = (e) => {
        e.preventDefault();
        let thamso = new FormData();
        thamso.append("oldpass", this.state.oldpass);
        thamso.append("newpass", this.state.newpass);
        thamso.append("idkh", localStorage.getItem('idkh'));
        thamso.append("idshipper", localStorage.getItem('idshipper'));
        console.log(localStorage.getItem('idkh'));
        console.log(localStorage.getItem('idshipper'));
        const api = new UserAPI();
        if (this.state.newpass === this.state.confirm) {
            api.ChangePassAPI(thamso)
                .then(response => {
                    console.log(response);
                    if (response[0].code === "200") {
                        alert("Đã đổi mật khẩu ")
                    }
                    else if(response[0].code === "400"){
                        alert("Mật khẩu cũ chưa đúng !!!")
                    }
                    else{
                        alert("Lỗi Server !!!")
                    }
                    this.setState({
                        oldpass: '',
                        newpass: '',
                        confirm: ''
                    })
                })
                .catch(error => {
                    console.log(error);
                })
        }
        else {
            alert("Mật khẩu xác nhận không đúng !!!")
        }
    }
    render() {
        return (
            <div>
                <form>
                <h4 className="text-center mt-3 mb-3">Thay đổi mật khẩu</h4>
                    <div className="row form-group">
                        <label className="col-3 control-label">Mật khẩu cũ</label>
                        <div className="col-9">
                            <input type="password" onChange={this.Change} name="oldpass" value={this.state.oldpass} className="form-control" />
                        </div>
                    </div>
                    <div className="row form-group">
                        <label className="col-3 control-label">Mật khẩu mới</label>
                        <div className="col-9">
                            <input type="password" onChange={this.Change} name="newpass" value={this.state.newpass} className="form-control" />
                        </div>
                    </div>
                    <div className="row form-group">
                        <label className="col-3 control-label">Xác nhận mật khẩu</label>
                        <div className="col-9">
                            <input type="password" onChange={this.Change} name="confirm" value={this.state.confirm} className="form-control" />
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-info" onClick={this.onChangePass}>Lưu thay đổi</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default ChangePass;