import React, { Component } from 'react';
import UserAPI from '../../API/UserAPI';
import Chipi from '../../img/chipi.png';
import Comment from '../../component/user/Comment';

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dish: [],
            cmt: '',
            allItem: {},
        }
        this.GetAllItem = this.GetAllItem.bind(this);
        this.getItem = this.getItem.bind(this);
    }
    componentDidMount() {
        this.GetAllItem();
        this.getItem(0);
    }
    getItem = (type) => {
        var thamso = new FormData();
        if (type !== 0) {
            thamso.append("condition", type);
            thamso.append("idkh", localStorage.getItem('idkh'))
        }
        thamso.append("idkh", localStorage.getItem('idkh'))
        const api = new UserAPI();
        api.OrdersAPI(thamso)
            .then(response => {
                console.log(response);
                var arr = [];
                for (var i = 0; i < response.length; i++) {
                    var item = response[i];
                    var idmon = item.idmon.split("|");
                    idmon.splice(0, 1);
                    item.idmon = idmon;
                    var number = item.sl.split("|");
                    number.splice(0, 1);
                    item.sl = number;
                    var size = item.size.split("|");
                    size.splice(0, 1);
                    item.size = size;
                    var giadh = item.giadh.split("|");
                    giadh.splice(0, 1);
                    item.giadh = giadh;
                    arr.push(item);
                }
                this.setState({ dish: arr });
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

    DeleteOrders = (index) => {
        let thamso = new FormData();
        thamso.append("iddh", index);
        thamso.append("idkh", localStorage.getItem('idkh'));
        const api = new UserAPI();
        api.DeleteOrdersAPI(thamso)
            .then(response => {
                console.log(response);
                alert("Đã hủy đơn hàng !!!");
            })
            .catch(error => {
                console.log(error)
            })
        this.componentDidMount();
        window.scrollTo(0, 0);
    }
    onChange = (e) => {
        e.preventDefault();
        this.setState({ cmt: e.target.value })
    }
    Comment = (e) => {
        e.preventDefault();
        let thamso = new FormData();
        thamso.append("idkh", localStorage.getItem('idkh'));
        thamso.append("idmon", e.target.value);
        thamso.append("cmt", this.state.cmt);
        console.log(e.target.value);
        console.log(this.state.cmt);
        const api = new UserAPI();
        api.CommentAPI(thamso)
            .then(response => {
                console.log(response);
                if (response[0].code === '200') {
                    alert("Đã gửi bình luận !!!")
                }

            })
            .catch(error => {
                console.log(error);
            })
    }
    Delivered = (index) => {
        let thamso = new FormData();
        thamso.append("iddh", index);
        const api = new UserAPI();
        api.DeliveredAPI(thamso)
            .then(response => {
                console.log(response);
                if (response[0].code === "200") {
                    alert("Nhận món thành công !!!");
                }
                else {
                    alert("Lỗi server");
                }
            })
            .catch(error => {
                console.log(error)
            })
        window.scrollTo(0, 0);
    }
    render() {
        const formatNumber = new Intl.NumberFormat('de');
        console.log(this.state.dish);
        if (Object.keys(this.state.allItem).length === 0)
            return null
        return (
            <form>
                <div className="br">
                    <div>
                        <nav className="row navbar navbar-expand-lg navbar-light nav">
                            <div className="container-fluid">
                                <div className="collapse navbar-collapse " id="navbarNav">
                                    <ul className="navbar-nav text-center row col-12">
                                        <li className="nav-item col-2 ml-5">
                                            <p className="nav-link active" aria-current="page" onClick={this.getItem.bind(this, 0)}>Tất cả</p>
                                        </li>
                                        <li className="nav-item col-2">
                                            <p className="nav-link" onClick={this.getItem.bind(this, 'Chờ xác nhận')}>Chờ xác nhận</p>
                                        </li>
                                        <li className="nav-item col-2 ml-5">
                                            <p className="nav-link" onClick={this.getItem.bind(this, 'Đang giao')}>Đang giao</p>
                                        </li>
                                        <li className="nav-item col-2 ml-5">
                                            <p className="nav-link" onClick={this.getItem.bind(this, 'Đã giao')}>Đã giao</p>
                                        </li>
                                        <li className="nav-item col-2 ml-5">
                                            <p className="nav-link" onClick={this.getItem.bind(this, 'Đã hủy')}>Đã hủy</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div id="orders">
                        {
                            this.state.dish.length > 0 ? (
                                this.state.dish.map((data, index) => {
                                    if (data.trangthai === "Chờ xác nhận") {
                                        if (data.hinhthuc === "Giao hàng") {
                                            return (
                                                <div className="row bg-white detailOrders">
                                                    <i className="font-weight-light mb-1">{data.trangthai}</i>
                                                    {
                                                        data.idmon.map((id, index1) =>
                                                            <div className="row col-12 mb-2 border-bottom">
                                                                <div className="col-1 mb-2">
                                                                    <img src={"http://localhost:80/" + this.state.allItem[id].hinhanh} className="imgOrders" alt="hinhanh" />
                                                                </div>
                                                                <div className="col-9">
                                                                    <p className="ttmonOrders">{this.state.allItem[id].tenmon}</p>
                                                                    <p className="text-danger ttmonOrders"> {formatNumber.format(data.giadh[index1])}₫</p>
                                                                    <p className="ttmonOrders">x{data.sl[index1]}</p>
                                                                    <p className="ttmonOrders font-weight-light"><i>Size: {data.size[index1]}</i></p>
                                                                </div>
                                                                <div className="col-2 text-right">
                                                                    <span className="text-danger tongtienItem">{formatNumber.format(data.giadh[index1] * data.sl[index1])}₫</span>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    <p className="col-12 font-weight-light font-italic">{data.ghichu}</p>

                                                    <div className="col-12 mt-1 text-right">
                                                        <span className="font-weight-light"><i>Tổng số tiền món: </i></span>
                                                        <span className="tongtienItem">{formatNumber.format(data.tongtien - data.tienship)}₫</span>
                                                    </div>
                                                    <div className="col-12 mt-1 text-right">
                                                        <span className="font-weight-light"><i>Tiền phí vận chuyển: </i></span>
                                                        <span className="tongtienItem">{formatNumber.format(data.tienship)}₫</span>
                                                    </div>
                                                    <div className="col-12 mt-1 text-right">
                                                        <span className="font-weight-light"><i>Tổng tiền thanh toán: </i></span>
                                                        <span className="text-danger tongtien">{formatNumber.format(data.tongtien)}₫</span>
                                                    </div>
                                                    <div className="col-12 text-right mt-2">
                                                        <button onClick={this.DeleteOrders.bind(this, data.iddh)} className="btn btn-primary">Hủy đơn hàng</button>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        else {
                                            return (
                                                <div className="row bg-white detailOrders">
                                                    <i className="font-weight-light mb-1">{data.trangthai}</i>
                                                    {
                                                        data.idmon.map((id, index1) =>
                                                            <div className="row col-12 mb-2 border-bottom">
                                                                <div className="col-1 mb-2">
                                                                    <img src={"http://localhost:80/" + this.state.allItem[id].hinhanh} className="imgOrders" alt="hinhanh" />
                                                                </div>
                                                                <div className="col-9">
                                                                    <p className="ttmonOrders">{this.state.allItem[id].tenmon}</p>
                                                                    <p className="text-danger ttmonOrders"> {formatNumber.format(data.giadh[index1])}₫</p>
                                                                    <p className="ttmonOrders">x{data.sl[index1]}</p>
                                                                    <p className="ttmonOrders font-weight-light"><i>Size: {data.size[index1]}</i></p>
                                                                </div>
                                                                <div className="col-2 text-right">
                                                                    <span className="text-danger tongtienItem">{formatNumber.format(data.giadh[index1] * data.sl[index1])}₫</span>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    <p className="col-12 font-weight-light font-italic">{data.ghichu}</p>
                                                    <div className="col-12 mt-1 text-right">
                                                        <span className="font-weight-light"><i>Tổng tiền thanh toán: </i></span>
                                                        <span className="text-danger tongtien">{formatNumber.format(data.tongtien)}₫</span>
                                                    </div>
                                                    <div className="col-12 text-right mt-2">
                                                        <button onClick={this.Delivered.bind(this, data.iddh)} className="btn btn-success">Đã nhận</button> &nbsp;
                                                        <button onClick={this.DeleteOrders.bind(this, data.iddh)} className="btn btn-primary">Hủy đơn hàng</button>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }
                                    else if (data.trangthai === "Đã giao") {
                                        if (data.hinhthuc === "Nhận tại cửa hàng") {
                                            return (
                                                <div className="row bg-white detailOrders">
                                                    <i className="font-weight-light mb-1">{data.trangthai}</i>
                                                    {
                                                        data.idmon.map((id, index1) =>
                                                            <div className="row col-12 mb-2 border-bottom">
                                                                <div className="col-1 mb-2">
                                                                    <img src={"http://localhost:80/" + this.state.allItem[id].hinhanh} className="imgOrders" alt="hinhanh" />
                                                                </div>
                                                                <div className="col-9">
                                                                    <p className="ttmonOrders">{this.state.allItem[id].tenmon}</p>
                                                                    <p className="text-danger ttmonOrders"> {formatNumber.format(data.giadh[index1])}₫</p>
                                                                    <p className="ttmonOrders">x{data.sl[index1]}</p>
                                                                    <p className="ttmonOrders font-weight-light"><i>Size: {data.size[index1]}</i></p>
                                                                </div>
                                                                <div className="col-2 text-right">
                                                                    <span className="text-danger tongtienItem">{formatNumber.format(data.giadh[index1] * data.sl[index1])}₫</span>
                                                                </div>
                                                                <Comment idmon={id} />
                                                            </div>
                                                        )
                                                    }
                                                    <div className="col-12 mt-1 text-right">
                                                        <span className="font-weight-light"><i>Tổng tiền thanh toán: </i></span>
                                                        <span className="text-danger tongtien">{formatNumber.format(data.tongtien)}₫</span>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        else {
                                            return (
                                                <div className="row bg-white detailOrders">
                                                    <i className="font-weight-light mb-1">{data.trangthai}</i>
                                                    {
                                                        data.idmon.map((id, index1) =>
                                                            <div className="row col-12 mb-2 border-bottom">
                                                                <div className="col-1 mb-2">
                                                                    <img src={"http://localhost:80/" + this.state.allItem[id].hinhanh} className="imgOrders" alt="hinhanh" />
                                                                </div>
                                                                <div className="col-9">
                                                                    <p className="ttmonOrders">{this.state.allItem[id].tenmon}</p>
                                                                    <p className="text-danger ttmonOrders"> {formatNumber.format(data.giadh[index1])}₫</p>
                                                                    <p className="ttmonOrders">x{data.sl[index1]}</p>
                                                                    <p className="ttmonOrders font-weight-light"><i>Size: {data.size[index1]}</i></p>
                                                                </div>
                                                                <div className="col-2 text-right">
                                                                    <span className="text-danger tongtienItem">{formatNumber.format(data.giadh[index1] * data.sl[index1])}₫</span>
                                                                </div>
                                                                <Comment idmon={id} />
                                                            </div>
                                                        )
                                                    }
                                                    <div className="col-12 mt-1 text-right">
                                                        <span className="font-weight-light"><i>Tổng số tiền món: </i></span>
                                                        <span className="tongtienItem">{formatNumber.format(data.tongtien - data.tienship)}₫</span>
                                                    </div>
                                                    <div className="col-12 mt-1 text-right">
                                                        <span className="font-weight-light"><i>Tiền phí vận chuyển: </i></span>
                                                        <span className="tongtienItem">{formatNumber.format(data.tienship)}₫</span>
                                                    </div>
                                                    <div className="col-12 mt-1 text-right">
                                                        <span className="font-weight-light"><i>Tổng tiền thanh toán: </i></span>
                                                        <span className="text-danger tongtien">{formatNumber.format(data.tongtien)}₫</span>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }
                                    else {
                                        if (data.hinhthuc === 'Nhận tại cửa hàng') {
                                            return (
                                                <div className="row bg-white detailOrders">
                                                    <i className="font-weight-light mb-1">{data.trangthai}</i>
                                                    {
                                                        data.idmon.map((id, index1) =>
                                                            <div className="row col-12 mb-2 border-bottom">
                                                                <div className="col-1 mb-2">
                                                                    <img src={"http://localhost:80/" + this.state.allItem[id].hinhanh} className="imgOrders" alt="hinhanh" />
                                                                </div>
                                                                <div className="col-9">
                                                                    <p className="ttmonOrders">{this.state.allItem[id].tenmon}</p>
                                                                    <p className="text-danger ttmonOrders"> {formatNumber.format(data.giadh[index1])}₫</p>
                                                                    <p className="ttmonOrders">x{data.sl[index1]}</p>
                                                                    <p className="ttmonOrders font-weight-light"><i>Size: {data.size[index1]}</i></p>
                                                                </div>
                                                                <div className="col-2 text-right">
                                                                    <span className="text-danger tongtienItem">{formatNumber.format(data.giadh[index1] * data.sl[index1])}₫</span>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    <p className="col-12 font-weight-light font-italic">{data.ghichu}</p>
                                                    <div className="col-12 mt-1 text-right">
                                                        <span className="font-weight-light"><i>Tổng tiền thanh toán: </i></span>
                                                        <span className="text-danger tongtien">{formatNumber.format(data.tongtien)}₫</span>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        else {
                                            return (
                                                <div className="row bg-white detailOrders">
                                                    <i className="font-weight-light mb-1">{data.trangthai}</i>
                                                    {
                                                        data.idmon.map((id, index1) =>
                                                            <div className="row col-12 mb-2 border-bottom">
                                                                <div className="col-1 mb-2">
                                                                    <img src={"http://localhost:80/" + this.state.allItem[id].hinhanh} className="imgOrders" alt="hinhanh" />
                                                                </div>
                                                                <div className="col-9">
                                                                    <p className="ttmonOrders">{this.state.allItem[id].tenmon}</p>
                                                                    <p className="text-danger ttmonOrders"> {formatNumber.format(data.giadh[index1])}₫</p>
                                                                    <p className="ttmonOrders">x{data.sl[index1]}</p>
                                                                    <p className="ttmonOrders font-weight-light"><i>Size: {data.size[index1]}</i></p>
                                                                </div>
                                                                <div className="col-2 text-right">
                                                                    <span className="text-danger tongtienItem">{formatNumber.format(data.giadh[index1] * data.sl[index1])}₫</span>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    <p className="col-12 font-weight-light font-italic">{data.ghichu}</p>
                                                    <div className="col-12 mt-1 text-right">
                                                        <span className="font-weight-light"><i>Tổng số tiền món: </i></span>
                                                        <span className="tongtienItem">{formatNumber.format(data.tongtien - data.tienship)}₫</span>
                                                    </div>
                                                    <div className="col-12 mt-1 text-right">
                                                        <span className="font-weight-light"><i>Tiền phí vận chuyển: </i></span>
                                                        <span className="tongtienItem">{formatNumber.format(data.tienship)}₫</span>
                                                    </div>
                                                    <div className="col-12 mt-1 text-right">
                                                        <span className="font-weight-light"><i>Tổng tiền thanh toán: </i></span>
                                                        <span className="text-danger tongtien">{formatNumber.format(data.tongtien)}₫</span>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }
                                }
                                )
                            ) : (
                                <div className="text-center mt-5">
                                    <h4><i>Chưa có đơn hàng</i></h4>
                                    <img src={Chipi} alt="hinhanh" className="chipi" />
                                </div>
                            )
                        }
                    </div>
                </div>
            </form>
        );
    }
}

export default Orders;