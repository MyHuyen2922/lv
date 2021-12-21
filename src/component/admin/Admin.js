import React, { Component } from 'react';
import Logout from '../Logout';
import Logo from '../../img/logo.jpg';
import AddDish from './AddDish';
import DishAdminAPI from '../../API/DishAdminAPI';
import AdminAPI from '../../API/admin/AdminAPI';
import { Redirect } from 'react-router-dom';
import add from '../../img/add.png';
import UserAPI from '../../API/UserAPI';
import Chipi from '../../img/chipi.png';
import Calendar from 'react-calendar';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.onDeleteDish = this.onDeleteDish.bind(this);
        this.state = {
            isDisplayForm: false,
            class_content: "col-9 ml-3 mt-3 border border-secondary bg-white content-visible",
            class_edit: "col-10 edit-hidden",
            class_expired: 'col-11 edit-hidden',
            dishAdmin: [],
            cakeAdmin: [],
            dataOnEdit: {},
            imagePreviewUrl: "",
            file: "",
            class_ngaysx: 'hidden',
            search: '',
            dish: [],
            class_search: "row col-12 ml-1 hidden-search",
            class_admin: "visible-home2",
            stop: [],
            class_stop: "row col-12 ml-1 hidden",
            current_page: 1,
            all_page: 0,
            type: 0,
            class_add: 'none',
            cake: 0,
            lohang:[],
            cake_consignment:[],
            name_cake: '---Chọn món---',
            number_con:'',
            ngaysx_con:'',
            hansd_con:'',
            idmon_cake:'',
            class_con:'hidden',
            con:'off',
            date: new Date(),
            dateto: new Date(),
            class_date: 'hidden',
            class_dateto: 'hidden',
        }
        this.visibleEdit = this.visibleEdit.bind(this);
        this.hiddenEdit = this.hiddenEdit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        this.getItem(0, 1);
        this.getConsignment();
        this.Cake_Consignment();
    }
    getItem = (type, number) => {
        var thamso = new FormData();
        if (type !== 0) {
            thamso.append("condition", type);
        }
        thamso.append("number", number);
        const api = new DishAdminAPI();
        api.DishAdminAPI(thamso)
            .then(response => {
                this.setState({
                    dishAdmin: response.splice(0, response.length - 2),
                    search: '',
                    class_admin: "visible-home2",
                    current_page: number,
                    all_page: response.splice(0, response.length - 1),
                    type: type,
                    cake: response,
                    class_con:'hidden',
                    con:'off',
                    class_date: 'row col-12 hidden-search',
                    class_dateto: 'row col-12 hidden-search',
                    class_content: "col-9 mt-3 ml-3 border border-secondary bg-white content-visible",
                });
                console.log(Number(this.state.cake));
            })
            .catch(error => {
                console.log(error)
            })
        this.onCloseForm();
    }
    Orders = () => {
        document.getElementById("admin").innerHTML = "<iframe class='iframeadmin' src='/ordersadmin'></iframe>";
        this.setState({
            class_search: "row col-12 ml-1 hidden-search",
            class_stop: "row col-12 ml-1 hidden",
            class_con:'hidden',
            con:'off',
            class_date: 'row col-12 hidden-search',
            class_dateto: 'row col-12 hidden-search',
            class_content: "col-9 mt-3 ml-3 border border-secondary bg-white content-visible",
        })
    }
    doanhThu = () => {
        document.getElementById("admin").innerHTML = "<iframe class='iframeadmin' src='/sales'></iframe>";
        this.setState({
            class_search: "row col-12 ml-1 hidden-search",
            class_stop: "row col-12 ml-1 hidden",
            class_con:'hidden',
            con:'off',
            class_date: 'row col-12 hidden-search',
            class_dateto: 'row col-12 hidden-search',
            class_content: "col-9 mt-3 ml-3 border border-secondary bg-white content-visible",
        })
    }
    ShipperMGR = () => {
        document.getElementById("admin").innerHTML = "<iframe class='iframeadmin' src='/shipperMGR'></iframe>";
        this.setState({
            class_search: "row col-12 ml-1 hidden-search",
            class_stop: "row col-12 ml-1 hidden",
            class_con:'hidden',
            con:'off',
            class_date: 'row col-12 hidden-search',
            class_dateto: 'row col-12 hidden-search',
            class_content: "col-9 mt-3 ml-3 border border-secondary bg-white content-visible",
        })
    }
    UserMGR = () => {
        document.getElementById("admin").innerHTML = "<iframe class='iframeadmin' src='/listuser'></iframe>";
        this.setState({
            class_search: "row col-12 ml-1 hidden-search",
            class_stop: "row col-12 ml-1 hidden",
            class_con:'hidden',
            con:'off',
            class_date: 'row col-12 hidden-search',
            class_dateto: 'row col-12 hidden-search',
            class_content: "col-9 mt-3 ml-3 border border-secondary bg-white content-visible",
        })
    }
    Discount = () => {
        document.getElementById("admin").innerHTML = "<iframe class='iframeadmin' src='/discount'></iframe>";
        this.setState({
            class_search: "row col-12 ml-1 hidden-search",
            class_stop: "row col-12 ml-1 hidden",
            class_con:'hidden',
            con:'off',
            class_date: 'row col-12 hidden-search',
            class_dateto: 'row col-12 hidden-search',
            class_content: "col-9 mt-3 ml-3 border border-secondary bg-white content-visible",
        })
    }
    Comment = () => {
        document.getElementById("admin").innerHTML = "<iframe class='iframeadmin' src='/commentMGR'></iframe>";
        this.setState({
            class_search: "row col-12 ml-1 hidden-search",
            class_stop: "row col-12 ml-1 hidden",
            class_con:'hidden',
            con:'off',
            class_date: 'row col-12 hidden-search',
            class_dateto: 'row col-12 hidden-search',
            class_content: "col-9 mt-3 ml-3 border border-secondary bg-white content-visible",
        })
    }
    onForm = (h) => {
        h.preventDefault();
        this.setState({
            class_add: 'col-12 mt-3 add-visible',
            class_search: "row col-12 ml-1 hidden-search",
            class_stop: "row col-12 ml-1 hidden",
            search: '',
            class_content: 'hidden',
            class_admin: 'hidden',
            class_con:'hidden',
            con:'off',
        });
    }

    onCloseForm = () => {
        this.setState({
            class_add: 'none',
            class_search: "row col-12 ml-1 hidden-search",
            class_stop: "row col-12 ml-1 hidden",
            class_content: "col-9 mt-3 ml-3 border border-secondary bg-white content-visible",
            class_edit: "col-10 edit-hidden",
            class_expired: " edit-hidden",
            class_ngaysx: 'hidden',
            class_admin: "visible-home2",
        });
    }

    hiddenEdit = () => {
        this.setState({
            class_content: "col-9 mt-3 ml-3 border border-secondary bg-white content-visible",
            class_edit: "col-10 edit-hidden",
            class_expired: " edit-hidden",
            class_ngaysx: 'hidden',
            class_admin: "visible-home2",
        })
    }
    visibleEdit = (index) => {
        let data = this.state.dishAdmin;
        console.log(data[index]);
        this.setState({
            class_content: "hidden",
            class_edit: "col-12 mt-3 edit-visible",
            dataOnEdit: data[index],
            class_admin: 'hidden',
        })
        window.scrollTo(0, 0);
        console.log(this.state.dataOnEdit);
        if (data[index].ngaysx !== null) {
            this.setState({
                class_ngaysx: 'visible'
            })
        }
        else {
            this.setState({
                class_ngaysx: 'hidden'
            })
        }
    }
    visibleEditSearch = (index) => {
        let data = this.state.dish;
        console.log(data[index]);
        this.setState({
            class_content: "hidden",
            class_edit: "col-12 mt-3 edit-visible",
            dataOnEdit: data[index],
            class_admin: 'hidden',
            class_search: 'hidden',
        })
        window.scrollTo(0, 0);
        console.log(this.state.dataOnEdit);
        if (data[index].ngaysx !== null) {
            this.setState({
                class_ngaysx: 'visible'
            })
        }
        else {
            this.setState({
                class_ngaysx: 'hidden'
            })
        }
    }
    visibleEditStop = (index) => {
        let data = this.state.stop;
        console.log(data[index]);
        this.setState({
            class_content: "hidden",
            class_edit: "col-12 mt-3 edit-visible",
            dataOnEdit: data[index],
            class_admin: 'hidden',
        })
        window.scrollTo(0, 0);
        console.log(this.state.dataOnEdit);
        if (data[index].ngaysx !== null) {
            this.setState({
                class_ngaysx: 'visible'
            })
        }
        else {
            this.setState({
                class_ngaysx: 'hidden'
            })
        }
    }
    onEditDish = () => {
        let data = document.getElementById('form-update-items');
        let thamso = new FormData(data);
        thamso.append("idmon", this.state.dataOnEdit.idmon);
        console.log(thamso);
        const api = new AdminAPI();
        api.EditDishAPI(thamso)
            .then(response => {
                console.log(response);
                alert("Đã cập nhật !");
                this.componentDidMount();
            })
            .catch(error => {
                console.log(error)
            })
        window.scrollTo(0, 0);
    }

    onDeleteDish = (index) => {
        console.log(index);
        let thamso = new FormData();
        thamso.append("idmon", index);
        const api = new AdminAPI();
        api.DeleteDishAPI(thamso)
            .then(response => {
                console.log(response);
                if (response[0].code === "200") {
                    alert("Đã Xóa !");
                    this.componentDidMount();
                    this.hiddenEdit();
                }
                else {
                    alert("Vui lòng thử lại");
                }
            })
            .catch(error => {
                console.log(error)
            })
        window.scrollTo(0, 0);
    }
    _handleImageChange(h) {
        h.preventDefault();

        let reader = new FileReader();
        let file = h.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        if (h.target.files[0]) {
            reader.readAsDataURL(file);
        }
    }
    getConsignment = () => {
        const api = new AdminAPI();
        api.GetConsignmentAPI()
            .then((response) => {
                console.log(response);
                this.setState({
                    lohang: response
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }
    getCake = (number) => {
        let thamso = new FormData();
        thamso.append("number", number);
        const api = new DishAdminAPI();
        api.DishCakeAdminAPI(thamso)
            .then(response => {
                this.setState({
                    cakeAdmin: response,
                    class_admin: "hidden-search",
                    class_expired: "row col-12 visible-searchlistcost",
                    class_search: "row col-12 ml-1 hidden-search",
                    class_stop: "row col-12 ml-1 hidden-search",
                    search: '',
                    current_page: number,
                    all_page: response.splice(response.length - 1, response.length),
                });
                console.log(response);
            })
            .catch(error => {
                console.log(error)
            })
    }
    getStop = (number) => {
        let thamso = new FormData();
        thamso.append("number", number);
        const api = new AdminAPI();
        api.GetStopAPI(thamso)
            .then(response => {
                this.setState({
                    stop: response,
                    class_stop: "row col-12 ml-1 visible-searchlistcost",
                    class_admin: "hidden-home2",
                    search: '',
                    class_search: "row col-12 ml-1 hidden-search",
                    current_page: number,
                    all_page: response.splice(response.length - 1, response.length),
                    class_con:'hidden',
                    con:'off'

                });
            })
            .catch(error => {
                console.log(error)
            })
    }
    onChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }
    Search = (number) => {
        let thamso = new FormData();
        thamso.append("search", this.state.search);
        thamso.append("number", number);
        const api = new UserAPI();
        api.SearchAPI(thamso)
            .then(response => {
                console.log(response);
                this.setState({
                    dish: response.splice(0, response.length - 1),
                    class_search: "row col-12 ml-1 visible-search",
                    class_admin: "hidden-home2",
                    class_stop: "row col-12 ml-1 hidden",
                    current_page: number,
                    all_page: response.splice(response.length - 1, response.length),
                    class_con:'hidden',
                    con:'off'
                })
            })
            .catch(error => {
                console.log(error);
            })

    }
    hiddenSearch = () => {
        this.setState({
            class_search: "row col-12 ml-1 hidden-search",
            class_stop: "row col-12 ml-1 hidden",
            class_admin: "visible-home2",
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
    ChangePagi = (action) => {
        if (action === "next") {
            if (Number(this.state.current_page) < Number(this.state.all_page)) {
                this.getStop(this.state.current_page + 1);
            }
            else {
                alert("Bạn đang ở cuối trang!");
            }
        }
        else {
            if (Number(this.state.current_page) > 1) {
                this.getStop(this.state.current_page - 1);
            }
            else {
                alert("Bạn đang ở đầu trang!");
            }
        }
    }
    ChangePagiExp = (action) => {
        if (action === "next") {
            if (Number(this.state.current_page) < Number(this.state.all_page)) {
                this.getCake(this.state.current_page + 1);
            }
            else {
                alert("Bạn đang ở cuối trang!");
            }
        }
        else {
            if (Number(this.state.current_page) > 1) {
                this.getCake(this.state.current_page - 1);
            }
            else {
                alert("Bạn đang ở đầu trang!");
            }
        }
    }
    ChangePagiSearch = (action) => {
        if (action === "next") {
            if (Number(this.state.current_page) < Number(this.state.all_page)) {
                this.Search(this.state.current_page + 1);
            }
            else {
                alert("Bạn đang ở cuối trang!");
            }
        }
        else {
            if (Number(this.state.current_page) > 1) {
                this.Search(this.state.current_page - 1);
            }
            else {
                alert("Bạn đang ở đầu trang!");
            }
        }
    }
    Cake_Consignment = ()=>{
        const api = new AdminAPI();
        api.Cake_ConsignmentAPI()
            .then(response => {
                console.log(response);
                this.setState({
                    cake_consignment: response,
                })
            })
            .catch(error => {
                console.log(error);
        })
    }
    StateName = (name,idmon)=> {
        this.setState({
            name_cake: name, 
            idmon_cake: idmon
        })
    }
    Submit_Consignment = () => {
        let thamso = new FormData();
        var date =this.state.dateto.getFullYear()+'-'+(this.state.dateto.getMonth()+1)+ '-' + this.state.date.getDate();
        var dateto = this.state.dateto.getFullYear()+'-'+(this.state.dateto.getMonth()+1)+'-'+this.state.dateto.getDate();
        thamso.append("idmon", this.state.idmon_cake);
        thamso.append("sl", this.state.number_con);
        thamso.append("ngaysx", date);
        thamso.append("hansd", dateto);
        const api = new AdminAPI();
        api.Add_ConsignmentAPI(thamso)
        .then(response =>{
            console.log(response);
            alert("Đã thêm lô hàng thành công !!!");
            this.componentDidMount();
            this.setState({
                name_cake: '---Chọn món---',
                number_con:'',
                date: new Date(),
                dateto: new Date(),
            })
        })
        .catch(err =>{
            console.log(err);
        })
        
    }
    onDeleteCon =(idlo, sl, idmon)=>{
        let thamso = new FormData();
        thamso.append("idlo",idlo);
        thamso.append("sl", sl);
        thamso.append("idmon", idmon)
        const api = new AdminAPI();
        api.Delete_ConsignmentAPI(thamso)
        .then(response =>{
            console.log(response);
            alert("Đã xóa lô hàng thành công !!!");
            this.componentDidMount();
        })
        .catch(err =>{
            console.log(err);
        })
    }
    onConsignment = () =>{
        if(this.state.con === 'off'){
            this.setState({
                con:'on',
                class_con:'visible col-8 offset-2 text-center'
            })
        }
        else{
            this.setState({
                con:'off',
                class_con:'hidden',
            })
        }
    }
    onDateFrom = () => {
        this.setState({
            class_date: 'row col-12 mt-4 ml-5 visible-search dcmoi',
            class_content: 'home-hidden col-9 mt-3 ml-3 border border-secondary bg-white',
        })
        window.scrollTo(0, 0);
    }
    onDateTo = () => {
        this.setState({
            class_dateto: 'row col-12 mt-4 ml-5 visible-search dcmoi',
            class_content: 'home-hidden col-9 mt-3 ml-3 border border-secondary bg-white',
        })
        window.scrollTo(0, 0);
    }
    ChangeDate = (value) => {
        this.setState({
            date: value,
        })
    }
    ChangeDateTo = (value) => {
        this.setState({
            dateto: value,
        })
    }
    hiddenDate = () => {
        this.setState({
            class_date: 'row col-12 hidden-search',
            class_content: "col-9 mt-3 ml-3 border border-secondary bg-white content-visible",
        })
        window.scrollTo(0, 0);
    }
    hiddenDateTo = () => {
        this.setState({
            class_dateto: 'row col-12 hidden-search',
            class_content: "col-9 mt-3 ml-3 border border-secondary bg-white content-visible",
        })
        window.scrollTo(0, 0);
    }
    render() {
        console.log(this.state.cake_consignment);
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} alt="imgPre" />);
        } else {
            $imagePreview = (<div className="previewText"><img className="hinhanhEdit" alt="img" src={"http://localhost:80/" + this.state.dataOnEdit.hinhanh} /></div>);
        }
        const formatNumber = new Intl.NumberFormat('de');
        if (localStorage.getItem('vaitro') !== 'admin') {
            return <Redirect to="/" />
        }
        return (
            <div className="row bg-yellow">
                <div className="col-2 ml-5 mt-3 text-center border border-secondary iframeadmin bg-white">
                    <h4 className="mt-3">MILK TEA & CAKE</h4>
                    <img src={Logo} className="logoadmin" alt="logo" />
                    <p className="listfunc dropdown-item"><a href="/admin" className="a" onClick={this.hiddenSearch}>Quản Lý Món</a></p>
                    <p className="listfunc dropdown-item" onClick={this.Orders}>Quản Lý Đơn Hàng</p>
                    <p className="listfunc dropdown-item" onClick={this.doanhThu}>Quản Lý Doanh Thu</p>
                    <p className="listfunc dropdown-item" onClick={this.Discount}>Quản Lý Khuyến Mãi</p>
                    <p className="listfunc dropdown-item" onClick={this.Comment}>Quản Lý Bình Luận</p>
                    <p className="listfunc dropdown-item" onClick={this.UserMGR}>Quản Lý Khách Hàng</p>
                    <p className="listfunc dropdown-item" onClick={this.ShipperMGR}>Quản Lý Shipper</p>
                    <p className="listfunc dropdown-item"> <Logout /></p>
                </div>
                <div className={this.state.class_date}>
                        <div className="col-5 offset-4  bggreen border text-center">
                            <Calendar className="ml-30 mt-3" onChange={this.ChangeDate} value={this.state.date} />
                            <span onClick={this.hiddenDate} className="btn btn-success mt-2 mr-2 mb-2 luu">Lưu</span>
                            <span onClick={this.hiddenDate} className="btn btn-secondary mt-2 mb-2">Trở lại</span>
                        </div>
                    </div>
                    <div className={this.state.class_dateto}>
                        <div className="col-5 offset-4  bggreen border text-center">
                            <Calendar className="ml-30 mt-3" onChange={this.ChangeDateTo} value={this.state.dateto} />
                            <span onClick={this.hiddenDateTo} className="btn btn-success mt-2 mr-2 mb-2 luu">Lưu</span>
                            <span onClick={this.hiddenDateTo} className="btn btn-secondary mt-2 mb-2">Trở lại</span>
                        </div>
                    </div>
                <div id="admin" className={this.state.class_content}>
                    <div className="row ">
                        <div className="col-12">
                            <button className="btn btn-outline-info ml-3 mt-3" type="button" onClick={this.getItem.bind(this, 0, 1)} >
                                Danh sách món
                            </button> &nbsp; &nbsp;
                            <button className="btn btn-outline-info mt-3" type="button" onClick={this.getItem.bind(this, 'trasua', 1)} >
                                Trà sữa
                            </button> &nbsp; &nbsp;
                            <button className="btn btn-outline-info mt-3" type="button" onClick={this.getItem.bind(this, 'banhngot', 1)} >
                                Bánh ngọt
                            </button>
                            <span className="rounded-circle bg-danger slbanh">
                                {
                                    Number(this.state.cake) !== 0 ? (
                                        Number(this.state.cake)
                                    ) : (
                                        null
                                    )
                                }
                            </span> &nbsp; &nbsp;
                            <button onClick={this.getCake.bind(this, 1)} className="btn btn-outline-info mt-3" >
                                Lô hàng
                            </button>&nbsp; &nbsp;
                            <button onClick={this.getStop.bind(this, 1)} className="btn btn-outline-info mt-3" >
                                Ngừng bán
                            </button> 
                            <div className="input-group col-5  mt-3">
                                <input type="text" name="search" value={this.state.search} onChange={this.onChange} className="form-control" placeholder="Bạn tìm..." />
                                <div className="input-group-append">
                                    <p onClick={this.Search.bind(this, 1)} className="btn btn-info buttonSearch" >Tìm</p>
                                </div>
                            </div>
                            <div className={this.state.class_search}>
                                {
                                    this.state.dish.length > 0 ? (
                                        <div>
                                            <div>
                                                <h4 className="col-12 text-center mb-3">Kết quả tìm kiếm</h4>
                                                <div className="row tieude col-12 font-weight-bold">
                                                    <div className="col-3 mt-2">Tên món</div>
                                                    <div className="col-2 mt-2">Giá</div>
                                                    <div className="col-2 mt-2">Nguyên liệu</div>
                                                    <div className="col-2 mt-2">Dinh dưỡng</div>
                                                    <div className="col-1 mt-2">Hình</div>
                                                    <div className="col-2 mt-2"></div>
                                                </div>
                                                {this.state.dish.map((data, index) =>
                                                    <div key={index}>
                                                        <form id={index} >
                                                            <div className="row">
                                                                <div className="col-3 detailDish">
                                                                    {data.tenmon}
                                                                </div>
                                                                <div className="col-2 detailDish ">
                                                                    {formatNumber.format(data.gia)}₫
                                                                </div>
                                                                <div className="col-2 detailDish ">
                                                                    {data.nguyenlieu}
                                                                </div>
                                                                <div className="col-2 detailDish ">
                                                                    {String(data.tpdd).replaceAll("|",",")}
                                                                </div>
                                                                <div className="col-1 detailDish ">
                                                                    <img src={'http://localhost:80/' + data.hinhanh} alt="hinhmon" className="hinhanhAdmin" />
                                                                </div>
                                                                <div className="col-2 detailDish">
                                                                    <span onClick={this.visibleEditSearch.bind(this, index)} >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pencil-square mt-1 text-success" viewBox="0 0 16 16">
                                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.30.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                                        </svg>
                                                                    </span> &nbsp; &nbsp; &nbsp;
                                                                    <span onClick={this.onDeleteDish.bind(this, data.idmon)} >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-trash mt-1 text-danger" viewBox="0 0 16 16">
                                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                                        </svg>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="col-12 text-center mt-3 mb-3">
                                                <span className="border border-secondary p-1  pl-2 pr-2  mr-1" onClick={this.ChangePagiSearch.bind(this, 'previous')}>	&lt;</span>
                                                <span className="border border-secondary p-1 mr-1 bg-white">{"Trang " + this.state.current_page + "/" + this.state.all_page}</span>
                                                <span className="border border-secondary p-1 pl-2 pr-2 " onClick={this.ChangePagiSearch.bind(this, 'next')}>&gt;</span>
                                            </div>
                                        </div>

                                    ) : (
                                        <div className="col-12 text-center">
                                            <img src={Chipi} alt="hinhanh" className="chipi" />
                                            <h6><i>Không tìm thấy kết quả</i></h6>
                                        </div>
                                    )
                                }

                            </div>
                            <div className={this.state.class_stop}>
                                {
                                    this.state.stop.length > 0 ? (
                                        <div>
                                            <div>
                                                <div className="row tieude col-12 text-center font-weight-bold">
                                                    <div className="col-3 mt-2">Tên món</div>
                                                    <div className="col-2 mt-2">Giá</div>
                                                    <div className="col-4 mt-2">Nguyên liệu</div>
                                                    <div className="col-3 mt-2">Dinh dưỡng</div>
                                                 
                                              
                                                </div>
                                                {this.state.stop.map((data, index) =>
                                                    <div key={index}>
                                                        <form id={index} >
                                                            <div className="row">
                                                                <div className="col-3 detailDish">
                                                                    {data.tenmon}
                                                                </div>
                                                                <div className="col-2 detailDish ">
                                                                    {formatNumber.format(data.gia)}₫
                                                                </div>
                                                                <div className="col-4 detailDish ">
                                                                    {data.nguyenlieu}
                                                                </div>
                                                                <div className="col-3 detailDish ">
                                                                {String(data.tpdd).replaceAll("|",",")}
                                                                </div>
                                                             
                                                            </div>
                                                        </form>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="col-12 text-center mt-3 mb-3">
                                                <span className="border border-secondary p-1  pl-2 pr-2  mr-1" onClick={this.ChangePagi.bind(this, 'previous')}>	&lt;</span>
                                                <span className="border border-secondary p-1 mr-1 bg-white">{"Trang " + this.state.current_page + "/" + this.state.all_page}</span>
                                                <span className="border border-secondary p-1 pl-2 pr-2 " onClick={this.ChangePagi.bind(this, 'next')}>&gt;</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="col-12 text-center">
                                            <img src={Chipi} alt="hinhanh" className="chipi" />
                                            <h6><i>Không tìm thấy kết quả</i></h6>
                                        </div>
                                    )
                                }

                            </div>
                            <div className={this.state.class_admin}>
                                <div className="text-right">
                                    <p onClick={this.onForm}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg btn btn-outline-info add" viewBox="0 0 16 16">
                                            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
                                        </svg>
                                    </p>
                                </div>
                                <div className="ml-1 row tieude col-12 font-weight-bold">
                                    <div className="col-3 mt-2">Tên món</div>
                                    <div className="col-2 mt-2">Giá</div>
                                    <div className="col-2 mt-2">Nguyên liệu</div>
                                    <div className="col-2 mt-2">Dinh dưỡng</div>
                                    <div className="col-1 mt-2">Hình</div>
                                    <div className="col-2 mt-2"></div>
                                </div>
                                <div className="ml-3 mr-2">
                                    {
                                        this.state.dishAdmin.map((data, index) => {
                                            if (Number(data.soluong) === 0 && data.loai === 'banhngot') {
                                                return (
                                                    <div key={index}>
                                                        <form id={index} >
                                                            <div className="row due">
                                                                <div className="col-3 detailDish">
                                                                    {data.tenmon}
                                                                </div>
                                                                <div className="col-2 detailDish ">
                                                                    {formatNumber.format(data.gia)}₫
                                                                </div>
                                                                <div className="col-2 detailDish ">
                                                                    {data.nguyenlieu}
                                                                </div>
                                                                <div className="col-2 detailDish ">
                                                                {String(data.tpdd).replaceAll("|",",")}
                                                                </div>
                                                                <div className="col-1 detailDish ">
                                                                    <img src={'http://localhost:80/' + data.hinhanh} alt="hinhmon" className="hinhanhAdmin" />
                                                                </div>
                                                                <div className="col-2 detailDish text-center">
                                                                    <span onClick={this.visibleEdit.bind(this, index)} >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pencil-square mt-1 text-success" viewBox="0 0 16 16">
                                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.30.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                                        </svg>
                                                                    </span> &nbsp; &nbsp; &nbsp;
                                                                    <span onClick={this.onDeleteDish.bind(this, data.idmon)} >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-trash mt-1 text-danger" viewBox="0 0 16 16">
                                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                                        </svg>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                )
                                            }
                                            else {
                                                return (
                                                    <div key={index}>
                                                        <form id={index} >
                                                            <div className="row">
                                                                <div className="col-3 detailDish">
                                                                    {data.tenmon}
                                                                </div>
                                                                <div className="col-2 detailDish ">
                                                                    {formatNumber.format(data.gia)}₫
                                                                </div>
                                                                <div className="col-2 detailDish ">
                                                                    {data.nguyenlieu}
                                                                </div>
                                                                <div className="col-2 detailDish ">
                                                                {String(data.tpdd).replaceAll("|",",")}
                                                                </div>
                                                                <div className="col-1 detailDish ">
                                                                    <img src={'http://localhost:80/' + data.hinhanh} alt="hinhmon" className="hinhanhAdmin" />
                                                                </div>
                                                                <div className="col-2 detailDish text-center">
                                                                    <span onClick={this.visibleEdit.bind(this, index)} >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pencil-square mt-1 text-success" viewBox="0 0 16 16">
                                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.30.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                                        </svg>
                                                                    </span> &nbsp; &nbsp; &nbsp;
                                                                    <span onClick={this.onDeleteDish.bind(this, data.idmon)} >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-trash mt-1 text-danger" viewBox="0 0 16 16">
                                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                                        </svg>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                )
                                            }
                                        }

                                        )
                                    }
                                    <div className="col-12 text-center mt-3 mb-3">
                                        <span className="border border-secondary p-1  pl-2 pr-2  mr-1" onClick={this.ChangePagination.bind(this, 'previous')}>	&lt;</span>
                                        <span className="border border-secondary p-1 mr-1 bg-white">{"Trang " + this.state.current_page + "/" + this.state.all_page}</span>
                                        <span className="border border-secondary p-1 pl-2 pr-2 " onClick={this.ChangePagination.bind(this, 'next')}>&gt;</span>
                                    </div>
                                </div>
                            </div>
                            <div className={this.state.class_expired}>
                            <div className="row col-12">
                            <div className="col-12 text-right">
                                <p onClick={this.onConsignment}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg btn btn-outline-info add" viewBox="0 0 16 16">
                                        <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
                                    </svg>
                                </p>
                            </div>
                            <div className={this.state.class_con}>
                                <div className="row">
                                    <div className="col-4">
                                        Tên món
                                    </div>
                                    <div class="dropdown col-8">
                                        <button class="btn btn-outline-info col-12" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {this.state.name_cake}
                                        </button>
                                        <div class="dropdown-menu col-12" aria-labelledby="dropdownMenuButton">
                                            {
                                                this.state.cake_consignment.map((data, index) =>
                                                    <a class="dropdown-item col-12" onClick={this.StateName.bind(this, data.tenmon, data.idmon)} href="#">{data.tenmon}</a>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div>

                                </div>
                                <div className="row mt-2">
                                    <div className="col-4">
                                        Số lượng
                                    </div>
                                    <div class="input-group col-8">
                                        <input type="text" onChange={this.onChange} class="form-control" name="number_con" aria-describedby="basic-addon1"/>
                                    </div>
                                </div>

                                <div className="row mt-2">
                                    <div className="col-4">
                                        Ngày sản xuất
                                    </div>
                                    <div className="col-8 ">
                                <span className="col-8 text-right colorlight">
                                {this.state.date.getDate()}/ {this.state.date.getMonth() + 1}/ {this.state.date.getFullYear()}
                                </span>
                                <span onClick={this.onDateFrom} className="col-1 text-right text-primary">Thay đổi</span>
                                </div>
                                </div>

                                <div className="row mt-2">
                                    <div className="col-4">
                                        Hạn sử dụng
                                    </div>
                                    <div className="col-8 ">
                                <span className="col-8 text-right colorlight">
                                {this.state.dateto.getDate()}/ {this.state.dateto.getMonth() + 1}/ {this.state.dateto.getFullYear()}  
                                </span>
                                <span onClick={this.onDateTo} className="col-1 text-right text-primary">Thay đổi</span>
                                </div>
                                </div>
                                <div className="col-12 text-right mt-2">
                                    <p className="btn btn-success" onClick={this.Submit_Consignment}>Cập nhật</p>
                                </div>
                            </div>
                            <div className="col-12 ml-4">
                                <div className="row col-12 font-weight-bold text-center">                           
                                                        <div className="col-3 mt-2 border p-2 tieude">Tên món</div>
                                                        <div className="col-2 mt-2 border p-2 tieude">Số lô</div>
                                                        <div className="col-2 mt-2 border p-2 tieude">Số lượng</div>
                                                        <div className="col-2 mt-2 border p-2 tieude">Ngày sản xuất</div>
                                                        <div className="col-2 mt-2 border p-2 tieude">Hạn sử dụng</div>
                                                        <div className="col-1 mt-2 border p-2 tieude"></div>
                                                    </div>
                               <div>
                               {
                                    this.state.lohang.map((lo, index)=>
                                    {
                                        var ngaysx = new Date(lo.ngaysx);
                                        var ngaysx1 = ngaysx.getDate()+"/"+ (ngaysx.getMonth()+1)+"/"+ ngaysx.getFullYear();
                                        var hansd = new Date(lo.hansd);
                                        var hansd1 = hansd.getDate()+"/"+ (hansd.getMonth()+1)+"/"+ hansd.getFullYear();
                                        var ngaysx = new Date();
                                        var due = hansd.getTime() - ngaysx.getTime();
                                        if ("0" < due && due < "259200000") {
                                            return( 
                                                <div className="almost-due text-center">
                                                    <div key={index} className="row col-12 font-weight-bold">
                                                    <div className="col-3 p-2 border">{lo.tenmon}</div>
                                                        <div className="col-2 p-2 border">Lô {lo.ten_lo}</div>
                                                        <div className="col-2 p-2 border">{lo.soluong}</div>
                                                        <div className="col-2 p-2 border">{ngaysx1}</div>
                                                        <div className="col-2 p-2 border">{hansd1}</div>
                                                        <div className="col-1 mt-2 border">
                                                            <span onClick={this.onDeleteCon.bind(this, lo.id_lo,lo.soluong, lo.idmon)} >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash mt-1 text-danger" viewBox="0 0 16 16">
                                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                                        </svg>
                                                                    </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        else if (due <= "0") {
                                            return( 
                                                <div className="due text-center">
                                                    <div key={index} className="row col-12 font-weight-bold">
                                                    <div className="col-3 p-2 border">{lo.tenmon}</div>
                                                        <div className="col-2 p-2 border">Lô {lo.ten_lo}</div>
                                                        <div className="col-2 p-2 border">{lo.soluong}</div>
                                                        <div className="col-2 p-2 border">{ngaysx1}</div>
                                                        <div className="col-2 p-2 border">{hansd1}</div>
                                                        <div className="col-1 mt-2 border">
                                                        <span onClick={this.onDeleteCon.bind(this, lo.id_lo,lo.soluong, lo.idmon)} >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash mt-1 text-danger" viewBox="0 0 16 16">
                                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                                        </svg>
                                                                    </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        else{
                                            return( 
                                                <div className="text-center">
                                                     <div key={index} className="row col-12 font-weight-bold">
                                                        <div className="col-3 p-2 border">{lo.tenmon}</div>
                                                        <div className="col-2 p-2 border">Lô {lo.ten_lo}</div>
                                                        <div className="col-2 p-2 border">{lo.soluong}</div>
                                                        <div className="col-2 p-2 border">{ngaysx1}</div>
                                                        <div className="col-2 p-2 border">{hansd1}</div>
                                                        <div className="col-1 p-2 border">
                                                        <span onClick={this.onDeleteCon.bind(this, lo.id_lo, lo.soluong, lo.idmon)} >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash mt-1 text-danger" viewBox="0 0 16 16">
                                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                                        </svg>
                                                                    </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    
                                    }
                                    )
                                }
                               </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    </div>
                </div>
                <div className={this.state.class_add}>
                    <AddDish onCloseForm={this.onCloseForm} loadData={this.componentDidMount} />
                </div>
                <div className={this.state.class_edit}>
                    <div>
                        <p onClick={this.hiddenEdit} className="text-right">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-lg exitCake" viewBox="0 0 16 16">
                                <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                            </svg>
                        </p>
                    </div>
                    <div className="col-10 offset-1">
                        <h3 align="center">Sửa thông tin món</h3>
                        <div className="row">
                            <form id="form-update-items" enctype="multipart/form-data">
                                <div className="row form-group">
                                    <label className="col-3 offset-1 control-label text-left">Tên món</label>
                                    <div className="col-8">
                                        <input type="text" name="tenmon" className="form-control ttEdit" defaultValue={this.state.dataOnEdit.tenmon} />
                                    </div>
                                </div>
                                <div className="row form-group ">
                                    <label className="col-3 offset-1 control-label text-left">Giá</label>
                                    <div className="col-8">
                                        <input type="text" name="gia" className="form-control ttEdit" defaultValue={this.state.dataOnEdit.gia} />
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <label className="col-3 offset-1 control-label text-left">Mô tả</label>
                                    <div className="col-8">
                                        <input type="text" name="mota" className="form-control ttEdit" defaultValue={this.state.dataOnEdit.mota} />
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <label className="col-3 offset-1 control-label text-left">Nguyên Liệu</label>
                                    <div className="col-8">
                                        <input type="text" name="nguyenlieu" className="form-control ttEdit" defaultValue={this.state.dataOnEdit.nguyenlieu} />
                                    </div>
                                </div>
                                <div className="row form-group ">
                                    <label className="col-4 control-label text-center">Hình Ảnh</label>
                                    <div className="row col-8 tenhinh">
                                        <div className="col-1">
                                            <input
                                                id="icon-add-img"
                                                type="file"
                                                onChange={(h) => this._handleImageChange(h)}
                                                name="hinhanh"
                                                className="hinhanhEdit" />
                                            <label htmlFor="icon-add-img">
                                                <img src={add} alt="add" className="addimg" alt="add" />
                                            </label>
                                        </div>
                                        <div className="col-8">
                                            <div className="imgPreEdit ml-4">
                                                {$imagePreview}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row col-12">
                                    <div>
                                        <p className="btn btn-info" onClick={this.onEditDish.bind(this, this.state.dataOnEdit.idmon)}>Cập nhật</p>
                                    </div> &nbsp;
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Admin;