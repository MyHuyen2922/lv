import React, { Component } from 'react';
import '../css/Createuser.css';
import '../API/CreateAPI'
import CreateAPI from '../API/CreateAPI';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import logo from '../img/logo.jpg';

class Createuser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            direct: "",
            imagePreviewUrl: "",
            file: "",
            hoten: '',
            email: '',
            sdt: '',
            mk: '',
            dc: '',
            dcct: '',
            phuong: '',
            quan: '',
        };
    }

    _handleImageChange(h) {
        h.preventDefault();
        let reader = new FileReader();
        let file = h.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
            });
        }
        if (h.target.files[0]) {
            reader.readAsDataURL(file);
        }
    }
    onChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (name === 'dcct') {
            this.setState({
                [name]: value,
                dc: value + ", " + this.state.phuong + ", " + this.state.quan + ", Cần Thơ",
            })
        }
        else if (name === 'phuong') {
            this.setState({
                [name]: value,
                dc: this.state.dcct + ", " + value + ", " + this.state.quan + ", Cần Thơ",
            })
        }
        else if (name === 'quan') {
            this.setState({
                [name]: value,
                dc: this.state.dcct + ", " + this.state.phuong + ", " + value + ", Cần Thơ",
            })
        }
    }
    Change = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        })
    }
    onSubmit = (h) => {
        if (this.state.sdt.length !== 10 || this.state.sdt.indexOf(0) === -1) {
            alert("Sai định dạng số điện thoại !!!");
        }
        else if(this.state.email ==='' || this.state.dc ==='' || this.state.sdt ==='' ||this.state.hoten ==='' ||this.state.mk ===''){
            alert("Vui lòng điền đầy đủ thông tin !!!");
        }
        else {
            h.preventDefault();
            let thamso = new FormData();
            thamso.append("hoten", this.state.hoten);
            thamso.append("email", this.state.email);
            thamso.append("mk", this.state.mk);
            thamso.append("dc", this.state.dc);
            thamso.append("sdt", this.state.sdt);
            if(this.state.file !== ''){
                thamso.append("avatar", this.state.file);
            }
            const api = new CreateAPI();
            api.Createuser(thamso)
                .then(response => {
                    console.log(response);
                    if (response[0].code === "200") {
                        alert("Đăng kí thành công !!!")
                        this.setState({ direct: "/Login" })
                    }
                    else if (response[0].code === "400") {
                        alert("Tài khoản đã sử dụng !!!")
                    }
                    else {
                        alert("Lỗi Server !!!")
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} alt="imgPreview" />);
        } else {
            $imagePreview = (<div className="previewText">Vui lòng chọn hình ảnh</div>);
        }
        if (this.state.direct !== "") {
            return (<Redirect to={this.state.direct} />)
        }
        return (
            <div>
                <div className="brCre"></div>
                <div className="row">
                    <div className="Createuser col-7 offset-2 bggreen ml-270">
                        <h2 align='center'>ĐĂNG KÍ THÀNH VIÊN</h2>
                        <form id="create-form">
                            <div className="row form-group">
                                <label className="col-2 control-label">HỌ VÀ TÊN</label>
                                <div className="col-10">
                                    <input onChange={this.Change} type="text" name="hoten" className="form-control" />
                                </div>
                            </div>
                            <div className="row form-group">
                                <label className="col-2 control-label">EMAIL</label>
                                <div className="col-10">
                                    <input onChange={this.Change} type="text" name="email" className="form-control" />
                                </div>
                            </div>
                            <div className="row form-group">
                                <label className="col-2 control-label">MẬT KHẨU</label>
                                <div className="col-10">
                                    <input onChange={this.Change} type="password" name="mk" className="form-control" />
                                </div>
                            </div>
                            <div className="row form-group">
                                <label className="col-2 control-label">ĐIỆN THOẠI</label>
                                <div className="col-10">
                                    <input onChange={this.Change} type="number" min="1" name="sdt" className="form-control" />
                                </div>
                            </div>
                            <div className="row form-group">
                                <label className="col-2 control-label">ĐỊA CHỈ</label>
                                <div className="col-10 row dcres">
                                    <input onChange={this.onChange} className="col-4 form-control" type="text" name='dcct' placeholder="Địa chỉ cụ thể" />
                                    <div className="col-3 ml-1">
                                        <input onChange={this.onChange} className=" col-12 form-control" type="text" name='phuong' placeholder="Phường" />
                                    </div>
                                    <div className="col-3">
                                        <select onChange={this.onChange} name="quan" class="custom-select mlquanhome" >
                                            <option value="" selected>Quận</option>
                                            <option value="Bình Thủy">Bình Thủy</option>
                                            <option value="Ninh Kiều">Ninh Kiều</option>
                                            <option value="Cái Răng">Cái Răng</option>
                                            <option value="Ô Môn">Ô Môn</option>
                                            <option value="Thốt Nốt">Ô Môn</option>
                                        </select>
                                    </div>
                                    <div className="col-2 form-control mltinhhome">
                                        <div className="text-center">
                                            <span >Cần Thơ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row form-group">
                                <label className="col-2 control-label">Avatar</label>
                                <div className="col-10">
                                    <input className="fileInput"
                                        type="file"
                                        onChange={(h) => this._handleImageChange(h)}
                                        name="avatar" />
                                </div>
                            </div>
                            <div className="row col-10 offset-1">
                                <div className="row imgPreview text-center">
                                    {$imagePreview}
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-6">
                                    <button onClick={this.onSubmit} type="submit" name="dk" className="btn btn-success sub">ĐĂNG KÍ</button>
                                </div>
                                <div className="col-6">
                                    <Link to="/login">
                                        <button className="btn btn-success sub">ĐĂNG NHẬP</button>
                                    </Link>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Createuser;