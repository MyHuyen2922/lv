import React, { Component } from 'react';
import AdminAPI from '../../API/admin/AdminAPI';

class ShipperMGR extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoten: '',
            email: '',
            mk: '',
            sdt: '',
            dc: ''
        }
    }
    onChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    ListShipper = () => {
        document.getElementById("shipper").innerHTML = "<iframe class='iframeadmin' src='/listshipper'></iframe>"
    }
    CreateShipper = (e) => {
        e.preventDefault();
        let thamso = new FormData();
        thamso.append("hoten", this.state.hoten);
        thamso.append("email", this.state.email);
        thamso.append("mk", this.state.mk);
        thamso.append("sdt", this.state.sdt);
        thamso.append("dc", this.state.dc);
        const api =new AdminAPI();
        api.CreateShipperAPI(thamso)
        .then(response =>{
            console.log(response);
           if(response[0].code === "200"){
            alert("Tạo tài khoản thành công");
            this.setState({
                hoten: '',
                email: '',
                mk: '',
                sdt: '',
                dc: ''
            })
           }
           else{ alert("Tạo tài khoản thất bại");}
        })
        .catch(error =>{
            console.log(error);
        })
    }
    render() {
        return (
           <div>
                <div className="col-11 ml-5 bradmin iframeadmin pb-3">
                <div className="text-right mt-3 mb-3">
                    <a href="/shipperMGR">
                        <button className="btn btn-info mt-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                            </svg>
                        </button> &nbsp;
                    </a>
                    <button className="btn btn-info mt-3" onClick={this.ListShipper}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                        </svg>
                    </button>
                </div>
                <div id="shipper">
                    <div className="col-10 offset-1 bggray">
                        <form>
                            <h3 className="text-center mb-3 mt-2">Tạo tài khoản Shipper</h3>
                            <div className="row form-group">
                                <label className="col-3 control-label">Họ & Tên</label>
                                <div className="col-9">
                                    <input type="text" value={this.state.hoten} name="hoten" onChange={this.onChange} className="form-control" />
                                </div>
                            </div>
                            <div className="row form-group">
                                <label className="col-3 control-label">Email</label>
                                <div className="col-9">
                                    <input type="text" value={this.state.email} name="hoten" name="email" onChange={this.onChange} className="form-control" />
                                </div>
                            </div>
                            <div className="row form-group">
                                <label className="col-3 control-label">Mật Khẩu</label>
                                <div className="col-9">
                                    <input type="password" value={this.state.mk} name="hoten" name="mk" onChange={this.onChange} className="form-control" />
                                </div>
                            </div>
                            <div className="row form-group">
                                <label className="col-3 control-label">Số điện thoại</label>
                                <div className="col-9">
                                    <input type="text" value={this.state.sdt} name="hoten" name="sdt" onChange={this.onChange} className="form-control" />
                                </div>
                            </div>
                            <div className="row form-group">
                                <label className="col-3 control-label">Địa chỉ</label>
                                <div className="col-9">
                                    <input type="text" value={this.state.dc} name="hoten" name="dc" onChange={this.onChange} className="form-control" />
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-success mb-3" onClick={this.CreateShipper}>Tạo tài khoản</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
           </div>
        );
    }
}

export default ShipperMGR;