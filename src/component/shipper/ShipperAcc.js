import React, { Component } from 'react';
import LoginAPI from '../../API/LoginAPI';
import ShipperAPI from '../../API/ShipperAPI';
import edit from '../../img/edit.png';


class ShipperAcc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoten: '',
            email: '',
            sdt: '',
            dc: '',
            imagePreviewUrl: "",
            file: "",
            avatar: ''
        }
        this.onEditAccount = this.onEditAccount.bind(this);
    }

    componentDidMount() {
        let thamso = new FormData();
        thamso.append("idshipper", localStorage.getItem('idshipper'));
        const api = new LoginAPI();
        api.ShowAccountAPI(thamso)
            .then(response => {
                this.setState({
                    hoten: response.data[0].hoten,
                    email: response.data[0].email,
                    sdt: response.data[0].sdt,
                    dc: response.data[0].dc,
                    avatar: response.data[0].avatar
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    onEditAccount = (e) => {
        e.preventDefault();
        let data = document.getElementById('form-account');
        let thamso = new FormData(data);
        thamso.append("idshipper", localStorage.getItem('idshipper'));
        const api = new ShipperAPI();
        api.EditAccountAPI(thamso)
            .then(response => {
                console.log(response);
                if (response.data[0].code === "200") {
                    if(document.getElementById('icon-add-img').value !== ""){
                    localStorage.setItem('username', this.state.hoten);
                    localStorage.setItem('avatar', "img/" + this.state.avatar);
                    }
                    else if(document.getElementById('icon-add-img').value === ""){
                        localStorage.setItem('username', this.state.hoten);
                    }
                    this.componentDidMount();
                    alert("Đã cập nhật !");
                    window.frames[0].frameElement.contentWindow.reloadpage();
                }
                else {
                    alert("Cập nhật thất bại !")
                }

            })
            .catch(error => {
                console.log(error)
            })
    }
    _handleImageChange(h) {
        h.preventDefault();

        let reader = new FileReader();
        let file = h.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
                avatar: file.name,
            });
        }
        if (h.target.files[0]) {
            reader.readAsDataURL(file);
        }
    }
    onChange=(e)=>{
        this.setState({
            hoten: e.target.value,
        })
    }
    hiddenAcc = ()=>{
        this.props.hiddenShipper();
    }
    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} alt="imgPreview" />);
        } else {
            $imagePreview = (<div className="previewText"><img className="hinhanhAcc" alt="img" src={"http://localhost:80/" + localStorage.getItem('avatar')} /></div>);
        }
        return (
            <div className="mt-3">
                   <form id="form-account">
                        <h4 className="col-12 text-center">Hồ Sơ Của Tôi</h4>
                        <div className="row editAccount">
                            <div className="col-7">
                                    <div className="row form-group">
                                        <label className="col-3 mt-4 text-right control-label">Email</label>
                                        <div className="col-9  mt-4">
                                            <input type="text" defaultValue={this.state.email} name="email" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <label className="col-3 text-right control-label">Họ & tên</label>
                                        <div className="col-9">
                                            <input type="text" onChange={this.onChange} defaultValue={this.state.hoten} name="hoten" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <label className="col-3 text-right control-label">Số điện thoại</label>
                                        <div className="col-9">
                                            <input type="text" defaultValue={this.state.sdt} name="sdt" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <label className="col-3 text-right control-label">Địa chỉ</label>
                                        <div className="col-9">
                                            <input type="text" defaultValue={this.state.dc} name="dc" className="form-control" />
                                        </div>
                                    </div>                           
                                </div>
                            <div className="col-5">
                            <div className="row tenhinh">
                                        <div className=" col-12 imgPreAcc">
                                            {$imagePreview}
                                        </div>
                                    <div className="col-12">
                                        <input
                                            id="icon-add-img"
                                            type="file"
                                            onChange={(h) => this._handleImageChange(h)}
                                            name="avatar"
                                            className="hinhanhEdit" />
                                        <label htmlFor="icon-add-img" className="mt-2 ml-5">
                                            <img src={edit} className="editImg" alt="add"/>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 text-right">
                                <button onClick={this.onEditAccount} className="btn btn-info mb-3 mr-5 mt-3">Cập nhật</button>
                            </div>
                        </div>
                        </form>
            </div>
        );
    }
}

export default ShipperAcc;