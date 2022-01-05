import React, { Component } from 'react';
import AdminAPI from '../../API/admin/AdminAPI';
import Chipi from '../../img/chipi.png';

class ListUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listuser: []
        }
    }
    componentDidMount() {
        const api = new AdminAPI();
        api.ListUserAPI()
            .then(response => {
                console.log(response);
                this.setState({
                    listuser: response,
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
    DeleteUser = (index) => {
        let thamso = new FormData();
        thamso.append("idkh", index);
        const api = new AdminAPI();
        api.DeleteUserAPI(thamso)
            .then(response => {
                console.log(response);
                if (response[0].code === '200') {
                    this.componentDidMount();
                    alert("Đã xóa khỏi danh sách Khách hàng !!!");
                }
                else {
                    alert("Vui lòng thử lại !!!")
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    render() {
        return (
            <div>
                <div className="col-12 p-2 bradmin">
                    <div className="text-center mb-3 mt-3"><h4>Danh Sách Khách Hàng</h4></div>
                    <div className="row col-12 ml-1 text-center  font-weight-bold">
                        <div className="col-1 border p-2 bggray">Mã</div>
                        <div className="col-2 border p-2 bggray ">Tên khách hàng</div>
                        <div className="col-1 border p-2 bggray">Avatar</div>
                        <div className="col-3 border p-2 bggray text-hidden">Email</div>
                        <div className="col-2 border p-2 bggray">Số điện thoại</div>
                        <div className="col-2 border p-2 bggray">Địa chỉ</div>
                        <div className="col-1 border p-2 bggray">
                        </div> 
                    </div>
                    {
                        this.state.listuser.length > 0 ? (
                            this.state.listuser.map((data, index) => {
                                return (
                                    <div key={index} className="row col-12 ml-1 text-center">
                                        <div className="col-1 border">{data.idkh}</div>
                                        <div className="col-2 border">{data.hoten}</div>
                                        <div className="col-1 border"><img src={'http://localhost:80/' + data.avatar} alt="avt" className="hinhanhAdmin" /></div>
                                        <div className="col-3 border text-hidden">{data.email}</div>
                                        <div className="col-2 border">{data.sdt}</div>
                                        <div className="col-2 border">{data.dc}</div>
                                        <div className="col-1 border">
                                            <span onClick={this.DeleteUser.bind(this, data.idkh)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-trash mt-2 ml-3 text-danger" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="text-center mt-5">
                                <h4><i>Trống</i></h4>
                                <img src={Chipi} alt="chipi" className="chipi" />
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default ListUser;