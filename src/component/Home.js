import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from './Header';
import Advertise from './Advertise';
import Logo from '../img/logo.jpg';
import ShowLogin from './ShowLogin';
import DishAPI from '../API/DishAPI';
import UserAPI from '../API/UserAPI';
import GetComment from './user/GetComment';
import Welcome from '../img/welcome.png';
import Chipi from '../img/chipi.png';
import Footer from './Footer';
import Chatbox from './Chatbox';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dish: [],
            dataDetail: {},
            tenmon: '',
            gia: '',
            mota: '',
            hinhanh: '',
            nguyenlieu: '',
            tpdd: '',
            size: 'S',
            class_home: 'col-12 home-visible',
            class_detail: 'col-12 detail-hidden',
            quantity: 1,
            class_ngaysx: 'hidden_ngaysx',
            class_size: 'hidden_ngaysx',
            direct: '',
            note: '',
            bestselling: [],
            allItem: [],
            search: '',
            dishsearch: [],
            class_search: "row col-12 hidden-search",
            class_home2: "row col-12 visible-home2",
            class_tpdd: "row col-12 hidden-tpdd",
            class_nguyenlieu: "row col-11 ml-2 visible-nguyenlieu",
            from: '',
            to: '',
            dishcost: [],
            class_searchcost: 'row col-12 hidden-searchcost',
            class_searchlistcost: 'row col-12 hidden-searchlistcost',
            giaSize: 0,
            searchcost: '',
            dishlistcost: [],
            current_page: 1,
            all_page: 0,
            type: 0,
            current_page_cost: 1,
            all_page_cost: 0,
            class_chat:'class_chat',
            thanhphandd : [],
            
        }
        this.visibleDetailBest = this.visibleDetailBest.bind(this);
    }
    hiddenDetail = () => {
        this.setState({
            class_home: 'col-12 home-visible',
            class_detail: 'col-12 detail-hidden',
            quantity: 1,
            class_ngaysx: 'hidden_ngaysx',
            class_size:'hidden_ngaysx',
            class_tpdd: "row col-12 hidden-tpdd",
            class_nguyenlieu: "row col-11 ml-2 visible-nguyenlieu",
            size: 'S'

        })
        document.getElementById("comment").style.display = "none";
    }
    visibleDetail = (index) => {
        document.getElementById("comment").style.display = "block";
        let data = this.state.dish;
        console.log(data[index]);
        let tpdd = data[index].tpdd.split('|');
        tpdd.splice(data[index].tpdd.length - 1,data[index].tpdd.length);
        this.setState({
            class_detail: 'col-10 offset-1 bg-da detail-visible',
            class_home: 'col-12 home-hidden',
            dataDetail: data[index],
            giaSize: data[index].gia,
            thanhphandd : tpdd
        })
        window.scrollTo(0, 0);
        if (data[index].km === null) { 
            this.setState({
                giaSize: data[index].gia,
            })
        }
        else {
            this.setState({
                giaSize: data[index].gia - (data[index].gia * data[index].km / 100),
            })
        }
        if (data[index].loai === 'banhngot') {
            this.setState({
                class_ngaysx: 'visible_ngaysx',
                class_size: 'hidden_ngaysx'
            })
        }
        else {
            this.setState({
                class_ngaysx: 'hidden_ngaysx',
                class_size: 'visible_ngaysx',
            })
        }
    }

    visibleDetailBest = (index) => {
        console.log(index);
        let data = this.state.allItem;
        let tpdd = data[index].tpdd.split('|');
        tpdd.splice(data[index].tpdd.length - 1,data[index].tpdd.length);
        console.log(data[index]);
        this.setState({
            class_detail: 'col-10 offset-1 bg-da detail-visible',
            class_home: 'col-12 home-hidden',
            dataDetail: data[index],
            giaSize: data[index].gia,
            thanhphandd:tpdd
        })
        window.scrollTo(0, 0);
        if (data[index].km === null) {
            this.setState({
                giaSize: data[index].gia,
            })
        }
        else {
            this.setState({
                giaSize: data[index].gia - (data[index].gia * data[index].km / 100),
            })
        }
        if (data[index].ngaysx !== null) {
            this.setState({
                class_ngaysx: 'visible_ngaysx',
            })
        }
        else {
            this.setState({
                class_ngaysx: 'hidden_ngaysx',
            })
        }
        if (data[index].loai === 'banhngot') {
            this.setState({
                class_ngaysx: 'visible_ngaysx',
                class_size: 'hidden_ngaysx'
            })
        }
        else {
            this.setState({
                class_ngaysx: 'hidden_ngaysx',
                class_size: 'visible_ngaysx',
            })
        }

    }
    visibleDetailSearch = (index) => {
        let data = this.state.dishsearch;
        let tpdd = data[index].tpdd.split('|');
        tpdd.splice(data[index].tpdd.length - 1,data[index].tpdd.length);
        console.log(data[index]);
        this.setState({
            class_detail: 'col-10 offset-1 bg-da detail-visible',
            class_home: 'col-12 home-hidden',
            dataDetail: data[index],
            giaSize: data[index].gia,
            thanhphandd: tpdd
        })
        window.scrollTo(0, 0);
        if (data[index].km === null) {
            this.setState({
                giaSize: data[index].gia,
            })
        }
        else {
            this.setState({
                giaSize: data[index].gia - (data[index].gia * data[index].km / 100),
            })
        }
        if (data[index].ngaysx !== null) {
            this.setState({
                class_ngaysx: 'visible_ngaysx'
            })
        }
        else {
            this.setState({
                class_ngaysx: 'hidden_ngaysx'
            })
        }
        if (data[index].loai === 'banhngot') {
            this.setState({
                class_ngaysx: 'visible_ngaysx',
                class_size: 'hidden_ngaysx'
            })
        }
        else {
            this.setState({
                class_ngaysx: 'hidden_ngaysx',
                class_size: 'visible_ngaysx',
            })
        }
    }
    visibleDetailCost = (index) => {
        let data = this.state.dishcost;
        console.log(data[index]);
        let tpdd = data[index].tpdd.split('|');
        tpdd.splice(data[index].tpdd.length - 1,data[index].tpdd.length);
        this.setState({
            class_detail: 'col-10 offset-1 bg-da detail-visible',
            class_home: 'col-12 home-hidden',
            dataDetail: data[index],
            giaSize: data[index].gia,
            thanhphandd: tpdd,
        })
        window.scrollTo(0, 0);
        if (data[index].km === null) {
            this.setState({
                giaSize: data[index].gia,
            })
        }
        else {
            this.setState({
                giaSize: data[index].gia - (data[index].gia * data[index].km / 100),
            })
        }
        if (data[index].loai === 'banhngot') {
            this.setState({
                class_ngaysx: 'visible_ngaysx',
                class_size: 'hidden_ngaysx'
            })
        }
        else {
            this.setState({
                class_ngaysx: 'hidden_ngaysx',
                class_size: 'visible_ngaysx',
            })
        }
    }

    visibleListCost = (index) => {
        let data = this.state.dishlistcost;
        console.log(data[index]);
        let tpdd = data[index].tpdd.split('|');
        tpdd.splice(data[index].tpdd.length - 1,data[index].tpdd.length);
        this.setState({
            class_detail: 'col-10 offset-1 bg-da detail-visible',
            class_home: 'col-12 home-hidden',
            dataDetail: data[index],
            giaSize: data[index].gia,
            thanhphandd: tpdd,
        })
        window.scrollTo(0, 0);
        if (data[index].km === null) {
            this.setState({
                giaSize: data[index].gia,
            })
        }
        else {
            this.setState({
                giaSize: data[index].gia - (data[index].gia * data[index].km / 100),
            })
        }
        if (data[index].loai === 'banhngot') {
            this.setState({
                class_ngaysx: 'visible_ngaysx',
                class_size: 'hidden_ngaysx'
            })
        }
        else {
            this.setState({
                class_ngaysx: 'hidden_ngaysx',
                class_size: 'visible_ngaysx',
            })
        }
    }
    componentDidMount() {
        this.getItem(0, 1);
        this.BessSelling();
    }
    getItem = (type, page_index) => {
        var thamso = new FormData();
        if (type !== 0) {
            thamso.append("condition", type);
        }
        thamso.append("number", page_index);
        const api = new DishAPI();
        api.DishAPI(thamso)
            .then(response => {
                this.setState({
                    type: type,
                    all_page: response.splice(response.length - 1, response.length),
                    dish: response,
                    class_search: "row col-12 hidden-search",
                    class_home2: "row col-12 visible-home2",
                    class_searchcost: "row col-12 hidden-searchcost",
                    class_searchlistcost: "row col-12 hidden-searchlistcost",
                    current_page: page_index,
                    search: '',
                    from: '',
                    to: '',
                    class_chat:'class_chat'
                });
                console.log(response);
            })
            .catch(error => {
                console.log(error)
            })
    }
    onChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    UpQuantity = (e) => {
        e.preventDefault();
        if (Number(this.state.dataDetail.soluong) === 0 && this.state.dataDetail.loai === 'banhngot') {
            alert("Bánh hết");
        }
        else {
            if (Number(this.state.dataDetail.soluong) <= this.state.quantity && this.state.dataDetail.loai === 'banhngot') {
                this.setState({
                    quantity: Number(this.state.dataDetail.soluong)
                })
            }
            else {
                this.setState({
                    quantity: this.state.quantity + 1
                })
            }
        }
        console.log(this.state.quantity)
    }
    DownQuantity = (e) => {
        e.preventDefault();
        if (this.state.quantity <= 1) {
            this.setState({
                quantity: 1
            })
        }
        else {
            this.setState({
                quantity: this.state.quantity - 1
            })
        }


        console.log(this.state.quantity)
    }
    onAddCart = () => {
        if (localStorage.getItem('idkh') !== null) {
            if (Number(this.state.dataDetail.soluong) === 0 && this.state.dataDetail.loai === 'banhngot') {
                alert("Bánh hết");
            }
            else {
                let thamso = new FormData();
                thamso.append("idmon", this.state.dataDetail.idmon);
                console.log(this.state.dataDetail.idmon);
                thamso.append("sl", this.state.quantity);
                thamso.append("ghichu", this.state.note);
                thamso.append("size", this.state.size);
                thamso.append("gia", this.state.giaSize);
                console.log(this.state.giaSize);
                thamso.append("idkh", localStorage.getItem('idkh'));
                const api = new UserAPI();
                api.AddCartAPI(thamso)
                    .then(response => {
                        console.log(response);
                        if (response.data[0].code === "200") {
                            alert("Đã thêm vào giỏ hàng");
                            this.hiddenDetail();
                            this.componentDidMount();
                            this.setState({
                                size: 'S'
                            })
                        }
                        else {
                            alert("Vui lòng thử lại")
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }

            window.scrollTo(0, 0);
        }
        else {
            this.setState({
                direct: '/Login'
            })
        }
    }
    OnBuy = () => {
        if (localStorage.getItem('idkh') !== null) {
            if (Number(this.state.dataDetail.soluong) === 0 && this.state.dataDetail.loai === 'banhngot') {
                alert("Bánh hết");
            }
            else {
                this.setState({
                    direct: '/detailorders/,' + this.state.dataDetail.idmon + "?tenmon=" + this.state.dataDetail.tenmon + "&soluong=" + this.state.quantity + "&size=" + this.state.size + "&gia=" + this.state.giaSize + "&hinhanh=" + this.state.dataDetail.hinhanh + "&khuyenmai=" + this.state.dataDetail.km
                })
            }
        }
        else {
            this.setState({
                direct: '/Login'
            })
        }
    }
    BessSelling = () => {
        const api = new UserAPI();
        api.BestSellingAPI()
            .then(response => {
                var a = Object.keys(response).sort(function (a, b) { return response[b] - response[a] });
                console.log(a);
                a = a.splice(0,15);
                this.setState({
                    bestselling: a,
                })
            })
            .catch(error => {
                console.log(error);
            })
        this.GetAllItem();
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
    Change = (e) => {
        e.preventDefault();
        this.setState({
            search: e.target.value,
        })
    }

    Tpdd = () => {
        this.setState({
            class_tpdd: "row col-11 ml-2 visible-tpdd",
            class_nguyenlieu: "row col-12 hidden-nguyenlieu",
        })
    }
    Nguyenlieu = () => {
        this.setState({
            class_tpdd: "row col-12 hidden-tpdd",
            class_nguyenlieu: "row col-11 ml-2 visible-nguyenlieu",
        })
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
                    dishsearch: response,
                    class_search: "row col-12 visible-search",
                    class_home2: "row col-12 hidden-home2",
                    class_chat:'none',
                    class_searchcost: "row col-12 hidden-searchcost",
                    class_searchlistcost: "row col-12 hidden-searchlistcost",
                    all_page: response.splice(response.length - 1, response.length),
                    current_page: number,
                })
            })
            .catch(error => {
                console.log(error);
            })

    }
    SearchCost = (number) => {
        let thamso = new FormData();
        thamso.append("from", this.state.from);
        thamso.append("to", this.state.to);
        thamso.append("number", number);
        const api = new UserAPI();
        api.SearchCostAPI(thamso)
            .then(response => {
                console.log(response);
                this.setState({
                    dishcost: response,
                    class_searchcost: "row col-12 visible-searchcost",
                    class_home2: "row col-12 hidden-home2",
                    class_search: "row col-12 hidden-search",
                    class_searchlistcost: "row col-12 hidden-searchlistcost",
                    all_page_cost: response.splice(response.length - 1, response.length),
                    current_page_cost: number,
                    class_chat:'none'
                })
            })
            .catch(error => {
                console.log(error);
            })
        window.scrollTo(0, 0);
    }
    onSize = (e) => {
        e.preventDefault();
        let value = e.target.value;
        if (value === "M") {
            this.setState({
                giaSize: Number(this.state.dataDetail.gia) + 5000,
                size: e.target.value
            })
        }
        else if (value === "L") {
            this.setState({
                giaSize: Number(this.state.dataDetail.gia) + 10000,
                size: e.target.value
            })
        }
        else {
            this.setState({
                giaSize: Number(this.state.dataDetail.gia),
                size: e.target.value
            })
        }
    }
    onChangeCost = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        if (e.target.value !== '') {
            let thamso = new FormData();
            thamso.append("cost", e.target.value);
            thamso.append("number", 1)
            const api = new UserAPI();
            api.SearchListCostAPI(thamso)
                .then(response => {
                    console.log(response);
                    this.setState({
                        dishlistcost: response.splice(0, response.length - 1),
                        class_search: "row col-12 hidden-search",
                        class_home2: "row col-12 hidden-home2",
                        class_searchcost: "row col-12 hidden-searchcost",
                        class_searchlistcost: "row col-12 visible-searchlistcost",
                        current_page_cost: 1,
                        all_page_cost: response,
                        class_chat: 'none'
                    })
                })
                .catch(error => {
                    console.log(error);
                })
            this.setState({
                searchcost: e.target.value,
            })
        }
    }

    onCost = (number) => {
        let thamso = new FormData();
        thamso.append("cost", this.state.searchcost);
        thamso.append("number", number)
        const api = new UserAPI();
        api.SearchListCostAPI(thamso)
            .then(response => {
                console.log(response);
                this.setState({
                    dishlistcost: response.splice(0, response.length - 1),
                    class_search: "row col-12 hidden-search",
                    class_home2: "row col-12 hidden-home2",
                    class_searchcost: "row col-12 hidden-searchcost",
                    class_searchlistcost: "row col-12 visible-searchlistcost",
                    current_page_cost: number,
                    all_page_cost: response,
                    class_chat:'none'
                })
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
    ChangePagi = (action) => {
        if (action === "next") {
            if (Number(this.state.current_page_cost) < Number(this.state.all_page_cost)) {
                this.SearchCost(Number(this.state.current_page_cost + 1));
            }
            else {
                alert("Bạn đang ở cuối trang!");
            }
        }
        else {
            if (Number(this.state.current_page_cost) > 1) {
                this.SearchCost(this.state.current_page_cost - 1)
            }
            else {
                alert("Bạn đang ở đầu trang!");
            }
        }
    }
    ChangePagiSearch = (action) => {
        if (action === "next") {
            if (Number(this.state.current_page) < Number(this.state.all_page)) {
                this.Search(Number(this.state.current_page + 1));
            }
            else {
                alert("Bạn đang ở cuối trang!");
            }
        }
        else {
            if (Number(this.state.current_page) > 1) {
                this.Search(this.state.current_page - 1)
            }
            else {
                alert("Bạn đang ở đầu trang!");
            }
        }
        window.scrollTo(0, 0);
    }
    ChangePagiCost = (action) => {
        if (action === "next") {
            if (Number(this.state.current_page_cost) < Number(this.state.all_page_cost)) {
                this.onCost(Number(this.state.current_page_cost + 1));
            }
            else {
                alert("Bạn đang ở cuối trang!");
            }
        }
        else {
            if (Number(this.state.current_page_cost) > 1) {
                this.onCost(this.state.current_page_cost - 1)
            }
            else {
                alert("Bạn đang ở đầu trang!");
            }
        }
        window.scrollTo(0, 0);
    }
    render() {
        var key = Math.random();
        console.log(this.state.allItem);
        const formatNumber = new Intl.NumberFormat('de');
        if (this.state.direct !== '') {
            return <Redirect to={this.state.direct} />
        }
        if (this.state.bestselling.length === 0 || this.state.allItem.length === 0)
            return null;
        return (

            <div className="row">
                <div className={this.state.class_home}>
                    <div className="row col-12 mb-2 bg-yellow ml-1">
                        <div className="col-3 mt-2 mb-2">
                            <img src={Logo} onClick={this.getItem.bind(this, 0, 1)} className="logo" alt="logo" /> &nbsp;
                            <span className='tenquan' >CHERRY STORE</span>
                        </div>
                        <div className="input-group col-6  mt-3">
                            <input type="text" name="search" value={this.state.search} onChange={this.onChange} className="form-control" placeholder="Bạn tìm..." />
                            <div className="input-group-append">
                                <p onClick={this.Search.bind(this, 1)} className="btn btn-info buttonSearch" >Tìm</p>
                            </div>
                        </div>
                        <div className="col-3 mt-3 text-right">
                            <ShowLogin key={key} />
                        </div>
                    </div>
                    <div className={this.state.class_search}>
                        <div className="col-12">
                            <h4 className="col-12 text-center mt-3">Kết quả tìm kiếm</h4>
                            {
                                this.state.dishsearch.length > 0 ? (
                                <div>
                                    
                                    <div>
                                        {
                                            this.state.dishsearch.map((data, index) => {
                                                if (data.km === null) {
                                                    return (
                                                        <div className="col-2 mb-2 mon">
                                                            <img onClick={this.visibleDetailSearch.bind(this, index)} className="hinhanh" src={"http://localhost:80/" + data.hinhanh} alt="hinhanh" />
                                                            <p className="text-truncate ttmonCArt text" onClick={this.visibleDetailSearch.bind(this, index)}>{data.tenmon}</p>
                                                            <p className="text-truncate ttmonCArt gia" onClick={this.visibleDetailSearch.bind(this, index)}>{formatNumber.format(data.gia)}₫</p>
        
                                                        </div>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <div className="col-2 mb-2 mon">
                                                            <div className="km">-{data.km}%</div>
                                                            <img onClick={this.visibleDetailSearch.bind(this, index)} className="hinhanh" src={"http://localhost:80/" + data.hinhanh} alt="hinhanh" />
                                                            <p className="text-truncate ttmonCArt text" onClick={this.visibleDetailSearch.bind(this, index)}>{data.tenmon}</p>
                                                            <p className="text-truncate ttmonCArt">
                                                                <span className="text-truncate ttmonCArt giabthg" onClick={this.visibleDetailSearch.bind(this, index)}>{formatNumber.format(data.gia)}₫</span> &nbsp;
                                                                <span className="text-truncate ttmonCArt gia" onClick={this.visibleDetailSearch.bind(this, index)}>{formatNumber.format(data.gia - (data.gia * data.km / 100))}₫</span>
        
                                                            </p>
                                                        </div>
                                                    )
                                                }
                                            }
                                            )
                                        }
                                    </div>
                                    <div className="col-12 mt-2 text-center">
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
                        
                    </div>
                    <div className={this.state.class_searchlistcost}>
                        <div className="col-12">
                            <h4 className="col-12 text-center mt-3">Kết quả tìm kiếm</h4>
                            {
                                this.state.dishlistcost.length > 0 ? (
                                    <div>
                                        <div>
                                            {
                                                this.state.dishlistcost.map((data, index) => {
                                                    if (data.km === null) {
                                                        return (
                                                            <div className="col-2 mb-2 mon">
                                                                <img onClick={this.visibleListCost.bind(this, index)} className="hinhanh" src={"http://localhost:80/" + data.hinhanh} alt="hinhanh" />
                                                                <p className="text-truncate ttmonCArt text" onClick={this.visibleListCost.bind(this, index)}>{data.tenmon}</p>
                                                                <p className="text-truncate ttmonCArt gia" onClick={this.visibleListCost.bind(this, index)}>{formatNumber.format(data.gia)}₫</p>
            
                                                            </div>
                                                        )
                                                    }
                                                    else {
                                                        return (
                                                            <div className="col-2 mb-2 mon">
                                                                <div className="km">-{data.km}%</div>
                                                                <img onClick={this.visibleListCost.bind(this, index)} className="hinhanh" src={"http://localhost:80/" + data.hinhanh} alt="hinhanh" />
                                                                <p className="text-truncate ttmonCArt text" onClick={this.visibleListCost.bind(this, index)}>{data.tenmon}</p>
                                                                <p className="text-truncate ttmonCArt">
                                                                    <span className="text-truncate ttmonCArt giabthg" onClick={this.visibleListCost.bind(this, index)}>{formatNumber.format(data.gia)}₫</span> &nbsp;
                                                                    <span className="text-truncate ttmonCArt gia" onClick={this.visibleListCost.bind(this, index)}>{formatNumber.format(data.gia - (data.gia * data.km / 100))}₫</span>
                                                                </p>
                                                            </div>
                                                        )
                                                    }
                                                }
                                                )
                                            }
                                        </div>
                                        <div className="col-12 mt-2 text-center">
                                            <span className="border border-secondary p-1  pl-2 pr-2  mr-1" onClick={this.ChangePagiCost.bind(this, 'previous')}>	&lt;</span>
                                            <span className="border border-secondary p-1 mr-1 bg-white">{"Trang " + this.state.current_page_cost + "/" + this.state.all_page_cost}</span>
                                            <span className="border border-secondary p-1 pl-2 pr-2 " onClick={this.ChangePagiCost.bind(this, 'next')}>&gt;</span>
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
                    </div>
                    <div className={this.state.class_searchcost}>
                        <div className="col-12">
                            <h4 className="col-12 text-center mt-3">Kết quả tìm kiếm</h4>
                            {
                                this.state.dishcost.length > 0 ? (
                                   <div>
                                       <div>
                                           {
                                                this.state.dishcost.map((data, index) => {
                                                    if (data.km === null) {
                                                        return (
                                                            <div className="col-2 mb-2 mon">
            
                                                                <img onClick={this.visibleDetailCost.bind(this, index)} className="hinhanh" src={"http://localhost:80/" + data.hinhanh} alt="hinhanh" />
                                                                <p className="text-truncate ttmonCArt text" onClick={this.visibleDetailCost.bind(this, index)}>{data.tenmon}</p>
                                                                <p className="text-truncate ttmonCArt gia" onClick={this.visibleDetailCost.bind(this, index)}>{formatNumber.format(data.gia)}₫</p>
            
                                                            </div>
                                                        )
                                                    }
                                                    else {
                                                        return (
                                                            <div className="col-2 mb-2 mon">
                                                                <div className="km">-{data.km}%</div>
                                                                <img onClick={this.visibleDetailCost.bind(this, index)} className="hinhanh" src={"http://localhost:80/" + data.hinhanh} alt="hinhanh" />
                                                                <p className="text-truncate ttmonCArt text" onClick={this.visibleDetailCost.bind(this, index)}>{data.tenmon}</p>
                                                                <p className="text-truncate ttmonCArt">
                                                                    <span className="text-truncate ttmonCArt giabthg" onClick={this.visibleDetailCost.bind(this, index)}>{formatNumber.format(data.gia)}₫</span> &nbsp;
                                                                    <span className="text-truncate ttmonCArt gia" onClick={this.visibleDetailCost.bind(this, index)}>{formatNumber.format(data.gia - (data.gia * data.km / 100))}₫</span>
                                                                </p>
                                                            </div>
                                                        )
                                                    }
                                                }
                                                )
                                           }
                                       </div>
                                       <div className="col-12 mt-2 text-center">
                                            <span className="border border-secondary p-1  pl-2 pr-2  mr-1" onClick={this.ChangePagi.bind(this, 'previous')}>	&lt;</span>
                                            <span className="border border-secondary p-1 mr-1 bg-white">{"Trang " + this.state.current_page_cost + "/" + this.state.all_page_cost}</span>
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
                    </div>
                    <div className={this.state.class_home2}>
                        <div className="col-md-12 mb-2">
                            <Advertise />
                        </div>
                        <div className="col-md-12">
                            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                                <div className="container-fluid">
                                    <div className="collapse navbar-collapse" id="navbarNav">
                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <a className="nav-link active" aria-current="page" href="#" onClick={this.getItem.bind(this, 0, 1)}>Menu</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#" onClick={this.getItem.bind(this, 'trasua', 1)}>Trà Sữa</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#" onClick={this.getItem.bind(this, 'banhngot', 1)} >Bánh Ngọt</a>
                                            </li>
                                            <li className="nav-item">
                                                <div className="mr-2 mt-1 ml-528">
                                                    <select name="searchcost" value={this.state.searchcost} onChange={this.onChangeCost} class="custom-select inputcost">
                                                        <option value="">Chọn theo giá</option>
                                                        <option value="asc">Từ thấp đến cao</option>
                                                        <option value="desc">Từ cao đến thấp</option>
                                                        <option value="thap">0₫ - 30.000₫</option>
                                                        <option value="tbthap">30.000₫ - 60.000₫</option>
                                                        <option value="tb">60.000₫ - 90.000₫</option>
                                                        <option value="cao">90.000₫ - 150.000₫</option>
                                                    </select>
                                                </div>
                                            </li>
                                            <li className="nav-item">
                                                <div className="mt-2">
                                                    <span className="font-weight-light">Chọn giá từ: </span>
                                                    <input type="text" value={this.state.from} onChange={this.onChange} name="from" className="inputgia" />
                                                    <span className="font-weight-light"> đến: </span>
                                                    <input type="text" value={this.state.to} onChange={this.onChange} name="to" className="inputgia" />
                                                    <span onClick={this.SearchCost.bind(this, 1)} className="ml-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-search searchcolor" viewBox="0 0 16 16">
                                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        <div className="col-12" id="show">
                            <div className="container-fluid">
                                <div className="row">
                                    {
                                        this.state.dish.map((data, index) => {
                                            if (data.km === null) {
                                                return (
                                                    <div className="col-2 mb-2 mon">
                                                        <img onClick={this.visibleDetail.bind(this, index)} className="hinhanh" src={"http://localhost:80/" + data.hinhanh} alt="hinhanh" />
                                                        <p className="text-truncate ttmonCArt text" onClick={this.visibleDetail.bind(this, index)}>{data.tenmon}</p>
                                                        <p className="text-truncate ttmonCArt gia" onClick={this.visibleDetail.bind(this, index)}>{formatNumber.format(data.gia)}₫</p>

                                                    </div>
                                                )
                                            }
                                            else {
                                                return (
                                                    <div className="col-2 mb-2 mon">
                                                        <div className="km">-{data.km}%</div>
                                                        <img onClick={this.visibleDetail.bind(this, index)} className="hinhanh" src={"http://localhost:80/" + data.hinhanh} alt="hinhanh" />
                                                        <p className="text-truncate ttmonCArt text" onClick={this.visibleDetail.bind(this, index)}>{data.tenmon}</p>
                                                        <span className="text-truncate ttmonCArt giabthg" onClick={this.visibleDetail.bind(this, index)}>{formatNumber.format(data.gia)}₫</span> &nbsp;
                                                        <span className="text-truncate ttmonCArt gia" onClick={this.visibleDetail.bind(this, index)}>{formatNumber.format(data.gia - (data.gia * data.km / 100))}₫</span>

                                                    </div>
                                                )
                                            }
                                        }
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-2 text-center">
                            <span className="border border-secondary p-1  pl-2 pr-2  mr-1" onClick={this.ChangePagination.bind(this, 'previous')}>	&lt;</span>
                            <span className="border border-secondary p-1 mr-1 bg-white">{"Trang " + this.state.current_page + "/" + this.state.all_page}</span>
                            <span className="border border-secondary p-1 pl-2 pr-2 " onClick={this.ChangePagination.bind(this, 'next')}>&gt;</span>
                        </div>
                        <div className={this.state.class_chat}>
                            <Chatbox visibleDetailBest={this.visibleDetailBest}/>
                        </div>
                        <div className="row col-12 ml-4 mt-3">
                            <Footer />
                        </div>
                    </div>
                </div>
                <div className={this.state.class_detail}>
                    <form>
                        {
                            this.state.dataDetail.km === null ? (
                                this.state.dataDetail.diem === null || this.state.dataDetail.diem === 0 ? (
                                    <div>
                                        <p onClick={this.hiddenDetail}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg btn btn-outline-danger exit" viewBox="0 0 16 16">
                                                <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                                            </svg>
                                        </p>
                                        <div className="row ">
                                            <div className="row col-10 offset-1">
                                                <div className="col-6">
                                                    <img src={"http://localhost:80/" + this.state.dataDetail.hinhanh} className="hinhanhDetail" alt="hinhanh" />
                                                </div>
                                                <div className="col-6">
                                                    <h2>{this.state.dataDetail.tenmon}</h2>
                                                    <i className="font-weight-light">{this.state.dataDetail.mota}</i>
                                                    <h2 className="text-primary giaDetail">{formatNumber.format(this.state.giaSize)}₫</h2>
                                                    <div className={this.state.class_ngaysx}>
                                                       
                                                        <p className="nguyenlieu"><i>Số lượng còn lại: {this.state.dataDetail.soluong}</i></p>
                                                    </div>
                                                    <div className={this.state.class_size}>
                                                    <div className="row mt-3 mb-3">
                                                        <span className="col-1 mt-1">Size: </span>
                                                        <select name="size" onChange={this.onSize} value={this.state.size} class="custom-select text-center col-2 ml-3">
                                                            <option value="S">S</option>
                                                            <option value="M">M</option>
                                                            <option value="L">L</option>

                                                        </select>
                                                    </div>
                                                    </div>

                                                    <div>
                                                        <button className="quantity" type="button" onClick={this.DownQuantity}> - </button>
                                                        <input className="text-center inputQuantity" name="quantity" type="text" onChange={this.onChange} Value={this.state.quantity} />
                                                        <button className="quantity" type="button" onClick={this.UpQuantity}> + </button>
                                                    </div>
                                                    <button className="mt-4 btn btn-outline-primary" type="button" onClick={this.onAddCart}>Thêm Vào Giỏ Hàng</button> &nbsp;
                                                    <button type="button" onClick={this.OnBuy} className="mt-4 btn btn-success">Mua Ngay</button>
                                                </div>
                                            </div>
                                            <div className="col-12 mt-2">
                                                <p className="btn btn-info" onClick={this.Nguyenlieu}>Nguyên liệu</p> &nbsp;
                                                <p className="btn btn-info" onClick={this.Tpdd}>Thành phần dinh dưỡng</p>
                                            </div>
                                            <div className="row col-12">
                                                <div className={this.state.class_nguyenlieu}>{this.state.dataDetail.nguyenlieu}</div>
                                                <div className={this.state.class_tpdd}>
                                                    {
                                                        this.state.thanhphandd.map((tpdd, index)=>
                                                            <p>{tpdd}</p>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div className="row col-12" id="comment">
                                                <GetComment key={this.state.dataDetail.idmon} idmon={this.state.dataDetail.idmon} />
                                            </div>
                                            <div className="row col-12 mt-3">
                                            <h3 className="col-12 text-center font-weight-light text-info">Danh sách bán chạy</h3>
                                                {
                                                    this.state.bestselling.map((idmon, index) =>
                                                        this.state.allItem[idmon].km === null ? (

                                                            <div key={index} className="col-2 mb-2 mon ">
                                                                <img onClick={this.visibleDetailBest.bind(this, idmon)} className="hinhanhBestSelling" src={"http://localhost:80/" + this.state.allItem[idmon].hinhanh} alt="hinhanh" />
                                                                <p onClick={this.visibleDetailBest.bind(this, idmon)} className="text-truncate ttmonCArt" >{this.state.allItem[idmon].tenmon}</p>
                                                                <p onClick={this.visibleDetailBest.bind(this, idmon)} className="text-truncate ttmonCArt gia" >{formatNumber.format(this.state.allItem[idmon].gia)}₫</p>
                                                            </div>
                                                        ) : (
                                                            <div key={index} className="col-2 mb-2 mon ">
                                                                <div className="kmbess">-{this.state.allItem[idmon].km}%</div>
                                                                <img onClick={this.visibleDetailBest.bind(this, idmon)} className="hinhanhBestSelling" src={"http://localhost:80/" + this.state.allItem[idmon].hinhanh} alt="hinhanh" />
                                                                <p onClick={this.visibleDetailBest.bind(this, idmon)} className="text-truncate ttmonCArt" >{this.state.allItem[idmon].tenmon}</p>
                                                                <p onClick={this.visibleDetailBest.bind(this, idmon)} className="text-truncate ttmonCArt gia" >{formatNumber.format(this.state.allItem[idmon].gia)}₫</p>
                                                            </div>
                                                        )
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <p onClick={this.hiddenDetail}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg btn btn-outline-danger exit" viewBox="0 0 16 16">
                                                <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                                            </svg>
                                        </p>
                                        <div className="row">
                                            <div className="row col-10 offset-1">
                                                <div className="col-6">
                                                    <img src={"http://localhost:80/" + this.state.dataDetail.hinhanh} className="hinhanhDetail" alt="hinhanh" />
                                                </div>
                                                <div className="col-6">
                                                    <h2>{this.state.dataDetail.tenmon}</h2>
                                                    <i className="font-weight-light">{this.state.dataDetail.mota}</i>
                                                    <div className="ratings mt-auto">
                                                        <div className="rating-outer-detail">
                                                            <div className="rating-inner" style={{ width: `${(this.state.dataDetail.diem / 5) * 100}%` }}></div>
                                                        </div>
                                                    </div>
                                                    <h2 className="text-primary giaDetail">{formatNumber.format(this.state.giaSize)}₫</h2>
                                                    <div className={this.state.class_ngaysx}>
                                                       
                                                        <p className="nguyenlieu"><i>Số lượng còn lại: {this.state.dataDetail.soluong}</i></p>
                                                    </div>
                                                    <div className={this.state.class_size}>
                                                    <div className="row mt-3 mb-3">
                                                        <span className="col-1 mt-1">Size: </span>
                                                        <select name="size" onChange={this.onSize} value={this.state.size} class="custom-select text-center col-2 ml-3">
                                                            <option value="S">S</option>
                                                            <option value="M">M</option>
                                                            <option value="L">L</option>

                                                        </select>
                                                    </div>
                                                    </div>
                                                    <div>
                                                        <button className="quantity" type="button" onClick={this.DownQuantity}> - </button>
                                                        <input className="text-center inputQuantity" name="quantity" type="text" onChange={this.onChange} Value={this.state.quantity} />
                                                        <button className="quantity" type="button" onClick={this.UpQuantity}> + </button>
                                                    </div>
                                                    <button className="mt-4 btn btn-outline-primary" type="button" onClick={this.onAddCart}>Thêm Vào Giỏ Hàng</button> &nbsp;
                                                    <button onClick={this.OnBuy} type="button" className="mt-4 btn btn-success">Mua Ngay</button>                                                     </div>
                                            </div>
                                            <div className="col-12 mt-2">
                                                <p className="btn btn-info" onClick={this.Nguyenlieu}>Nguyên liệu</p> &nbsp;
                                                <p className="btn btn-info" onClick={this.Tpdd}>Thành phần dinh dưỡng</p>
                                            </div>
                                            <div className="row col-12">
                                                <div className={this.state.class_nguyenlieu}>{this.state.dataDetail.nguyenlieu}</div>
                                                <div className={this.state.class_tpdd}>
                                                    {
                                                        this.state.thanhphandd.map((tpdd, index)=>
                                                            <p>{tpdd}</p>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div className="row col-12 " id="comment">
                                                <GetComment key={this.state.dataDetail.idmon} idmon={this.state.dataDetail.idmon} />
                                            </div>
                                            <div className="row col-12 mt-3">
                                            <h3 className="col-12 text-center font-weight-light text-info">Danh sách bán chạy</h3>
                                                {
                                                    this.state.bestselling.map((idmon, index) =>
                                                        this.state.allItem[idmon].km === null ? (

                                                            <div key={index} className="col-2 mb-2 mon ">
                                                                <img onClick={this.visibleDetailBest.bind(this, idmon)} className="hinhanhBestSelling" src={"http://localhost:80/" + this.state.allItem[idmon].hinhanh} alt="hinhanh" />
                                                                <p onClick={this.visibleDetailBest.bind(this, idmon)} className="text-truncate ttmonCArt" >{this.state.allItem[idmon].tenmon}</p>
                                                                <p onClick={this.visibleDetailBest.bind(this, idmon)} className="text-truncate ttmonCArt gia" >{formatNumber.format(this.state.allItem[idmon].gia)}₫</p>
                                                            </div>
                                                        ) : (
                                                            <div key={index} className="col-2 mb-2 mon ">
                                                                <div className="kmbess">-{this.state.allItem[idmon].km}%</div>
                                                                <img onClick={this.visibleDetailBest.bind(this, idmon)} className="hinhanhBestSelling" src={"http://localhost:80/" + this.state.allItem[idmon].hinhanh} alt="hinhanh" />
                                                                <p onClick={this.visibleDetailBest.bind(this, idmon)} className="text-truncate ttmonCArt" >{this.state.allItem[idmon].tenmon}</p>
                                                                <p onClick={this.visibleDetailBest.bind(this, idmon)} className="text-truncate ttmonCArt gia" >{formatNumber.format(this.state.allItem[idmon].gia)}₫</p>
                                                            </div>
                                                        )
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            ) : (
                                this.state.dataDetail.diem === null || this.state.dataDetail.diem === 0 ? (
                                    <div>
                                        <p onClick={this.hiddenDetail}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg btn btn-outline-danger exit" viewBox="0 0 16 16">
                                                <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                                            </svg>
                                        </p>
                                        <div className="row">
                                            <div className="row col-10 offset-1">
                                                <div className="col-6">
                                                    <img src={"http://localhost:80/" + this.state.dataDetail.hinhanh} className="hinhanhDetail" alt="hinhanh" />
                                                </div>
                                                <div className="col-6">
                                                    <span className="tenmon font-weight-bold">{this.state.dataDetail.tenmon} </span><span className="giam">Giảm {this.state.dataDetail.km}%</span>
                                                    <p> <i className="font-weight-light">{this.state.dataDetail.mota}</i></p>
                                                    <span className="giaDetailbthg">{formatNumber.format(this.state.dataDetail.gia)}₫</span> &nbsp;&nbsp;
                                                    <span className="text-primary giaDetail">{formatNumber.format(this.state.giaSize)}₫</span>
                                                    <div className={this.state.class_ngaysx}>
                                                       
                                                        <p className="nguyenlieu"><i>Số lượng còn lại: {this.state.dataDetail.soluong}</i></p>
                                                    </div>
                                                    <div className={this.state.class_size}>
                                                    <div className="row mt-3 mb-3">
                                                        <span className="col-1 mt-1">Size: </span>
                                                        <select name="size" onChange={this.onSize} value={this.state.size} class="custom-select text-center col-2 ml-3">
                                                            <option value="S">S</option>
                                                            <option value="M">M</option>
                                                            <option value="L">L</option>

                                                        </select>
                                                    </div>
                                                    </div>

                                                    <div>
                                                        <button className="quantity" type="button" onClick={this.DownQuantity}> - </button>
                                                        <input className="text-center inputQuantity" name="quantity" type="text" onChange={this.onChange} Value={this.state.quantity} />
                                                        <button className="quantity" type="button" onClick={this.UpQuantity}> + </button>
                                                    </div>
                                                    <button className="mt-4 btn btn-outline-primary" type="button" onClick={this.onAddCart}>Thêm Vào Giỏ Hàng</button> &nbsp;
                                                    <button onClick={this.OnBuy} type="button" className="mt-4 btn btn-success">Mua Ngay</button>                                                     </div>
                                            </div>
                                            <div className="col-12 mt-2">
                                                <p className="btn btn-info" onClick={this.Nguyenlieu}>Nguyên liệu</p> &nbsp;
                                                <p className="btn btn-info" onClick={this.Tpdd}>Thành phần dinh dưỡng</p>
                                            </div>
                                            <div className="row col-12">
                                                <div className={this.state.class_nguyenlieu}>{this.state.dataDetail.nguyenlieu}</div>
                                                <div className={this.state.class_tpdd}>
                                                    {
                                                        this.state.thanhphandd.map((tpdd, index)=>
                                                            <p>{tpdd}</p>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div className="row col-12" id="comment">
                                                <GetComment key={this.state.dataDetail.idmon} idmon={this.state.dataDetail.idmon} />
                                            </div>
                                            <div className="row col-12 mt-3">
                                            <h3 className="col-12 text-center font-weight-light text-info">Danh sách bán chạy</h3>
                                                {
                                                    this.state.bestselling.map((idmon, index) =>
                                                        this.state.allItem[idmon].km === null ? (

                                                            <div key={index} className="col-2 mb-2 mon ">
                                                                <img onClick={this.visibleDetailBest.bind(this, idmon)} className="hinhanhBestSelling" src={"http://localhost:80/" + this.state.allItem[idmon].hinhanh} alt="hinhanh" />
                                                                <p onClick={this.visibleDetailBest.bind(this, idmon)} className="text-truncate ttmonCArt" >{this.state.allItem[idmon].tenmon}</p>
                                                                <p onClick={this.visibleDetailBest.bind(this, idmon)} className="text-truncate ttmonCArt gia" >{formatNumber.format(this.state.allItem[idmon].gia)}₫</p>
                                                            </div>
                                                        ) : (
                                                            <div key={index} className="col-2 mb-2 mon ">
                                                                <div className="kmbess">-{this.state.allItem[idmon].km}%</div>
                                                                <img onClick={this.visibleDetailBest.bind(this, idmon)} className="hinhanhBestSelling" src={"http://localhost:80/" + this.state.allItem[idmon].hinhanh} alt="hinhanh" />
                                                                <p onClick={this.visibleDetailBest.bind(this, idmon)} className="text-truncate ttmonCArt" >{this.state.allItem[idmon].tenmon}</p>
                                                                <p onClick={this.visibleDetailBest.bind(this, idmon)} className="text-truncate ttmonCArt gia" >{formatNumber.format(this.state.allItem[idmon].gia)}₫</p>
                                                            </div>
                                                        )
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <p onClick={this.hiddenDetail}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg btn btn-outline-danger exit" viewBox="0 0 16 16">
                                                <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                                            </svg>
                                        </p>
                                        <div className="row">
                                            <div className="row col-10 offset-1">
                                                <div className="col-6">
                                                    <img src={"http://localhost:80/" + this.state.dataDetail.hinhanh} className="hinhanhDetail" alt="hinhanh" />
                                                </div>
                                                <div className="col-6">
                                                    <span className="tenmon font-weight-bold mt-1">{this.state.dataDetail.tenmon} </span><span className="giam">Giảm {this.state.dataDetail.km}%</span>
                                                    <p> <i className="font-weight-light">{this.state.dataDetail.mota}</i></p>
                                                    <div className="ratings mt-auto">
                                                        <div className="rating-outer-detail">
                                                            <div className="rating-inner" style={{ width: `${(this.state.dataDetail.diem / 5) * 100}%` }}></div>
                                                        </div>
                                                    </div>
                                                    <span className="giaDetailbthg">{formatNumber.format(this.state.dataDetail.gia)}₫</span> &nbsp;&nbsp;
                                                    <span className="text-primary giaDetail">{formatNumber.format(this.state.giaSize)}₫</span>
                                                    <div className={this.state.class_ngaysx}>
                                                        <p className="nguyenlieu"><i>Số lượng còn lại: {this.state.dataDetail.soluong}</i></p>
                                                    </div>
                                                    <div className={this.state.class_size}>
                                                    <div className="row mt-3 mb-3">
                                                        <span className="col-1 mt-1">Size: </span>
                                                        <select name="size" onChange={this.onSize} value={this.state.size} class="custom-select text-center col-2 ml-3">
                                                            <option value="S">S</option>
                                                            <option value="M">M</option>
                                                            <option value="L">L</option>

                                                        </select>
                                                    </div>
                                                    </div>
                                                    <div>
                                                        <button className="quantity" type="button" onClick={this.DownQuantity}> - </button>
                                                        <input className="text-center inputQuantity" name="quantity" type="text" onChange={this.onChange} Value={this.state.quantity} />
                                                        <button className="quantity" type="button" onClick={this.UpQuantity}> + </button>
                                                    </div>
                                                    <button className="mt-4 btn btn-outline-primary" type="button" onClick={this.onAddCart}>Thêm Vào Giỏ Hàng</button> &nbsp;
                                                    <button onClick={this.OnBuy} type="button" className="mt-4 btn btn-success">Mua Ngay</button>                                                     </div>
                                            </div>
                                            <div className="col-12 mt-2">
                                                <p className="btn btn-info" onClick={this.Nguyenlieu}>Nguyên liệu</p> &nbsp;
                                                <p className="btn btn-info" onClick={this.Tpdd}>Thành phần dinh dưỡng</p>
                                            </div>
                                            <div className="row col-12">
                                                <div className={this.state.class_nguyenlieu}>{this.state.dataDetail.nguyenlieu}</div>
                                                <div className={this.state.class_tpdd}>
                                                    {
                                                        this.state.thanhphandd.map((tpdd, index)=>
                                                            <p>{tpdd}</p>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div className="row col-12" id="comment">
                                                <GetComment key={this.state.dataDetail.idmon} idmon={this.state.dataDetail.idmon} />
                                            </div>
                                            <div className="row col-12 mt-3">
                                                <h3 className="col-12 text-center font-weight-light text-info">Danh sách bán chạy</h3>
                                                {
                                                    this.state.bestselling.map((idmon, index) =>
                                                        this.state.allItem[idmon].km === null ? (

                                                            <div key={index} className="col-2 mb-2 mon ">
                                                                <img onClick={this.visibleDetailBest.bind(this, idmon)} className="hinhanhBestSelling" src={"http://localhost:80/" + this.state.allItem[idmon].hinhanh} alt="hinhanh" />
                                                                <p onClick={this.visibleDetailBest.bind(this, idmon)} className="text-truncate ttmonCArt" >{this.state.allItem[idmon].tenmon}</p>
                                                                <p onClick={this.visibleDetailBest.bind(this, idmon)} className="text-truncate ttmonCArt gia" >{formatNumber.format(this.state.allItem[idmon].gia)}₫</p>
                                                            </div>
                                                        ) : (
                                                            <div key={index} className="col-2 mb-2 mon ">
                                                                <div className="kmbess">-{this.state.allItem[idmon].km}%</div>
                                                                <img onClick={this.visibleDetailBest.bind(this, idmon)} className="hinhanhBestSelling" src={"http://localhost:80/" + this.state.allItem[idmon].hinhanh} alt="hinhanh" />
                                                                <p onClick={this.visibleDetailBest.bind(this, idmon)} className="text-truncate ttmonCArt" >{this.state.allItem[idmon].tenmon}</p>
                                                                <p onClick={this.visibleDetailBest.bind(this, idmon)} className="text-truncate ttmonCArt gia" >{formatNumber.format(this.state.allItem[idmon].gia)}₫</p>
                                                            </div>
                                                        )
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            )
                        }
                    </form>
                </div>
            </div>
        );
    }
}

export default Home;