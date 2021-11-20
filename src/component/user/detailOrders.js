import React, { Component } from 'react';
import queryString from 'query-string';
import UserAPI from '../../API/UserAPI';
import logo from '../../img/logo1.png';
import vnpay from '../../img/vnpay.png';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Paypal from '../Paypal';


class detailOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dish: [],
            tongtien: 0,
            default_htnhan: localStorage.getItem('username'),
            default_sdtnhan: localStorage.getItem('sdt'),
            default_dcnhan: localStorage.getItem('dc'),
            hotennhan: "",
            sdtnhan: "",
            dcnhan: "",
            class_home: 'home-visible',
            class_addr: 'row col-12 hidden-search',
            dcct: '',
            phuong: '',
            quan: '',
            hinhthuc: 'Nhận tại cửa hàng',
            tienship: 0,
            class_ship: 'hidden_ngaysx',
            note: '',
            direct: '',
            date: new Date(),
            class_date: 'row col-12 hidden-search',
            pttt: 'Thanh toán khi nhận món',
            class_paypal: 'row col-12 hidden-search',

        }
        this.onVnPay = this.onVnPay.bind(this);
    }

    componentDidMount() {
        if (this.props.location.search !== "") {
            var t = this.props.match.params.id;
            var x = t.split(",");
            x.splice(0, 1);
            console.log(x);
            console.log(t);
            let search = queryString.parse(this.props.location.search);
            let dict = {};
            dict['idmon'] = x[0];
            dict['hinhanh'] = search.hinhanh;
            dict['tenmon'] = search.tenmon;
            dict['giagh'] = search.gia;
            dict['size'] = search.size;
            dict['sl'] = search.soluong;
            if (search.khuyenmai === "null") {
                dict['km'] = null
            }
            else {
                dict['km'] = search.khuyenmai;
            }
            let arr = [];
            arr.push(dict);
            this.setState({
                dish: arr,
                tongtien: Number(search.gia) * Number(search.soluong),
            })
        }
        else {
            var t = this.props.match.params.id;
            var x = t.split(",");
            x.splice(0, 1);
            console.log(x);
            console.log(t);
            let thamso = new FormData();
            for (var i = 0; i < x.length; i++) {
                thamso.append("idmon[]", x[i]);
                console.log(x[i]);
            }
            thamso.append("idkh", localStorage.getItem('idkh'));
            const api = new UserAPI();
            api.ShowOrdersAPI(thamso)
                .then(response => {
                    console.log(response);
                    var tongtien = 0;
                    for (var i = 0; i < response.length; i++) {
                        tongtien = tongtien + response[i].giagh * response[i].sl;
                    }
                    this.setState({
                        dish: response,
                        tongtien: tongtien,
                    })
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
    onAddress = () => {
        this.setState({
            class_addr: 'row col-12 mt-4 visible-search dcmoi',
            class_home: 'home-hidden',
        })
    }
    hiddenAddr = () => {
        this.setState({
            class_home: 'home-visible',
            class_addr: 'row col-12 hidden-search',
        })
    }
    editAddr = () => {
        if (this.state.hotennhan === '' || this.state.sdtnhan === '' || this.state.dcct === '' || this.state.phuong === '' || this.state.quan === '') {
            alert("Chưa nhập đủ thông tin !!!");
        }
        else {
            this.setState({
                class_home: 'home-visible',
                class_addr: 'row col-12 hidden-search',
                default_htnhan: this.state.hotennhan,
                default_sdtnhan: this.state.sdtnhan,
                default_dcnhan: this.state.dcnhan,
            })
        }
    }
    onChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (name === 'dcct') {
            this.setState({
                [name]: value,
                dcnhan: value + ", " + this.state.phuong + ", " + this.state.quan + ", Cần Thơ",
            })
        }
        else if (name === 'phuong') {
            this.setState({
                [name]: value,
                dcnhan: this.state.dcct + ", " + value + ", " + this.state.quan + ", Cần Thơ",
            })
        }
        else if (name === 'quan') {
            this.setState({
                [name]: value,
                dcnhan: this.state.dcct + ", " + this.state.phuong + ", " + value + ", Cần Thơ",
            })
        }
        else if (name === 'hotennhan' || name === 'sdtnhan') {
            this.setState({ [name]: value })
        }
    }
    Change = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        })
        if (value === 'Nhận tại cửa hàng') {
            this.setState({
                tienship: 0,
                class_ship: 'hidden_ngaysx'
            })
        }
        else if (value === 'Giao hàng') {
            this.setState({
                class_ship: 'col-11 ml-5 mt-1 text-right visible_ngaysx'
            })
            if (this.state.quan === "Ninh Kiều") {
                this.setState({
                    tienship: 15000,
                })
            }
            else if (this.state.quan === "Cái Răng") {
                this.setState({
                    tienship: 20000,
                })
            }
            else if (this.state.quan === "Bình Thủy") {
                this.setState({
                    tienship: 25000,
                })
            }
            else if (this.state.quan === "Ô Môn") {
                this.setState({
                    tienship: 35000,
                })
            }
            else if (this.state.quan === "Thốt Nốt") {
                this.setState({
                    tienship: 30000,
                })
            }
            else {
                if (this.state.default_dcnhan.indexOf("Ninh Kiều") !== -1) {
                    this.setState({
                        tienship: 15000,
                    })
                }
                else if (this.state.default_dcnhan.indexOf("Cái Răng") !== -1) {
                    this.setState({
                        tienship: 20000,
                    })
                }
                else if (this.state.default_dcnhan.indexOf("Bình Thủy") !== -1) {
                    this.setState({
                        tienship: 25000,
                    })
                }
                else if (this.state.default_dcnhan.indexOf("Ô Môn") !== -1) {
                    this.setState({
                        tienship: 35000,
                    })
                }
            }
        }
    }
    onBuyAll = () => {
        console.log('aaa');
        let thamso = new FormData();
        for (var i = 0; i < this.state.dish.length; i++) {
            thamso.append("idmon[]", this.state.dish[i].idmon);
            thamso.append("sl[]", this.state.dish[i].sl);
            thamso.append("size[]", this.state.dish[i].size);
            thamso.append("gia[]", this.state.dish[i].giagh);
        }
        //var today = new Date();
        var ngayban = this.state.date.getDate() + '/' + (this.state.date.getMonth() + 1) + '/' + this.state.date.getFullYear();
        thamso.append("ghichu", this.state.note);
        thamso.append("tongtien", this.state.tongtien + this.state.tienship);
        thamso.append("idkh", localStorage.getItem('idkh'));
        thamso.append("ngayban", ngayban);
        thamso.append("hotennhan", this.state.default_htnhan);
        thamso.append("sdtnhan", this.state.default_sdtnhan);
        thamso.append("dcnhan", this.state.default_dcnhan);
        thamso.append("hinhthuc", this.state.hinhthuc);
        thamso.append("tienship", this.state.tienship);
        thamso.append("pttt", this.state.pttt);
        const api = new UserAPI();
        api.BuyAPI(thamso)
            .then(response => {
                console.log(response);
                if (response.data[0].code === "200") {
                    alert("Đã đặt món thành công, Vui lòng chờ xác nhận đơn hàng");
                    this.setState({
                        note: '',
                        direct: '/ordersuser'
                    })
                    this.componentDidMount();
                }
                else {
                    alert("Vui lòng đặt lại !!!");
                }
            })
            .catch(error => {
                console.log(error);
            })

    }
    ChangeDate = (value) => {
        this.setState({
            date: value,
        })
    }
    onDate = () => {
        this.setState({
            class_date: 'row col-12 mt-4 visible-search dcmoi',
            class_home: 'home-hidden',
        })
        window.scrollTo(0, 0);
    }
    onPaypal = () => {
        this.setState({
            class_paypal: 'row col-4 offset-4 mt-4  bggreen visible-search dcmoi',
            class_home: 'home-hidden',
            pttt: 'Đã thanh toán'
        })
        window.scrollTo(0, 0);
    }
    hiddenDate = () => {
        this.setState({
            class_home: 'home-visible',
            class_date: 'row col-12 hidden-search',

        })
        window.scrollTo(0, 0);
    }
    hiddenPaypal = () => {
        this.setState({
            class_home: 'home-visible',
            class_paypal: 'row col-12 hidden-search',
            pttt: 'Thanh toán khi nhận món',
        })
        window.scrollTo(0, 0);
    }
    onVnPay = () =>{
        var that = this;
        let thamso = new FormData();
        thamso.append("insert",1);
        var sl = "";
        var size = "";
        var gia = "";
        var tenmon = "";
        for (var i = 0; i < this.state.dish.length; i++) {
            thamso.append("idmon[]", this.state.dish[i].idmon);
            thamso.append("sl[]", this.state.dish[i].sl);
            thamso.append("size[]", this.state.dish[i].size);
            thamso.append("gia[]", this.state.dish[i].giagh);
            sl += "|" + this.state.dish[i].sl;
            size += "|" + this.state.dish[i].size;
            gia += "|" + this.state.dish[i].gia;
            tenmon += "|" + this.state.dish[i].tenmon;
        }
        //var today = new Date();
        var ngayban = this.state.date.getDate() + '/' + (this.state.date.getMonth() + 1) + '/' + this.state.date.getFullYear();
        thamso.append("ghichu", this.state.note);
        thamso.append("idkh", localStorage.getItem('idkh'));
        thamso.append("ngayban", ngayban);
        thamso.append("hotennhan", this.state.default_htnhan);
        thamso.append("sdtnhan", this.state.default_sdtnhan);
        thamso.append("dcnhan", this.state.default_dcnhan);
        thamso.append("hinhthuc", this.state.hinhthuc);
        thamso.append("tienship", this.state.tienship);
        thamso.append("pttt", this.state.pttt);
        const api = new UserAPI();
        api.VnPayAPI(thamso)
        .then((response) =>{
        var iddh = response.iddh;
            var url = "http://localhost:80/vnpay_php/index.php?tenmon=" + tenmon + "&gia=" + gia + "&size=" + size + "&soluong=" + sl + "&tienship=" + this.state.tienship +"&iddh=" + iddh +"&hinhthuc=" + this.state.hinhthuc + "&tongtien=" + this.state.tongtien +"&tienship" + this.state.tienship ;
            window.open(url, 'center', 'width=600, height=650, left=450, top=100');
            var win = window.open(url, 'center', 'width=600, height=650, left=450, top=100');
            var timer = setInterval(function () {
                if (win.closed) {
                    clearInterval(timer);
                    let thamso1 = new FormData();
                    thamso1.append("check", 1);
                    thamso1.append("iddh", Number(iddh));
                    thamso1.append("idkh", localStorage.getItem('idkh'));
                    api.VnPayAPI(thamso1)
                        .then((response1) => {
                            if(response1[0].code === '200'){
                                alert("Đã thanh toán. Chuyển đến đơn hàng của bạn !!!");
                                that.setState({ direct: "/ordersuser"});
                            }
                            else {                 
                                that.componentDidMount();
                            }
                        })
                        .catch(error =>{
                            console.log(error);
                        })
                }
            }, 500)
        })
        .catch(error =>{
            console.log(error);
        })
       
    }
    render() {
        if (localStorage.getItem('idkh') === null) {
            return <Redirect to="/Login" />
        }
        if (this.state.direct !== "") {
            return (<Redirect to={this.state.direct} />)
        }
        console.log(this.state.direct);
        const formatNumber = new Intl.NumberFormat('de');
        return (
            <div>
                <div className={this.state.class_paypal}>
                    <div className="col-12 text-center mt-3">
                        <Paypal onBuy={this.onBuyAll} price={((this.state.tongtien + this.state.tienship) / 22000).toFixed(2)} />
                    </div>
                    <div className="col-12 text-center mt-3">
                        <p className="border p-2 vnpay" onClick={this.onVnPay}>
                            <img src={vnpay} alt="vnpay"/>
                        </p>
                    </div>
                    <div className="col-12 text-right mt-3">
                        <p onClick={this.hiddenPaypal} className="btn btn-success">Đóng</p>
                    </div>
                </div>
                <div className={this.state.class_date}>
                    <div className="col-4 offset-4  bggreen border text-center">
                        <Calendar className="ml-30 mt-3" onChange={this.ChangeDate} value={this.state.date} />
                        <span onClick={this.hiddenDate} className="btn btn-success mt-2 mr-2 mb-2 luu">Lưu</span>
                        <span onClick={this.hiddenDate} className="btn btn-secondary mt-2 mb-2">Trở lại</span> &nbsp;
                    </div>
                </div>
                <div className={this.state.class_addr}>
                    <div className="row col-6 offset-3 border bg-dcnhan" >
                        <h3 className="mt-5 ml-1">ĐỊA CHỈ MỚI</h3>
                        <input onChange={this.onChange} type="text" value={this.state.hotennhan} className="col-10 offset-1 mt-3 dcnhan" name='hotennhan' placeholder="Họ và tên" />
                        <input onChange={this.onChange} type="text" value={this.state.sdtnhan} className="col-10 offset-1 mt-3 dcnhan" name='sdtnhan' placeholder="Số điện thoại" />
                        <div className="row col-12 mt-3 ml-40">
                            <input onChange={this.onChange} className="dcnhan col-3" type="text" name='dcct' placeholder="Địa chỉ cụ thể" />
                            <div className="col-3 mlphuong">
                            <input onChange={this.onChange} className="col-12 dcnhan" type="text" name='phuong' placeholder="Phường" /> 
                            </div>
                            <div className="col-3 mlquan">
                                <select onChange={this.onChange} name="quan" class="custom-select dcnhan" >
                                    <option value="" selected>Quận</option>
                                    <option value="Bình Thủy">Bình Thủy</option>
                                    <option value="Ninh Kiều">Ninh Kiều</option>
                                    <option value="Cái Răng">Cái Răng</option>
                                    <option value="Ô Môn">Ô Môn</option>
                                </select>
                            </div>
                            <div className="col-2 mltinh dcnhan">
                                <div className="ct">
                                    <span >Cần Thơ</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-10 offset-1 mt-3 text-right mb-3">
                            <span onClick={this.hiddenAddr} className="btn btn-secondary">Trở lại</span> &nbsp;
                            <span onClick={this.editAddr} className="btn btn-info">Hoàn thành</span>
                        </div>
                    </div>
                </div>
                <div className={this.state.class_home}>
                    <div className="row col-12 br">
                        <div className=" row col-12 ml-2 border-bottom">
                            <Link to="/">
                                <img className="logo ml-4 mt-2 mb-2" src={logo} alt='img' />
                            </Link>
                            <span className="thanhtoan mt-3 ml-2">Cherry  |  Thanh toán</span>
                        </div>
                        <div className="row col-11 ml-5 mt-2 bg-white">
                            <h5 className="color mt-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-geo-alt-fill icon" viewBox="0 0 16 16">
                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                </svg>
                                <span> Địa chỉ nhận hàng</span>
                            </h5>
                            <div className="row col-12 mb-2">
                                <div className="col-10">
                                    <span className="font-weight-bold">{this.state.default_htnhan}</span>&nbsp;&nbsp;&nbsp;
                                    <span className="font-weight-bold">{this.state.default_sdtnhan}</span>&nbsp;&nbsp;&nbsp;
                                    <span>{this.state.default_dcnhan}</span>
                                </div>
                                <div className="col-2 text-right text-primary">
                                    <p onClick={this.onAddress} >Thay đổi</p>
                                </div>
                            </div>
                        </div>
                        <div className="row col-11 ml-5 mt-3 p-2 mb-1 orange font-weight-bold">
                            <div className="col-5 mt-2">Món</div>
                            <div className="col-1 mt-2">Size</div>
                            <div className="col-2 mt-2">Đơn Giá</div>
                            <div className="col-2 mt-2">Số Lượng</div>
                            <div className="col-2 mt-2">Thành Tiền</div>
                        </div>
                        {
                            this.state.dish.map((data, index) => {
                                if (data.km === null) {
                                    return (
                                        <div className="row col-11 ml-5 bg-white p-2">
                                            <div className="col-1 ">
                                                <img src={"http://localhost:80/" + data.hinhanh} className="imgCart" alt="hinhanh" />
                                            </div>
                                            <div className="col-4">{data.tenmon}</div>
                                            <div className="col-1 ">{data.size}</div>
                                            <div className="col-2 ">{formatNumber.format(data.giagh)}₫</div>
                                            <div className="col-2 ">{data.sl}</div>
                                            <div className="col-2 ">{formatNumber.format(data.giagh * data.sl)}₫</div>
                                        </div>
                                    )
                                }
                                else {
                                    return (
                                        <div className="row  col-11 ml-5 bg-white p-2">
                                            <div className="col-1">
                                                <img src={"http://localhost:80/" + data.hinhanh} className="imgCart" alt="hinhanh" />
                                            </div>
                                            <div className="col-4">
                                                <p> {data.tenmon}</p>
                                                <p className="text-danger">Giảm {data.km}%</p>
                                            </div>
                                            <div className="col-1">{data.size}</div>
                                            <div className="col-2">{formatNumber.format(data.giagh)}₫</div>
                                            <div className="col-2">{data.sl}</div>
                                            <div className="col-2">{formatNumber.format(data.giagh * data.sl)}₫</div>
                                        </div>
                                    )
                                }
                            }
                            )
                        }
                        <div className="row col-11 ml-5 mt-3">
                            <textarea rows="2" cols="175" className="ml-3" type="text" value={this.state.note} name="note" onChange={this.Change} placeholder="Nhập ghi chú" />
                        </div>
                        <div className="row col-11 ml-5 mt-2">
                            <h5 className="col-3 htn color mt-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-emoji-smile icon" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                                </svg>
                                <span> Hình thức nhận món</span>
                            </h5>
                            <select onChange={this.Change} name="hinhthuc" class="custom-select col-2 htnhan border-success mt-3" >
                                <option value="Nhận tại cửa hàng" selected>Nhận tại cửa hàng</option>
                                <option value="Giao hàng">Giao hàng tận nơi</option>
                            </select>
                        </div>                   
                        <div className="row col-11 ml-5 mt-3">
                            <h5 className="col-3 htn color">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-calendar-month icon" viewBox="0 0 16 16">
                                    <path d="M2.56 11.332 3.1 9.73h1.984l.54 1.602h.718L4.444 6h-.696L1.85 11.332h.71zm1.544-4.527L4.9 9.18H3.284l.8-2.375h.02zm5.746.422h-.676V9.77c0 .652-.414 1.023-1.004 1.023-.539 0-.98-.246-.98-1.012V7.227h-.676v2.746c0 .941.606 1.425 1.453 1.425.656 0 1.043-.28 1.188-.605h.027v.539h.668V7.227zm2.258 5.046c-.563 0-.91-.304-.985-.636h-.687c.094.683.625 1.199 1.668 1.199.93 0 1.746-.527 1.746-1.578V7.227h-.649v.578h-.019c-.191-.348-.637-.64-1.195-.64-.965 0-1.64.679-1.64 1.886v.34c0 1.23.683 1.902 1.64 1.902.558 0 1.008-.293 1.172-.648h.02v.605c0 .645-.423 1.023-1.071 1.023zm.008-4.53c.648 0 1.062.527 1.062 1.359v.253c0 .848-.39 1.364-1.062 1.364-.692 0-1.098-.512-1.098-1.364v-.253c0-.868.406-1.36 1.098-1.36z" />
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                </svg>
                                <span> Thời gian nhận đơn</span>
                            </h5>
                            <span className="col-8 text-right colorlight">
                                {this.state.date.getDate()}/ {this.state.date.getMonth() + 1}/ {this.state.date.getFullYear()}
                            </span>
                            <span onClick={this.onDate} className="col-1 text-right text-primary">Thay đổi</span>
                        </div>
                        <div className="row col-11 ml-5 mt-3">
                            <h5 className="col-3 htn color">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-coin icon" viewBox="0 0 16 16">
                                    <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z" />
                                    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path fill-rule="evenodd" d="M8 13.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                                </svg>
                                <span> Phương thức thanh toán</span>
                            </h5>
                            <span className="col-8 text-right">
                                {this.state.pttt}
                            </span>
                            <span onClick={this.onPaypal} className="col-1 text-right text-primary">Thay đổi</span>
                        </div>
                        <div className="col-11 ml-5 mt-3 text-right">
                            <span className="font-weight-light"><i>Tổng số tiền: </i></span>
                            <span className="text-secondary tongtienItem">{formatNumber.format(this.state.tongtien)}₫</span>
                        </div>
                        <div className={this.state.class_ship}>
                            <span className="font-weight-light"><i>Phí vận chuyển: </i></span>
                            <span className="text-secondary tongtienItem">{formatNumber.format(this.state.tienship)}₫</span>
                        </div>
                        <div className="col-11 ml-5 mt-1 text-right">
                            <span className="font-weight-light"><i>Tổng thanh toán: </i></span>
                            <span className="text-danger tongtien">{formatNumber.format(this.state.tongtien + this.state.tienship)}₫</span>
                        </div>
                        <div className="col-11 ml-5 mt-2 text-right">
                            <p onClick={this.onBuyAll} className="btn btn-danger">Đặt Hàng</p>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default detailOrders;