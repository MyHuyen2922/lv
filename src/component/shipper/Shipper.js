import React, { Component } from 'react';
import Chipi from '../../img/chipi.png';
import UserAPI from '../../API/UserAPI';
import ShipperAPI from '../../API/ShipperAPI';
import ShipperAcc from './ShipperAcc';
import Logout from '../Logout';

class Shipper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dish: [],
            allItem: {},
            class_content: "row content-visible",
            class_acc: "row hidden",
            tab: "Chờ xác nhận",
            class_shipper: "col-12 visible-shipper",
            class_ctdh: 'row hidden-ctdh',
            dataDetail: [],
        }
        this.GetAllItem = this.GetAllItem.bind(this);
        this.getItem = this.getItem.bind(this);
    }
    componentDidMount() {
        this.GetAllItem();
        //this.getItem("Chờ xác nhận");
        this.componentSetTimeOut();
    }
    componentSetTimeOut() {
        this.getItem(this.state.tab);
        setTimeout(() => {
            this.componentSetTimeOut()
        }, 5000);
    }
    getItem = (type) => {
        var thamso = new FormData();
        thamso.append("condition", type);
        const api = new ShipperAPI();
        api.OrdersAPI(thamso)
            .then(response => {
                console.log(response);
                var arr = [];
                for (var i = 0; i < response.length; i++) {
                    var item = response[i];
                    console.log(item);
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
                console.log(arr);
                this.setState({
                    dish: arr,
                    tab: type,
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
    onReceipt = (index, trangthai) => {
        console.log(trangthai);
        let thamso = new FormData();
        thamso.append("iddh", index);
        thamso.append("idshipper", localStorage.getItem('idshipper'));
        const api = new ShipperAPI();
        api.ReceiptAPI(thamso)
            .then(response => {
                console.log(response);
                if (response[0].code === "200") {
                    alert("Đã nhận đơn !!!");
                    this.componentDidMount();
                    window.scrollTo(0, 0);
                }
                else {
                    alert("Lỗi server");
                }

            })
            .catch(error => {
                console.log(error)
            })
    }
    Delivered = (index) => {
        let thamso = new FormData();
        thamso.append("iddh", index);
        thamso.append("idshipper", localStorage.getItem('idshipper'));
        const api = new ShipperAPI();
        api.DeliveredAPI(thamso)
            .then(response => {
                console.log(response);
                if (response[0].code === "200") {
                    alert("Đơn giao thành công !!!");
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

    ChangePass = () => {
        document.getElementById("shipper").innerHTML = "<iframe src='/changepassshipper'></iframe>";
    }
    ShipperAcc = () => {
        document.getElementById("shipper").innerHTML = "<iframe src='/shipperacc'></iframe>";
    }
    hiddenShipperAcc = () => {
        this.setState({
            class_content: 'row content-visible',
            class_acc: 'hidden'
        })
    }
    onDetailOrders = (index) => {
        let data = this.state.dish;
        console.log(data[index]);
        this.setState({
            class_shipper: "br hidden-shipper",
            class_ctdh: 'row col-10 offset-1 mt-5 visible-ctdh',
            dataDetail: data[index],
        })
    }
    hiddenDetail = () => {
        this.setState({
            class_shipper: " col-12 visible-shipper",
            class_ctdh: 'row col-12 hidden-ctdh',
        })
    }
    render() {
        console.log(this.state.dataDetail);
        const formatNumber = new Intl.NumberFormat('de');
        return (
            <div>
                <div className={this.state.class_ctdh}>
                    <div className="ml-3 mt-1 col-12 text-right">
                        <p onClick={this.hiddenDetail}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg text-danger" viewBox="0 0 16 16">
                                <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                            </svg>
                        </p>
                    </div>
                    <h4 className="col-12 text-center">Chi tiết đơn hàng</h4>
                    <p className="row col-12 font-italic">Tên khách hàng: {this.state.dataDetail.hotennhan}</p>
                    <p className="row col-12 font-italic">Số điện thoại: {this.state.dataDetail.sdtnhan}</p>
                    <p className="row col-12 font-italic">Địa chỉ: {this.state.dataDetail.dcnhan}</p>
                    <div className="row col-12">
                        <h5 className="col-12 text-center">Danh sách món</h5>
                        {
                            this.state.dataDetail.length === 0 ? (null) : (
                                this.state.dataDetail.idmon.map((data, index) =>
                                    <div className="row col-12">
                                        <div className="col-2 ml-5 border">{this.state.allItem[data].tenmon}</div>
                                        <div className="col-1 border">
                                            <img src={"http://localhost:80/" + this.state.allItem[data].hinhanh} className="imgOrdersAdmin" alt="hinhanh" />
                                        </div>
                                        <div className="col-1 border">{this.state.dataDetail.size[index]}</div>
                                        <div className="col-2 border"> {formatNumber.format(this.state.dataDetail.giadh[index])}₫</div>
                                        <div className="col-1 border">{this.state.dataDetail.sl[index]}</div>
                                        <div className="col-2 border">{this.state.dataDetail.trangthai}</div>
                                        <div className="col-2 border">{this.state.dataDetail.ngayban}</div>
                                    </div>
                                ))}
                    </div>
                    <div className="col-12 mt-1 text-right">
                        <span className="font-weight-light"><i>Tổng tiền món: </i></span>
                        <span className="text-danger tongtienItem">{formatNumber.format(this.state.dataDetail.tongtien - this.state.dataDetail.tienship)}₫</span>
                    </div>
                    <div className="col-12 mt-1 text-right">
                        <span className="font-weight-light"><i>Tiền vận chuyển: </i></span>
                        <span className="text-danger tongtienItem">{formatNumber.format(this.state.dataDetail.tienship)}₫</span>
                    </div>
                    <div className="col-12 mt-1 text-right border-top">
                        <span className="font-weight-light"><i>Tổng thanh toán: </i></span>
                        <span className="text-danger tongtien">{formatNumber.format(Number(this.state.dataDetail.tongtien))}₫</span>
                    </div>
                </div>
                <div className={this.state.class_shipper}>
                    <div className="row col-12 bg-yellow p-3">
                        <div className="col-3 ml-5 text-center border border-secondary iframeadmin bg-white">
                            <div className="col-12 text-center">
                                <img src={"http://localhost:80/" + localStorage.getItem('avatar')} alt="Avatar" className="logoadmin mt-3" />
                                <h5 className="text-truncate">{localStorage.getItem('username')}</h5><br />
                                <a href="/shipper"><p className="listfunc dropdown-item">Đơn Hàng</p></a>
                                <p className="listfunc dropdown-item" onClick={this.ShipperAcc}>Tài khoản của tôi</p>
                                <p className="listfunc dropdown-item" onClick={this.ChangePass}>Đổi Mật Khẩu</p>
                                <p className="listfunc dropdown-item"> <Logout /></p>
                            </div>
                        </div>
                        <div id="shipper" className="col-8 ml-3 border border-secondary adminRight bg-white content-visible">
                            <form>
                                <div>
                                   <div className="row col-12">
                                    <div className="col-8">
                                        <p className="btn btn-info mt-3 mr-3 mb-3" onClick={this.getItem.bind(this, 'Chờ xác nhận')}>Chờ xác nhận</p>
                                        <p className="btn btn-info mt-3 mr-3 mb-3" onClick={this.getItem.bind(this, 'now')}>Đơn hôm nay</p>
                                        <p className="btn btn-info mt-3 mr-3 mb-3" onClick={this.getItem.bind(this, 'Đang giao')}>Đang giao</p>
                                        <p className="btn btn-info mt-3 mb-3" onClick={this.getItem.bind(this, 'Đã giao')}>Đơn của bạn</p>
                                    </div>
                                    <div class="dropdown col-4  mt-3 mb-3 group">
                                        <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                           Nhóm đơn hàng
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a onClick={this.getItem.bind(this, 'ninh kieu')} class="dropdown-item" href="#">Ninh Kiều</a>
                                            <a onClick={this.getItem.bind(this, 'binh thuy')} class="dropdown-item" href="#">Bình Thủy</a>
                                            <a onClick={this.getItem.bind(this, 'cai rang')} class="dropdown-item" href="#">Cái Răng</a>
                                            <a onClick={this.getItem.bind(this, 'o mon')} class="dropdown-item" href="#">Ô Môn</a>
                                        </div>
                                    </div>
                                   </div>
                                   
                                    <div id="orders">
                                        <div className="row col-12 headerorders_shipper">
                                            <div className="col-3  ml-3">Tên món</div>
                                            <div className="col-1 ">Ảnh</div>
                                            <div className="col-1 ">Size</div>
                                            <div className="col-1 ">Giá</div>
                                            <div className="col-1 ">SL</div>
                                            <div className="col-2 ">Trạng thái</div>
                                            <div className="col-2">Ngày bán</div>
                                        </div>
                                        {
                                            this.state.dish.length > 0 ? (
                                                this.state.dish.map((data, index) => {
                                                    if (data.trangthai === "Chờ xác nhận") {

                                                        return (
                                                            <div key={index} className="detailOrders bggray">
                                                                {
                                                                    data.idmon.map((id, index1) =>
                                                                        <div className="row mb-2 border-bottom">
                                                                            <div className="col-3">{this.state.allItem[id].tenmon}</div>
                                                                            <div className="col-1 mb-2">
                                                                                <img src={"http://localhost:80/" + this.state.allItem[id].hinhanh} className="imgOrdersAdmin" alt="hinhanh" />
                                                                            </div>
                                                                            <div className="col-1">{data.size[index1]}</div>
                                                                            <div className="col-1"> {formatNumber.format(data.giadh[index1])}₫</div>
                                                                            <div className="col-1">{data.sl[index1]}</div>

                                                                            <div className="col-2 ">{data.trangthai}</div>
                                                                            <div className="col-2 ">{data.ngayban}</div>
                                                                        </div>
                                                                    )
                                                                }
                                                                <div className="font-italic font-weight-light">
                                                                    {data.ghichu}
                                                                </div>
                                                                <div className="col-12 mt-1 text-right">
                                                                    <span className="font-weight-light"><i>Tổng thanh toán: </i></span>
                                                                    <span className="text-danger tongtien">{formatNumber.format(data.tongtien)}₫</span>
                                                                </div>
                                                                <div className="col-12 text-right">
                                                                    <p key={index} onClick={this.onDetailOrders.bind(this, index)} className="font-weight-light font-italic">
                                                                        Xem chi tiết
                                                                    </p>
                                                                </div>
                                                                <div className="col-12 mt-1 text-right">
                                                                    <p onClick={this.onReceipt.bind(this, data.iddh, data.trangthai)} className="btn btn-success">Nhận đơn</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    }

                                                    else if (data.trangthai === "Đã giao") {
                                                        return (
                                                            <div key={index} className="detailOrders bggray">
                                                                {
                                                                    data.idmon.map((id, index1) =>
                                                                        <div className="row mb-2 border-bottom">
                                                                            <div className="col-3">{this.state.allItem[id].tenmon}</div>
                                                                            <div className="col-1 mb-2">
                                                                                <img src={"http://localhost:80/" + this.state.allItem[id].hinhanh} className="imgOrdersAdmin" alt="hinhanh" />
                                                                            </div>
                                                                            <div className="col-1">{data.size[index1]}</div>
                                                                            <div className="col-1"> {formatNumber.format(data.giadh[index1])}₫</div>
                                                                            <div className="col-1">{data.sl[index1]}</div>

                                                                            <div className="col-2 ">{data.trangthai}</div>
                                                                            <div className="col-2 ">{data.ngayban}</div>
                                                                        </div>
                                                                    )
                                                                }
                                                                <div className="font-italic font-weight-light">
                                                                    {data.ghichu}
                                                                </div>
                                                                <div className="col-12 mt-1 text-right">
                                                                    <span className="font-weight-light"><i>Tổng thanh toán: </i></span>
                                                                    <span className="text-danger tongtien">{formatNumber.format(data.tongtien)}₫</span>
                                                                </div>
                                                                <div className="col-12 text-right">
                                                                    <p key={index} onClick={this.onDetailOrders.bind(this, index)} className="font-weight-light font-italic">
                                                                        Xem chi tiết
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    else if (data.trangthai === "Đang giao") {
                                                        return (
                                                            <div key={index} className="detailOrders bggray">
                                                                {
                                                                    data.idmon.map((id, index1) =>
                                                                        <div className="row mb-2 border-bottom">
                                                                            <div className="col-3">{this.state.allItem[id].tenmon}</div>
                                                                            <div className="col-1 mb-2">
                                                                                <img src={"http://localhost:80/" + this.state.allItem[id].hinhanh} className="imgOrdersAdmin" alt="hinhanh" />
                                                                            </div>
                                                                            <div className="col-1">{data.size[index1]}</div>
                                                                            <div className="col-1"> {formatNumber.format(data.giadh[index1])}₫</div>
                                                                            <div className="col-1">{data.sl[index1]}</div>

                                                                            <div className="col-2 ">{data.trangthai}</div>
                                                                            <div className="col-2 ">{data.ngayban}</div>
                                                                        </div>
                                                                    )
                                                                }
                                                                <div className="col-12 mt-1 text-right">
                                                                    <span className="font-weight-light"><i>Tổng thanh toán: </i></span>
                                                                    <span className="text-danger tongtien">{formatNumber.format(data.tongtien)}₫</span>
                                                                </div>
                                                                <div className="col-12 text-right">
                                                                    <p key={index} onClick={this.onDetailOrders.bind(this, index)} className="font-weight-light font-italic">
                                                                        Xem chi tiết
                                                                    </p>
                                                                </div>
                                                                <div className="col-12 mt-1 text-right">
                                                                    <p onClick={this.Delivered.bind(this, data.iddh)} className="btn btn-success">Đã giao</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                }
                                                )

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
                        </div>
                    </div>
                    <div className={this.state.class_acc}>
                        <ShipperAcc hiddenShipper={this.hiddenShipperAcc} />
                    </div>
                </div>
            </div>
        );
    }
}
export default Shipper;