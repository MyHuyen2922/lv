import React, { Component } from 'react';
import UserAPI from '../../API/UserAPI';
import AdminAPI from '../../API/admin/AdminAPI';
import Chipi from '../../img/chipi.png';

class OrdersAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dish: [],
            allItem: {},
            current_page: 0,
            all_page: 0,
            type: 0,
        }
        this.GetAllItem = this.GetAllItem.bind(this);
        this.getItem = this.getItem.bind(this);
    }
    componentDidMount() {
        this.GetAllItem();
        this.getItem(0, 1);
    }
    getItem = (type, index) => {
        var thamso = new FormData();
        if (type !== 0) {
            thamso.append("condition", type);
        }
        thamso.append("number", index);
        const api = new AdminAPI();
        api.OrdersAPI(thamso)
            .then(response => {
                var arr = [];
                var all_page = response.splice(response.length - 1, response.length);
                console.log(all_page);
                for (var i = 0; i < response.length; i++) {
                    var item = response[i];
                    console.log(item);
                    var idmon = item.idmon.split("|");
                    idmon.splice(0, 1);
                    item.idmon = idmon;
                    var number = item.sl.split("|");
                    number.splice(0, 1);
                    item.sl = number;
                    var giadh = item.giadh.split("|");
                    giadh.splice(0, 1);
                    item.giadh = giadh;
                    arr.push(item);
                }
                this.setState({
                    dish: arr,
                    all_page: all_page[0],
                    current_page: index,
                    type: type,
                });
            })
            .catch(error => {
                console.log(error)
            })
    }
    GetAllItem = () => {
        const api = new UserAPI();
        api.GetAllItemAPI()
            .then(response => {
                console.log(response);
                this.setState({ allItem: response })
            })
            .catch(error => {
                console.log(error);
            })
    }
    ChangePagination = (action) => {
        if (action === "next") {
            if (Number(this.state.current_page) < Number(this.state.all_page)) {
                this.getItem(this.state.type, this.state.current_page + 1);
            }
            else {
                alert("Bạn đang ở cuối trang!");
            }
        }
        else {
            if (Number(this.state.current_page) > 1) {
                this.getItem(this.state.type, this.state.current_page - 1);
            }
            else {
                alert("Bạn đang ở đầu trang!");
            }
        }
    }
    render() {
        const formatNumber = new Intl.NumberFormat('de');
        console.log(this.state.dish);
        console.log(this.state.allItem);
        if (Object.keys(this.state.allItem).length === 0)
            return null
        return (
            <form>
                <div className="m-1">
                    <div className="mt-3 mb-3">
                        <span className="btn btn-info" onClick={this.getItem.bind(this, 0, 1)}>Tất cả</span> &nbsp; &nbsp;
                        <span className="btn btn-info" onClick={this.getItem.bind(this, 'Chờ xác nhận', 1)}>Chờ xác nhận</span>&nbsp; &nbsp;
                        <span className="btn btn-info" onClick={this.getItem.bind(this, 'Đang giao', 1)}>Đang giao</span>&nbsp; &nbsp;
                        <span className="btn btn-info" onClick={this.getItem.bind(this, 'Đã giao', 1)}>Đã giao</span>&nbsp; &nbsp;
                        <span className="btn btn-info" onClick={this.getItem.bind(this, 'Đã hủy', 1)}>Đã hủy</span>
                    </div>
                    <div id="orders">

                        {

                            this.state.dish.length > 0 ? (
                                <div>
                                    <div className="row font-weight-bold">
                                        <div className="col-2 border bggray">Tên món</div>
                                        <div className="col-1 border bggray"> Hình</div>
                                        <div className="col-1 border bggray">Size</div>
                                        <div className="col-1 border bggray"> Giá</div>
                                        <div className="col-1 border bggray">Số lượng</div>
                                        <div className="col-1 border bggray">Khách hàng</div>
                                        <div className="col-1 border bggray">Shipper</div>
                                        <div className="col-2 border bggray">Trạng thái</div>
                                        <div className="col-2 border bggray">Ngày bán</div>
                                    </div>
                                    {
                                        this.state.dish.map((data, index) => {
                                            if (data.trangthai === "Đang giao" || data.trangthai === "Đã giao") {
                                                return (
                                                    <div key={index} className="detailOrders bg-white">
                                                        {
                                                            data.idmon.map((id, index1) =>
                                                                <div key={index1} className="row mb-2 border-bottom">
                                                                    <div className="col-2">{this.state.allItem[id].tenmon}</div>
                                                                    <div className="col-1 mb-2">
                                                                        <img src={"http://localhost:80/" + this.state.allItem[id].hinhanh} className="imgOrdersAdmin" alt="hinhanh" />
                                                                    </div>
                                                                    <div className="col-1">{data.size[index1]}</div>
                                                                    <div className="col-1"> {formatNumber.format(data.giadh[index1])}₫</div>
                                                                    <div className="col-1">{data.sl[index1]}</div>
                                                                    <div className="col-1">{data.idkh}</div>
                                                                    <div className="col-1">{data.idshipper}</div>
                                                                    <div className="col-2 ">{data.trangthai}</div>
                                                                    <div className="col-2 ">{data.ngayban}</div>
                                                                </div>
                                                            )
                                                        }
                                                        <div className="col-12 mt-1 text-right">
                                                            <span className="font-weight-light"><i>Tổng số tiền: </i></span>
                                                            <span className="text-danger tongtienItem">{formatNumber.format(data.tongtien)}₫</span>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            else {
                                                return (
                                                    <div key={index} className="detailOrders bg-white">
                                                        {
                                                            data.idmon.map((id, index1) =>
                                                                <div key={index1} className="row mb-2 border-bottom">
                                                                    <div className="col-2">{this.state.allItem[id].tenmon}</div>
                                                                    <div className="col-1 mb-2">
                                                                        <img src={"http://localhost:80/" + this.state.allItem[id].hinhanh} className="imgOrdersAdmin" alt="hinhanh" />
                                                                    </div>
                                                                    <div className="col-1">{data.size[index1]}</div>
                                                                    <div className="col-1"> {formatNumber.format(data.giadh[index1])}₫</div>
                                                                    <div className="col-1">{data.sl[index1]}</div>
                                                                    <div className="col-1">{data.idkh}</div>
                                                                    <div className="col-1">{data.idshipper}</div>
                                                                    <div className="col-2 ">{data.trangthai}</div>
                                                                    <div className="col-2 ">{data.ngayban}</div>
                                                                </div>
                                                            )
                                                        }
                                                        <div className="col-12 mt-1 text-right">
                                                            <span className="font-weight-light"><i>Tổng số tiền: </i></span>
                                                            <span className="text-danger tongtienItem">{formatNumber.format(data.tongtien)}₫</span>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        }
                                        )
                                    }
                                       <div className="col-12 text-center">
                            <span className="border border-secondary p-1  pl-2 pr-2  mr-1" onClick={this.ChangePagination.bind(this, 'previous')}>	&lt;</span>
                            <span className="border border-secondary p-1 mr-1 bg-white">{"Trang " + this.state.current_page + "/" + this.state.all_page}</span>
                            <span className="border border-secondary p-1 pl-2 pr-2 " onClick={this.ChangePagination.bind(this, 'next')}>&gt;</span>
                        </div>
                                </div>
                                
                            ) : (
                                <div className="text-center mt-5">
                                    <img src={Chipi} alt="hinhanh" className="chipi" />
                                    <h4><i>Chưa có đơn hàng</i></h4>
                                </div>
                            )
                        }
                     
                    </div>
                </div>
            </form>
        );
    }
}

export default OrdersAdmin;