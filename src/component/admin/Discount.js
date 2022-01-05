import React, { Component } from 'react';
import AdminAPI from '../../API/admin/AdminAPI';
import DishAdminAPI from '../../API/DishAdminAPI';
import UserAPI from '../../API/UserAPI';

class Discount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            km: '',
            loai: 'all',
            discount: [],
            dishAdmin: [],
            class_km: 'row col-12 hidden',
            detail: [],
            kmm: '',
            from: '',
            to: ''
        }
    }
    onChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }
    Discount = () => {
        let thamso = new FormData();
        thamso.append("km", this.state.km);
        console.log(this.state.loai);
        console.log(this.state.km);
        thamso.append("loai", this.state.loai);
        thamso.append("from", this.state.from);
        thamso.append("to", this.state.to);
        const api = new AdminAPI();
        api.DiscountAPI(thamso)
            .then(response => {
                console.log(response);
                if (response[0].code === "200") {
                    alert("Đã cập nhật");
                    this.setState({
                        loai: 'all',
                        km: '',
                        from: '',
                        to: '',
                        fromid: '',
                        to: ''
                    })
                }
                else { alert("Vui lòng thử lại !!!"); }
            })
            .catch(error => {
                console.log(error);
            })

    }
    componentDidMount() {
        const api = new AdminAPI();
        api.GetDiscountAPI()
            .then(response => {
                console.log(response);
                this.setState({
                    discount: response
                })
            })
            .catch(error => {
                console.log(error);
            })
        //setTimeout(() => {
           // this.componentDidMount()
        //}, 4000);
        this.getAllItem();
    }
    DeleteDiscount = (type) => {
        let thamso = new FormData();
        thamso.append("type", type);
        const api = new AdminAPI();
        api.DeleteDiscountAPI(thamso)
            .then(response => {
                console.log(response);
                if (response[0].code === '200') {
                    this.componentDidMount();
                    alert("Đã xóa khuyến mãi !!!");
                }
                else {
                    alert("Vui lòng thử lại !!!");
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    getAllItem() {
        const api = new UserAPI();
        api.GetAllDishAPI()
            .then(response => {
                console.log(response);
                this.setState({
                    dishAdmin: response,
                });
                console.log(response);
            })
            .catch(error => {
                console.log(error)
            })
    }
    Detail = (index) => {
        let data = this.state.dishAdmin;
        console.log(data[index]);
        this.setState({
            detail: data[index],
            class_km: ' row col-8 offset-2 br border mt-3 visible-home2'
        })
    }
    DiscountDish = (index, loai) => {
        console.log(loai);
        let thamso = new FormData();
        thamso.append("km", this.state.kmm);
        thamso.append("idmon", index);
        thamso.append("loai", loai);
        thamso.append("from", this.state.fromid);
        thamso.append("to", this.state.toid);
        const api = new AdminAPI();
        api.DiscountDishAPI(thamso)
            .then(response => {
                console.log(response);
                if (response[0].code === "200") {
                    alert("Đã cập nhật");
                    this.setState({
                        kmm: '',
                        fromid: '',
                        toid: '',
                    })
                }
                else { alert("Vui lòng thử lại !!!"); }
            })
            .catch(error => {
                console.log(error);
            })
    }
    onHidden = () => {
        this.setState({
            class_km: 'hidden',
            kmm: '',
            fromid: '',
            toid: '',
        })
    }
    DeleteDiscountDish = (index) => {
        let thamso = new FormData();
        thamso.append("idkm", index);
        const api = new AdminAPI();
        api.DeleteDiscountDishAPI(thamso)
            .then(response => {
                console.log(response);
                if (response[0].code === '200') {
                    this.componentDidMount();
                    alert("Đã xóa khuyến mãi !!!");
                }
                else {
                    alert("Vui lòng thử lại !!!");
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    render() {
        console.log(this.state.dishAdmin);
        const formatNumber = new Intl.NumberFormat('de');
        return (
            <div className="col-12 ">
                <form>
                    <h4 className="text-center mt-3 colorgreen">CHƯƠNG TRÌNH KHUYẾN MÃI</h4>
                    <div className="row form-group col-12">
                        <select onChange={this.onChange} name="loai" id="loai" className="btn btn-success">
                            <option value="all">All</option>
                            <option value="banhngot">Bánh Ngọt</option>
                            <option value="trasua">Trà Sữa</option>
                        </select>
                    </div>
                    <div className="row form-group col-12">
                        <input type="text" name="km" value={this.state.km} onChange={this.onChange} className="form-control col-5" placeholder="Nhập % khuyến mãi" />
                    </div>
                    <div className="row form-group col-12">
                        <span className="mt-2">Từ:</span>&nbsp;
                        <input type="text" value={this.state.from} name="from" onChange={this.onChange} className="form-control col-2" placeholder="yyyy-mm-dd" />
                        <span className="mt-2 ml-4">Đến: </span>&nbsp;
                        <input type="text" value={this.state.to} name="to" onChange={this.onChange} className="form-control col-2" placeholder="yyyy-mm-dd" />

                    </div>
                    <div className="row form-group col-12">
                        <p className="btn btn-outline-success" onClick={this.Discount}>Nhập</p>
                    </div>
                    <div className="row col-12">
                        <h5 className="col-12 text-center">CHƯƠNG TRÌNH KHUYẾN MÃI ĐANG ÁP DỤNG</h5>
                        <div>
                            <span className="btn btn-outline-danger mb-3" onClick={this.DeleteDiscount.bind(this, 'all')}>Xóa tất cả</span>&nbsp;
                            <span className="btn btn-outline-danger mb-3" onClick={this.DeleteDiscount.bind(this, 'banhngot')}>Xóa bánh</span> &nbsp;
                            <span className="btn btn-outline-danger mb-3" onClick={this.DeleteDiscount.bind(this, 'trasua')}>Xóa trà sữa</span>
                        </div>
                        <div className="row col-12 text-center  font-weight-bold">
                            <div className="col-1 border tieude">Mã</div>
                            <div className="col-2 border tieude" >Tên món</div>
                            <div className="col-2 border tieude">Loại</div>
                            <div className="col-2 border tieude">Chương trình khuyến mãi</div>
                            <div className="col-2 border tieude">Ngày bắt đầu</div>
                            <div className="col-2 border tieude">Ngày kết thúc</div>
                            <div className="col-1 border tieude"></div>
                        </div>

                        {
                            this.state.discount.length > 0 ? (
                                this.state.discount.map((data, index) => {
                                    var timefrom = new Date();
                                    var timeto = new Date(data.den);
                                    var time = timeto.getTime() - timefrom.getTime();
                                    if ("0" < time && time < "259200000") {
                                        if (data.loai === 'banhngot') {
                                            return (
                                                <div className="row col-12 text-center almost-due">
                                                    <div className="col-1 border">{data.idmon}</div>
                                                    <div className="col-2 border">{data.km} % </div>
                                                    <div className="col-2 border">Bánh Ngọt</div>
                                                    <div className="col-2 border">{data.km} % </div>
                                                    <div className="col-2 border">{data.tu}</div>
                                                    <div className="col-2 border">{data.den}</div>
                                                    <div className="col-1 border">
                                                        <p onClick={this.DeleteDiscountDish.bind(this, data.idkm)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-trash mt-1 text-danger" viewBox="0 0 16 16">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                            </svg>
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        else {
                                            return (
                                                <div className="row col-12 text-center almost-due">
                                                    <div className="col-1 border">{data.idmon}</div>
                                                    <div className="col-2 border">{data.tenmon}</div>
                                                    <div className="col-2 border">Trà sữa</div>
                                                    <div className="col-2 border">{data.km} % </div>
                                                    <div className="col-2 border">{data.tu}</div>
                                                    <div className="col-2 border">{data.den}</div>
                                                    <div className="col-1 border">
                                                        <p onClick={this.DeleteDiscountDish.bind(this, data.idkm)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-trash mt-1 text-danger" viewBox="0 0 16 16">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                            </svg>
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }
                                    else if ("0" >= time) {
                                        if (data.loai === 'banhngot') {
                                            return (
                                                <div className="row col-12 text-center due">
                                                    <div className="col-1 border">{data.idmon}</div>
                                                    <div className="col-2 border">{data.tenmon}</div>
                                                    <div className="col-2 border">Bánh Ngọt</div>
                                                    <div className="col-2 border">{data.km} % </div>
                                                    <div className="col-2 border">{data.tu}</div>
                                                    <div className="col-2 border">{data.den}</div>
                                                    <div className="col-1 border">
                                                        <p onClick={this.DeleteDiscountDish.bind(this, data.idkm)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-trash mt-1 text-danger" viewBox="0 0 16 16">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                            </svg>
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        else {
                                            return (
                                                <div className="row col-12 text-center due">
                                                    <div className="col-1 border">{data.idmon}</div>
                                                    <div className="col-2 border">{data.tenmon}</div>
                                                    <div className="col-2 border">Trà sữa</div>
                                                    <div className="col-2 border">{data.km} % </div>
                                                    <div className="col-2 border">{data.tu}</div>
                                                    <div className="col-2 border">{data.den}</div>
                                                    <div className="col-1 border">
                                                        <p onClick={this.DeleteDiscountDish.bind(this, data.idkm)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-trash mt-1 text-danger" viewBox="0 0 16 16">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                            </svg>
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }
                                    else{
                                        if (data.loai === 'banhngot') {
                                            return (
                                                <div className="row col-12 text-center">
                                                    <div className="col-1 border">{data.idmon}</div>
                                                    <div className="col-2 border">{data.tenmon}</div>
                                                    <div className="col-2 border">Bánh Ngọt</div>
                                                    <div className="col-2 border">{data.km} % </div>
                                                    <div className="col-2 border">{data.tu}</div>
                                                    <div className="col-2 border">{data.den}</div>
                                                    <div className="col-1 border">
                                                        <p onClick={this.DeleteDiscountDish.bind(this, data.idkm)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-trash mt-1 text-danger" viewBox="0 0 16 16">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                            </svg>
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        else {
                                            return (
                                                <div className="row col-12 text-center">
                                                    <div className="col-1 border">{data.idmon}</div>
                                                    <div className="col-2 border">{data.tenmon}</div>
                                                    <div className="col-2 border">Trà sữa</div>
                                                    <div className="col-2 border">{data.km} % </div>
                                                    <div className="col-2 border">{data.tu}</div>
                                                    <div className="col-2 border">{data.den}</div>
                                                    <div className="col-1 border">
                                                        <p onClick={this.DeleteDiscountDish.bind(this, data.idkm)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-trash mt-1 text-danger" viewBox="0 0 16 16">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                            </svg>
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }
                                }

                                )
                            ) : (
                                <div className="text-center mt-5">
                                    <h6><i>Chưa có chương trình khuyến mãi</i></h6>
                                </div>
                            )
                        }
                    </div>
                    <div className={this.state.class_km}>
                        <div className="row col-12"><h6>Nhập chương trình khuyến mãi</h6></div>
                        <p className="col-12">ID: {this.state.detail.idmon}</p>
                        <p className="col-12">Tên món: {this.state.detail.tenmon}</p>
                        <input type="text" value={this.state.kmm} name="kmm" onChange={this.onChange} className="form-control ml-3 inpkm" placeholder="Nhập % khuyến mãi" />
                        <div className="row form-group col-12 mt-3 ml-1">
                            <span className="mt-2">Từ:</span>&nbsp;
                            <input type="text" value={this.state.fromid} name="fromid" onChange={this.onChange} className="form-control col-3" placeholder="yyyy-mm-dd" />
                            <span className="mt-2 ml-4">Đến: </span>&nbsp;
                            <input type="text" value={this.state.toid} name="toid" onChange={this.onChange} className="form-control col-3" placeholder="yyyy-mm-dd" />

                        </div>
                        <div className="row col-12 mt-3">
                            <span onClick={this.DiscountDish.bind(this, this.state.detail.idmon, this.state.detail.loai)} className="btn btn-outline-info">Nhập</span>
                            <span onClick={this.onHidden} className="ml-3 btn btn-outline-info">Đóng</span>

                        </div>
                    </div>
                    <div className="row col-12 mt-3 mb-3">
                        <h5 className="col-12 text-center mt-2 ml-1">DANH SÁCH MÓN</h5>
                        {
                            this.state.dishAdmin.map((data, index) =>
                                <div key={index}>
                                    <form id={index} >
                                        <div className="row">
                                            <div className="col-2 detailDish">
                                                {data.tenmon}
                                            </div>
                                            <div className="col-2 detailDish ">
                                                {formatNumber.format(data.gia)}₫
                                            </div>
                                            <div className="col-2 detailDish ">
                                                {data.mota}
                                            </div>
                                            <div className="col-3 detailDish ">
                                                {data.nguyenlieu}
                                            </div>
                                            <div className="col-1 detailDish ">
                                                <img src={'http://localhost:80/' + data.hinhanh} alt="hinhmon" className="hinhanhAdmin" />
                                            </div>
                                            <div className="col-2 detailDish">
                                                <p onClick={this.Detail.bind(this, index)} className="btn btn-success mt-3 ml-3">Chọn</p>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )
                        }
                    </div>
                </form>
            </div>
        );
    }
}

export default Discount;