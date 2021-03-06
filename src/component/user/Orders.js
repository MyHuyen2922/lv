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
                alert("???? h???y ????n h??ng !!!");
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
                    alert("???? g???i b??nh lu???n !!!")
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
                    alert("Nh???n m??n th??nh c??ng !!!");
                }
                else {
                    alert("L???i server");
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
                                            <p className="nav-link active" aria-current="page" onClick={this.getItem.bind(this, 0)}>T???t c???</p>
                                        </li>
                                        <li className="nav-item col-2">
                                            <p className="nav-link" onClick={this.getItem.bind(this, 'Ch??? x??c nh???n')}>Ch??? x??c nh???n</p>
                                        </li>
                                        <li className="nav-item col-2 ml-5">
                                            <p className="nav-link" onClick={this.getItem.bind(this, '??ang giao')}>??ang giao</p>
                                        </li>
                                        <li className="nav-item col-2 ml-5">
                                            <p className="nav-link" onClick={this.getItem.bind(this, '???? giao')}>???? giao</p>
                                        </li>
                                        <li className="nav-item col-2 ml-5">
                                            <p className="nav-link" onClick={this.getItem.bind(this, '???? h???y')}>???? h???y</p>
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
                                    if (data.trangthai === "Ch??? x??c nh???n") {
                                        if (data.hinhthuc === "Giao h??ng") {
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
                                                                    <p className="text-danger ttmonOrders"> {formatNumber.format(data.giadh[index1])}???</p>
                                                                    <p className="ttmonOrders">x{data.sl[index1]}</p>
                                                                    <p className="ttmonOrders font-weight-light"><i>Size: {data.size[index1]}</i></p>
                                                                </div>
                                                                <div className="col-2 text-right">
                                                                    <span className="text-danger tongtienItem">{formatNumber.format(data.giadh[index1] * data.sl[index1])}???</span>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    <p className="col-12 font-weight-light font-italic">{data.ghichu}</p>

                                                    <div className="col-12 mt-1 text-right">
                                                        <span className="font-weight-light"><i>T???ng s??? ti???n m??n: </i></span>
                                                        <span className="tongtienItem">{formatNumber.format(data.tongtien - data.tienship)}???</span>
                                                    </div>
                                                    <div className="col-12 mt-1 text-right">
                                                        <span className="font-weight-light"><i>Ti???n ph?? v???n chuy???n: </i></span>
                                                        <span className="tongtienItem">{formatNumber.format(data.tienship)}???</span>
                                                    </div>
                                                    <div className="col-12 mt-1 text-right">
                                                        <span className="font-weight-light"><i>T???ng ti???n thanh to??n: </i></span>
                                                        <span className="text-danger tongtien">{formatNumber.format(data.tongtien)}???</span>
                                                    </div>
                                                    <div className="col-12 text-right mt-2">
                                                        <button onClick={this.DeleteOrders.bind(this, data.iddh)} className="btn btn-primary">H???y ????n h??ng</button>
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
                                                                    <p className="text-danger ttmonOrders"> {formatNumber.format(data.giadh[index1])}???</p>
                                                                    <p className="ttmonOrders">x{data.sl[index1]}</p>
                                                                    <p className="ttmonOrders font-weight-light"><i>Size: {data.size[index1]}</i></p>
                                                                </div>
                                                                <div className="col-2 text-right">
                                                                    <span className="text-danger tongtienItem">{formatNumber.format(data.giadh[index1] * data.sl[index1])}???</span>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    <p className="col-12 font-weight-light font-italic">{data.ghichu}</p>
                                                    <div className="col-12 mt-1 text-right">
                                                        <span className="font-weight-light"><i>T???ng ti???n thanh to??n: </i></span>
                                                        <span className="text-danger tongtien">{formatNumber.format(data.tongtien)}???</span>
                                                    </div>
                                                    <div className="col-12 text-right mt-2">
                                                        <button onClick={this.Delivered.bind(this, data.iddh)} className="btn btn-success">???? nh???n</button> &nbsp;
                                                        <button onClick={this.DeleteOrders.bind(this, data.iddh)} className="btn btn-primary">H???y ????n h??ng</button>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }
                                    else if (data.trangthai === "???? giao") {
                                        if (data.hinhthuc === "Nh???n t???i c???a h??ng") {
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
                                                                    <p className="text-danger ttmonOrders"> {formatNumber.format(data.giadh[index1])}???</p>
                                                                    <p className="ttmonOrders">x{data.sl[index1]}</p>
                                                                    <p className="ttmonOrders font-weight-light"><i>Size: {data.size[index1]}</i></p>
                                                                </div>
                                                                <div className="col-2 text-right">
                                                                    <span className="text-danger tongtienItem">{formatNumber.format(data.giadh[index1] * data.sl[index1])}???</span>
                                                                </div>
                                                                <Comment idmon={id} />
                                                            </div>
                                                        )
                                                    }
                                                    <div className="col-12 mt-1 text-right">
                                                        <span className="font-weight-light"><i>T???ng ti???n thanh to??n: </i></span>
                                                        <span className="text-danger tongtien">{formatNumber.format(data.tongtien)}???</span>
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
                                                                    <p className="text-danger ttmonOrders"> {formatNumber.format(data.giadh[index1])}???</p>
                                                                    <p className="ttmonOrders">x{data.sl[index1]}</p>
                                                                    <p className="ttmonOrders font-weight-light"><i>Size: {data.size[index1]}</i></p>
                                                                </div>
                                                                <div className="col-2 text-right">
                                                                    <span className="text-danger tongtienItem">{formatNumber.format(data.giadh[index1] * data.sl[index1])}???</span>
                                                                </div>
                                                                <Comment idmon={id} />
                                                            </div>
                                                        )
                                                    }
                                                    <div className="col-12 mt-1 text-right">
                                                        <span className="font-weight-light"><i>T???ng s??? ti???n m??n: </i></span>
                                                        <span className="tongtienItem">{formatNumber.format(data.tongtien - data.tienship)}???</span>
                                                    </div>
                                                    <div className="col-12 mt-1 text-right">
                                                        <span className="font-weight-light"><i>Ti???n ph?? v???n chuy???n: </i></span>
                                                        <span className="tongtienItem">{formatNumber.format(data.tienship)}???</span>
                                                    </div>
                                                    <div className="col-12 mt-1 text-right">
                                                        <span className="font-weight-light"><i>T???ng ti???n thanh to??n: </i></span>
                                                        <span className="text-danger tongtien">{formatNumber.format(data.tongtien)}???</span>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }
                                    else {
                                        if (data.hinhthuc === 'Nh???n t???i c???a h??ng') {
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
                                                                    <p className="text-danger ttmonOrders"> {formatNumber.format(data.giadh[index1])}???</p>
                                                                    <p className="ttmonOrders">x{data.sl[index1]}</p>
                                                                    <p className="ttmonOrders font-weight-light"><i>Size: {data.size[index1]}</i></p>
                                                                </div>
                                                                <div className="col-2 text-right">
                                                                    <span className="text-danger tongtienItem">{formatNumber.format(data.giadh[index1] * data.sl[index1])}???</span>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    <p className="col-12 font-weight-light font-italic">{data.ghichu}</p>
                                                    <div className="col-12 mt-1 text-right">
                                                        <span className="font-weight-light"><i>T???ng ti???n thanh to??n: </i></span>
                                                        <span className="text-danger tongtien">{formatNumber.format(data.tongtien)}???</span>
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
                                                                    <p className="text-danger ttmonOrders"> {formatNumber.format(data.giadh[index1])}???</p>
                                                                    <p className="ttmonOrders">x{data.sl[index1]}</p>
                                                                    <p className="ttmonOrders font-weight-light"><i>Size: {data.size[index1]}</i></p>
                                                                </div>
                                                                <div className="col-2 text-right">
                                                                    <span className="text-danger tongtienItem">{formatNumber.format(data.giadh[index1] * data.sl[index1])}???</span>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    <p className="col-12 font-weight-light font-italic">{data.ghichu}</p>
                                                    <div className="col-12 mt-1 text-right">
                                                        <span className="font-weight-light"><i>T???ng s??? ti???n m??n: </i></span>
                                                        <span className="tongtienItem">{formatNumber.format(data.tongtien - data.tienship)}???</span>
                                                    </div>
                                                    <div className="col-12 mt-1 text-right">
                                                        <span className="font-weight-light"><i>Ti???n ph?? v???n chuy???n: </i></span>
                                                        <span className="tongtienItem">{formatNumber.format(data.tienship)}???</span>
                                                    </div>
                                                    <div className="col-12 mt-1 text-right">
                                                        <span className="font-weight-light"><i>T???ng ti???n thanh to??n: </i></span>
                                                        <span className="text-danger tongtien">{formatNumber.format(data.tongtien)}???</span>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }
                                }
                                )
                            ) : (
                                <div className="text-center mt-5">
                                    <h4><i>Ch??a c?? ????n h??ng</i></h4>
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