import React, { Component } from 'react';
import { Redirect } from 'react-router';
import UserAPI from '../../API/UserAPI';
import Header from '../Header';
import Chipi from '../../img/chipi.png';
import { Link } from 'react-router-dom';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dish: [],
            check: [],
            listItem: new Array(),
            direct: '',
            allChecked: false,
            class_hidden: 'col-11 ml-5 mt-3 text-right hidden',
            tongtien: 0,
            redirect:''
            
        }
        this.onBuyAll = this.onBuyAll.bind(this);
        this.onSize = this.onSize.bind(this);
    }
    componentDidMount = () => {
        let thamso = new FormData();
        thamso.append("idkh", localStorage.getItem('idkh'))
        const api = new UserAPI();
        api.DishCartAPI(thamso)
            .then(response => {
                var arr = [];
                for (var i = 0; i < response.length; i++) {
                    arr.push(0);
                }
                this.setState({
                    dish: response,
                    check: arr,
                });
                console.log(response);

                if (response.length > 0) {
                    this.setState({
                        class_hidden: 'row col-12 mt-3 text-right br visible',
                    })
                }
                else {
                    this.setState({
                        class_hidden: 'col-11 ml-5 mt-3 text-right hidden',
                    })
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    onChange = (e) => {
        e.preventDefault();
        const index = e.target.name;
        const value = e.target.value;
        var data = this.state.dish;
        data[index].sl = value;
        console.log(data[index].gia);
        this.setState({
            dish: data,
        })
        var thamso = new FormData();
        thamso.append("idkh", localStorage.getItem('idkh'));
        thamso.append("sl", data[index].sl);
        thamso.append("idmon", data[index].idmon);
        console.log(data[index].sl)
        const api = new UserAPI();
        api.ChangeQuantityAPI(thamso)
            .then(response => {
                console.log(response);
                this.componentDidMount();
            })
            .catch(error => {
                console.log(error);
            })
    }
    UpQuantity = (e) => {
        e.preventDefault();
        var index = e.target.value;
        var data = this.state.dish;
        console.log(data[index].soluong);
        console.log(data[index].sl);
        if (Number(data[index].soluong) <= data[index].sl && data[index].loai === 'banhngot') {
            data[index].sl = Number(data[index].soluong);
        }
        else{
            data[index].sl = Number(data[index].sl) + 1;
        }
        var thamso = new FormData();
        thamso.append("idkh", localStorage.getItem('idkh'));
        thamso.append("sl", data[index].sl);
        thamso.append("idmon", data[index].idmon);
        console.log(data[index].sl)
        const api = new UserAPI();
        api.ChangeQuantityAPI(thamso)
            .then(response => {
                console.log(response);
                if (response.data[0].code === "200") {
                    this.setState({
                        dish: data,
                    })
                }
            })
            .catch(error => {
                console.log(error);
            })
        if (this.state.listItem.indexOf(index) !== -1) {
            this.setState({ tongtien: this.state.tongtien + Number(data[index].giagh), });
        }
    }
    DownQuantity = (e) => {
        e.preventDefault();
        var index = e.target.value;
        var data = this.state.dish;
        console.log(index);
        if (Number(data[index].sl) > 1) {
            data[index].sl = data[index].sl - 1;
            var thamso = new FormData();
            thamso.append("idkh", localStorage.getItem('idkh'));
            thamso.append("sl", data[index].sl);
            thamso.append("idmon", data[index].idmon);
            console.log(data[index].sl)
            const api = new UserAPI();
            api.ChangeQuantityAPI(thamso)
                .then(response => {
                    console.log(response);
                    if (response.data[0].code === "200") {
                        this.setState({
                            dish: data,
                        })
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            if (this.state.listItem.indexOf(index) !== -1) {
                this.setState({ tongtien: this.state.tongtien - Number(data[index].giagh), });
            }
        }
    }
    onDeleteDish = (index) => {
        let thamso = new FormData();
        thamso.append("idmon", index);
        thamso.append("idkh", localStorage.getItem('idkh'));
        const api = new UserAPI();
        api.DeleteDishCartAPI(thamso)
            .then(response => {
                console.log(response);
                alert("Đã Xóa !");
            })
            .catch(error => {
                console.log(error)
            })
        window.scrollTo(0, 0);
    }
    handleChange = (e) => {
        let index = e.target.name;
        let data = this.state.check;
        let list = this.state.listItem;
        console.log(index);
        if (data[index] === 0) {
            data[index] = 1;
            list.push(index);
            this.setState({
                tongtien: this.state.tongtien + this.state.dish[index].giagh * this.state.dish[index].sl,
            })
        }
        else {
            data[index] = 0;
            list.splice(list.indexOf(index), 1);
            this.setState({
                tongtien: this.state.tongtien - this.state.dish[index].giagh * this.state.dish[index].sl,
            })
        }
        this.setState({
            check: data,
            listItem: list,
        });
    }
    handleAllChange = () => {
        if (this.state.allChecked === false) {
            var arr = [];
            var temp = true;
            var list = new Array();
            var tongtien = 0;
            for (var i = 0; i < this.state.check.length; i++) {
                arr.push(1);
                list.push(String(i));
                tongtien = tongtien + this.state.dish[i].giagh * this.state.dish[i].sl;
            }
            this.setState({
                check: arr,
                allChecked: temp,
                listItem: list,
                tongtien: tongtien,
            });
        }
        else {
            var arr = [];
            var temp = false;
            for (var i = 0; i < this.state.check.length; i++) {
                arr.push(0);
            }
            this.setState({
                check: arr,
                allChecked: temp,
                listItem: [],
                tongtien: 0,
            });
        }

    }
    onBuyAll = () => {
        if (this.state.listItem.length > 0) {
            var stringidmon = "";
            for (let i = 0; i < this.state.listItem.length; i++) {
                stringidmon += "," + this.state.dish[this.state.listItem[i]].idmon;
            }
            this.setState({
                redirect: '/detailorders/' + stringidmon,
            })
        }
        else {
            alert("Chọn món để mua !!!")
        }
    }
    onDeleteAll = () => {
        if (this.state.listItem.length > 0) {
            for (var i = 0; i < this.state.listItem.length; i++) {
                var data = this.state.dish[i];
                let thamso = new FormData();
                thamso.append("idmon", data.idmon);
                thamso.append("idkh", localStorage.getItem('idkh'));
                const api = new UserAPI();
                api.DeleteDishCartAPI(thamso)
                    .then(response => {
                        console.log(response); 
                        this.componentDidMount();
                    })
                    .catch(error => {
                        console.log(error)
                    })
                window.scrollTo(0, 0);
            }
            alert("Đã xóa !!!")
        }
        else {
            alert("Chọn món để xóa !!!")
        }
    }
    onSize = (item, index) => {
        let listmon = this.state.dish;
        let data = listmon[index];
        data.size = item;
        var gia = this.state.dish[index].gia;
        if (item === "S") {
            gia = Number(gia) - Number(gia)*Number(data.km)/100;
        }
        else if (item === "M") {
            gia = Number(gia) + 5000 - Number(gia)*Number(data.km)/100;
        }
        else {
            gia = Number(gia) + 10000 - Number(gia)*Number(data.km)/100;
        }
        data.giagh = gia;
        listmon[index] = data;
        console.log(data);
        this.setState({
            dish: listmon,
        })
        var thamso = new FormData();
        thamso.append("idkh", localStorage.getItem('idkh'));
        thamso.append("size", data.size);
        thamso.append("idmon", data.idmon);
        thamso.append("giagh", data.giagh);
        console.log(data.size);
        console.log(data.idmon);
        const api = new UserAPI();
        api.ChangeSizeAPI(thamso)
            .then(response => {
                console.log(response);
                this.componentDidMount();
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    render() {
        var size = ["S", "M", "L"];
        console.log(this.state.dish);
        console.log(this.state.listItem);
        var stringid = this.state.listItem.join();
        console.log(stringid);
        var stringidmon = "";
        if(this.state.dish.length >0 ){
            for (let i = 0; i < this.state.listItem.length; i++) {
                stringidmon += "," + this.state.dish[this.state.listItem[i]].idmon;
            }
        }
        console.log(stringid);
        const formatNumber = new Intl.NumberFormat('de');
        if (localStorage.getItem('email') === null) {
            return <Redirect to="/Login" />
        }
        if(this.state.redirect !==''){
            return <Redirect to={this.state.redirect}/>
        }
        return (
            <div className="container-fluid br iframeadmin">
                <form>
                    <div className="row bg-yellow">
                        <Header />
                    </div>
                    <div>
                        {
                            this.state.dish.length > 0 ? (

                                <div>
                                        <div className="row  col-11 ml-5 mt-3 headerCart">
                        <div className="mt-2">
                            <input type="checkbox" checked={this.state.allChecked} onClick={this.handleAllChange} />
                        </div>
                        <div className="col-4 mt-2">Món</div>
                        <div className="col-2 mt-2">Đơn Giá</div>
                        <div className="col-1 mt-2">Size</div>
                        <div className="col-2 mt-2">Số Lượng</div>
                        <div className="col-2 mt-2">Số Tiền</div>
                        <div className="mt-2">Thao Tác</div>
                    </div>
                                    {
                                        this.state.dish.map((data, index) => {
                                            if (data.km === null) {
                                                if (this.state.check[index] === 0) {
                                                    return (
                                                        <div key={index}>
                                                            <div className="row  col-11 ml-5 bg-white detailCart">
                                                                <div>
                                                                    <input type="checkbox" name={index} onChange={this.handleChange} />
                                                                </div>
                                                                <div className="col-1">
                                                                    <img src={"http://localhost:80/" + data.hinhanh} className="imgCart" alt="hinhanh" />
                                                                </div>
                                                                <div className="col-3"><span>{data.tenmon}</span></div>
                                                                <div className="col-2"> {formatNumber.format(data.gia)}₫</div>
                                                                <div className="col-1">
                                                                    {
                                                                        data.loai ==='banhngot' ? ( null):(
                                                                            <div class="input-group-prepend">
                                                                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{data.size}</button>
                                                                        <div class="dropdown-menu">
                                                                            {size.map((item, index1) =>
                                                                                <a class="dropdown-item" name={index} value={item} onClick={this.onSize.bind(this, item, index)} href="#">{item}</a>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                        )
                                                                    }
                                                                </div>
                                                                <div className="col-2">
                                                                    <button className="quantity" type="button" value={index} onClick={this.DownQuantity}> - </button>
                                                                    <input className="text-center inputQuantity" name={index} type="number" min="1" onChange={this.onChange} value={data.sl} />
                                                                    <button className="quantity" type="button" value={index} onClick={this.UpQuantity}> + </button>
                                                                </div>
                                                                <div className="col-2 text-danger"> {formatNumber.format(data.giagh * data.sl)}₫</div>
                                                                <div>
                                                                    <button className="btn btn-outline-danger" onClick={this.onDeleteDish.bind(this, data.idmon)}>Xóa</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <div key={index}>
                                                            <div className="row  col-11 ml-5 bg-white detailCart">
                                                                <div>
                                                                    <input type="checkbox" name={index} checked onChange={this.handleChange} />
                                                                </div>
                                                                <div className="col-1">
                                                                    <img src={"http://localhost:80/" + data.hinhanh} className="imgCart" alt="hinhanh" />
                                                                </div>
                                                                <div className="col-3"><span>{data.tenmon}</span></div>
                                                                <div className="col-2"> {formatNumber.format(data.gia)}₫</div>
                                                                <div className="col-1">
                                                                    {
                                                                        data.loai === 'banhngot' ? ( null):(
                                                                            <div class="input-group-prepend">
                                                                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{data.size}</button>
                                                                        <div class="dropdown-menu">
                                                                            {size.map((item, index1) =>
                                                                                <a class="dropdown-item" name={index} value={item} onClick={this.onSize.bind(this, item, index)} href="#">{item}</a>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                        )
                                                                    }
                                                                </div>
                                                                <div className="col-2">
                                                                    <button className="quantity" type="button" value={index} onClick={this.DownQuantity}> - </button>
                                                                    <input className="text-center inputQuantity" name={index} type="number" min="1" onChange={this.onChange} value={data.sl} />
                                                                    <button className="quantity" type="button" value={index} onClick={this.UpQuantity}> + </button>
                                                                </div>
                                                                <div className="col-2 text-danger"> {formatNumber.format(data.giagh * data.sl)}₫</div>
                                                                <div>
                                                                    <button className="btn btn-outline-danger" onClick={this.onDeleteDish.bind(this, data.iddh)}>Xóa</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            }
                                            else {
                                                if (this.state.check[index] === 0) {
                                                    return (
                                                        <div key={index}>
                                                            <div className="row  col-11 ml-5 bg-white detailCart">
                                                                <div>
                                                                    <input type="checkbox" name={index} onChange={this.handleChange} />
                                                                </div>
                                                                <div className="col-1">
                                                                    <img src={"http://localhost:80/" + data.hinhanh} className="imgCart" alt="hinhanh" />
                                                                </div>
                                                                <div className="col-3">
                                                                    <span>{data.tenmon}</span>
                                                                    <p className="giakm">Giảm {data.km}%</p>
                                                                </div>
        
                                                                <div className="col-2">
                                                                    <p className="font-weight-light line">{formatNumber.format(data.gia)}₫</p>
                                                                    <p className="giakm">{formatNumber.format(data.giagh)}₫</p>
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        data.loai === 'banhngot' ? ( null): (
                                                                            <div class="input-group-prepend">
                                                                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{data.size}</button>
                                                                        <div class="dropdown-menu">
                                                                        {size.map((item, index1) =>
                                                                                <a class="dropdown-item" name={index} value={item} onClick={this.onSize.bind(this, item, index)} href="#">{item}</a>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                        )
                                                                    }
                                                                </div>
                                                                <div className="col-2">
                                                                    <button className="quantity" type="button" value={index} onClick={this.DownQuantity}> - </button>
                                                                    <input className="text-center inputQuantity" name={index} type="number" min="1" onChange={this.onChange} value={data.sl} />
                                                                    <button className="quantity" type="button" value={index} onClick={this.UpQuantity}> + </button>
                                                                </div>
                                                                <div className="col-2 text-danger"> {formatNumber.format(data.giagh * data.sl)}₫</div>
                                                                <div>
                                                                    <button className="btn btn-outline-danger" onClick={this.onDeleteDish.bind(this, data.idmon)}>Xóa</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <div key={index}>
                                                            <div className="row  col-11 ml-5 bg-white detailCart">
                                                                <div>
                                                                    <input type="checkbox" name={index} checked onChange={this.handleChange} />
                                                                </div>
                                                                <div className="col-1">
                                                                    <img src={"http://localhost:80/" + data.hinhanh} className="imgCart" alt="hinhanh" />
                                                                </div>
        
                                                                <div className="col-3">
                                                                    <span>{data.tenmon}</span>
                                                                    <p className="giakm">Giảm {data.km}%</p>
                                                                </div>
                                                                <div className="col-2">
                                                                    <p className="font-weight-light line">{formatNumber.format(data.gia)}₫</p>
                                                                    <p className="giakm">{formatNumber.format(data.giagh)}₫</p>
                                                                </div>
                                                                <div className="col-1">
                                                                    {
                                                                        data.loai === 'banhngot' ? ( null):(
                                                                            <div class="input-group-prepend">
                                                                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{data.size}</button>
                                                                        <div class="dropdown-menu">
                                                                        {size.map((item, index1) =>
                                                                                <a class="dropdown-item" name={index} value={item} onClick={this.onSize.bind(this, item, index)} href="#">{item}</a>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                        )
                                                                    }
                                                                </div>
                                                                <div className="col-2">
                                                                    <button className="quantity" type="button" value={index} onClick={this.DownQuantity}> - </button>
                                                                    <input className="text-center inputQuantity" name={index} type="number" min="1" onChange={this.onChange} value={data.sl} />
                                                                    <button className="quantity" type="button" value={index} onClick={this.UpQuantity}> + </button>
                                                                </div>
                                                                <div className="col-2 text-danger"> {formatNumber.format(data.giagh * data.sl)}₫</div>
                                                                <div>
                                                                    <button className="btn btn-outline-danger" onClick={this.onDeleteDish.bind(this, data.iddh)}>Xóa</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            }
                                        }
                                        )
                                    }
                                </div>
                            ) : (
                                <div className="text-center mt-5">
                                    <img src={Chipi} alt="hinhanh" className="chipi" />
                                    <h4><i>Bạn chưa chọn món</i></h4>
                                </div>
                            )
                        }
                    </div>
                    <div className={this.state.class_hidden}>
                        <div className="col-12">
                           <button onClick={this.onBuyAll} className="btn btn-success" type="button" >Đặt Mua</button>
                            &nbsp;
                            <button className="btn btn-danger" type="button" onClick={this.onDeleteAll}>Xóa</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default Cart;