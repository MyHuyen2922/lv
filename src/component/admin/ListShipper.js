import React, { Component } from 'react';
import AdminAPI from '../../API/admin/AdminAPI';
import Chipi from '../../img/chipi.png';

class ListShipper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shipper: [],
        }
    }
    componentDidMount() {
        const api = new AdminAPI();
        api.ListShipperAPI()
            .then(response => {
                console.log(response);
                this.setState({
                    shipper: response,
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
    DeleteShipper = (index) => {
        let thamso = new FormData();
        thamso.append("idshipper", index);
        const api = new AdminAPI();
        api.DeleteShipperAPI(thamso)
            .then(response => {
                console.log(response);
                if (response[0].code === '200') {
                    this.componentDidMount();
                    alert("Đã xóa khỏi danh sách Shipper !!!");
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
        console.log(this.state.shipper);
        return (
            <div>
                <h4 className="text-center mt-3 mb-3">Danh Sách Shipper</h4>
                {
                    this.state.shipper.length > 0 ? (
                        this.state.shipper.map((data, index) => {
                            return (
                                <div key={index} className="row col-12 border">
                                    <div className="col-2 border-right">{data.hoten}</div>
                                    <div className="col-1 border-right mt-1 mb-1"><img src={'http://localhost:80/' + data.avatar} alt="avt" className="hinhanhAdmin" /></div>
                                    <div className="col-3 border-right text-hidden">{data.email}</div>
                                    <div className="col-2 border-right">{data.sdt}</div>
                                    <div className="col-3 border-right">{data.dc}</div>
                                    <div className="col-1">
                                        <span onClick={this.DeleteShipper.bind(this, data.idshipper)}>
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
        );
    }
}

export default ListShipper;