import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowLogin from '../ShowLogin';
import Search from '../Search';
import Logo from '../../img/logo.jpg'
import UserAPI from '../../API/UserAPI';
import LoginAPI from '../../API/LoginAPI';
import Edit from '../../img/edit.png';

class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoten: '',
            email: '',
            sdt: '',
            dc: '',
            imagePreviewUrl: "",
            file: "",
            avatar: ''
        }
        this.onEditAccount = this.onEditAccount.bind(this);
    }

    componentDidMount() {
        let thamso = new FormData();
        thamso.append("idkh", localStorage.getItem('idkh'));
        const api = new LoginAPI();
        api.ShowAccountAPI(thamso)
            .then(response => {
                this.setState({
                    hoten: response.data[0].hoten,
                    email: response.data[0].email,
                    sdt: response.data[0].sdt,
                    dc: response.data[0].dc,
                    avatar: response.data[0].avatar
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    onEditAccount = (e) => {
        e.preventDefault();
        let data = document.getElementById('form-account');
        let thamso = new FormData(data);
        thamso.append("idkh", localStorage.getItem('idkh'));
        const api = new UserAPI();
        api.EditAccountAPI(thamso)
            .then(response => {
                console.log(response);
                if (response.data[0].code === "200") {
                    if(document.getElementById('icon-add-img').value !== ""){
                    localStorage.setItem('username', this.state.hoten);
                    localStorage.setItem('avatar', "img/" + this.state.avatar);
                    }
                    else if(document.getElementById('icon-add-img').value === ""){
                        localStorage.setItem('username', this.state.hoten);
                    }
                    this.componentDidMount();
                    alert("Đã cập nhật !");
                    window.location.reload();
                }
                else {
                    alert("Cập nhật thất bại !")
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
    _handleImageChange(h) {
        h.preventDefault();

        let reader = new FileReader();
        let file = h.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
                avatar: file.name,
            });
        }
        if (h.target.files[0]) {
            reader.readAsDataURL(file);
        }
    }
    onChange=(e)=>{
        this.setState({
            hoten: e.target.value,
        })
    }
    ChangePass = () =>{
        document.getElementById("idEditAcc").innerHTML = "<iframe src='/changepass'></iframe>";
    }
    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} className="preAvatar" alt="imgPre" />);
        } else {
            $imagePreview = (<div className="previewText"><img className="hinhanhAcc" alt="img" src={"http://localhost:80/" + this.state.avatar} /></div>);
        }
        if (localStorage.getItem('idkh') === null) {
            return <Redirect to="/" />
        }
        return (
            <div className="row container-fuild br">
                <div className="row col-12 mb-2">
                    <div className="col-2 mt-2">
                        <Link to="/">
                            <img src={Logo} className="logo" alt="logo" />
                        </Link>

                    </div>
                    <div className="col-7 text-center">
                        <Search />
                    </div>
                    <div className="col-3 mt-3">
                        <ShowLogin />
                    </div>
                </div>
                <div className="row col-12 myaccount">
                    <div className="row col-2 offset-1 mt-3 mb-3">
                        <div className="col-12 ttAccount">
                            <img src={"http://localhost:80/" + localStorage.getItem('avatar')} alt="Avatar" className="avatarAccount" />
                            <h5 className="text-truncate">{this.state.hoten}</h5><br />
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                            </svg>
                            <a href="/myaccount"><span className="fst-italic"><i> Sửa Hồ Sơ</i></span></a>
                        </div>
                        <div className="row col-12 mt-3">
                        <a href="/myaccount">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person text-primary" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                            </svg>&nbsp; Tài Khoản Của Tôi

                        </a>
                          
                            <div className="col-11 offset-1 "><br />
                                <a href="/myaccount"><i>Hồ Sơ</i></a><br /><br />
                                <Link to="#"><i>Ngân Hàng</i></Link><br /><br />
                                <Link to="#" onClick ={this.ChangePass}><i>Đổi Mật Khẩu</i></Link><br /><br />
                            </div>
                        </div>
                        <div>
                            <Link to="/ordersuser">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-receipt-cutoff text-success" viewBox="0 0 16 16">
                                <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zM11.5 4a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
                                <path d="M2.354.646a.5.5 0 0 0-.801.13l-.5 1A.5.5 0 0 0 1 2v13H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1H15V2a.5.5 0 0 0-.053-.224l-.5-1a.5.5 0 0 0-.8-.13L13 1.293l-.646-.647a.5.5 0 0 0-.708 0L11 1.293l-.646-.647a.5.5 0 0 0-.708 0L9 1.293 8.354.646a.5.5 0 0 0-.708 0L7 1.293 6.354.646a.5.5 0 0 0-.708 0L5 1.293 4.354.646a.5.5 0 0 0-.708 0L3 1.293 2.354.646zm-.217 1.198.51.51a.5.5 0 0 0 .707 0L4 1.707l.646.647a.5.5 0 0 0 .708 0L6 1.707l.646.647a.5.5 0 0 0 .708 0L8 1.707l.646.647a.5.5 0 0 0 .708 0L10 1.707l.646.647a.5.5 0 0 0 .708 0L12 1.707l.646.647a.5.5 0 0 0 .708 0l.509-.51.137.274V15H2V2.118l.137-.274z"/>
                                </svg> &nbsp;
                                Đơn Mua</Link>
                        </div>
                    </div>
                    <div id="idEditAcc" className="col-7 bg-white mt-3 mb-3">
                        <form id="form-account">
                        <h5>Hồ Sơ Của Tôi</h5>
                        <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                        <div className="row editAccount">
                            <div className="col-7">
                               
                                    <div className="row form-group">
                                        <label className="col-3 mt-4 text-right control-label">Email</label>
                                        <div className="col-9  mt-4">
                                            <input type="text" defaultValue={this.state.email} name="email" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <label className="col-3 text-right control-label">Họ & tên</label>
                                        <div className="col-9">
                                            <input type="text" onChange={this.onChange} defaultValue={this.state.hoten} name="hoten" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <label className="col-3 text-right control-label">Số điện thoại</label>
                                        <div className="col-9">
                                            <input type="text" defaultValue={this.state.sdt} name="sdt" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <label className="col-3 text-right control-label">Địa chỉ</label>
                                        <div className="col-9">
                                            <input type="text" defaultValue={this.state.dc} name="dc" className="form-control" />
                                        </div>
                                    </div>                           
                                </div>
                            <div className="col-5">
                            <div className="row tenhinh">
                                        <div className=" col-12 imgPreAcc">
                                            {$imagePreview}
                                        </div>
                                    <div className="col-12">
                                        <input
                                            id="icon-add-img"
                                            type="file"
                                            onChange={(h) => this._handleImageChange(h)}
                                            name="avatar"
                                            className="hinhanhEdit" />
                                                <label htmlFor="icon-add-img">
                                            <img src={Edit} className="editImg" alt="add"/>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <button onClick={this.onEditAccount} className="btn btn-info ml-5 mb-3">Lưu</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyAccount;