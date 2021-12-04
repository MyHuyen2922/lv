import React, { Component } from 'react';
import '../../API/AddDishAPI'
import AddDishAPI from '../../API/AddDishAPI';
import Calendar from 'react-calendar';
import add from '../../img/add.png';

class AddDish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imagePreviewUrl: "",
            file: "",
            class_data: 'visible_ngaysx',
            loai: '',
            date: new Date(),
            dateto: new Date(),
            class_date: 'hidden',
            class_dateto: 'hidden',
            class_home: 'visible',
        };
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
    onSubmit = (h) => {
        h.preventDefault();
        var ok = false;
        var tenmon = document.getElementById("tenmon");
        var tpdd = document.getElementsByClassName("tpdd");
        var gia = document.getElementById("gia");
        var hinhanh = document.getElementById("hinhanh")
        for (var i = 0; i < tpdd.length; i++){
            if(tpdd[i].checked === true){
                ok = true;
            }
        }
        if(ok === false){
            alert("Bạn chưa nhập thành phần dinh dưỡng !!!");
        }
        else if(tenmon.value === ""){
            alert("Bạn chưa nhập tên món!!!");
        }
        else if(gia.value === ""){
            alert("Bạn chưa nhập giá!!!")
        }
        else if(hinhanh.value ===""){
            alert("Bạn chưa chọn hình ảnh!!!")
        }
        else{
            let data = document.getElementById('create-form');
            let thamso = new FormData(data);
            var date = this.state.date.getFullYear()+'-'+(this.state.date.getMonth()+1)+'-'+this.state.date.getDay();
            var dateto = this.state.dateto.getFullYear()+'-'+(this.state.dateto.getMonth()+1)+'-'+this.state.dateto.getDate();
            thamso.append("ngaysx", date);
            thamso.append("hansd", dateto);
            const api = new AddDishAPI();
            api.AddDish(thamso)
                .then(response => {
                    console.log(response);
                    if (response[0].code === "200") {
                        alert("Đã thêm !!!");
                        this.props.loadData();
                    }
                    else {
                        alert("Vui lòng thử lại !!!");
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            window.scrollTo(0, 0);
        }
    }
    onCloseForm = (h) => {
        h.preventDefault();
        this.props.onCloseForm();
    }
    Change = (h) => {
        h.preventDefault();
        const { name, value } = h.target;
        this.setState({
            [name]: value
        })
    }
    onChange = () => {
        let value = this.state.loai;
        if (value === "trasua"){
            this.setState({
                class_data: 'hidden_ngaysx'
            })
        }
        else {
            this.setState({
                class_data: 'visible_ngaysx'
            })
        }

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
    onDateFrom = () => {
        this.setState({
            class_date: 'row col-12 mt-4 visible-search dcmoi',
            class_home: 'home-hidden',
        })
        window.scrollTo(0, 0);
    }
    onDateTo = () => {
        this.setState({
            class_dateto: 'row col-12 mt-4 visible-search dcmoi',
            class_home: 'home-hidden',
        })
        window.scrollTo(0, 0);
    }
    hiddenDate = () => {
        this.setState({
            class_date: 'row col-12 hidden-search',
            class_home: 'visible',
        })
        window.scrollTo(0, 0);
    }
    hiddenDateTo = () => {
        this.setState({
            class_dateto: 'row col-12 hidden-search',
            class_home: 'visible',
        })
        window.scrollTo(0, 0);
    }
    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} alt="imgPre" />);
        } else {
            $imagePreview = (<div className="previewText">Vui lòng chọn hình ảnh</div>);
        }
        return (
            <div>
                <form id="create-form" onSubmit={this.onSubmit} >
                    <div>
                        <h5 className="panel-title text-right mt-1"
                            onClick={this.onCloseForm}>
                           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-lg exitCake" viewBox="0 0 16 16">
                                <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                            </svg>
                        </h5>
                        <h4 className="text-center">Thêm Món</h4>
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
                    <div className={this.state.class_home}>
                        <div className="col-10 col-offset-1">
                        <div className="row form-group">
                            <label className="col-4 control-label text-center">Tên Món</label>
                            <div className="col-8">
                                <input type="text" name="tenmon" className="form-control " id="tenmon"/>
                            </div>
                        </div>
                        <div className="row form-group">
                            <label className="col-4 control-label text-center">Giá</label>
                            <div className="col-8">
                                <input type="text" name="gia" className="form-control" id="gia"/>
                            </div>
                        </div>
                        <div className="row form-group">
                            <label className="col-4 control-label text-center">Mô Tả</label>
                            <div className="col-8">
                                <input type="text" name="mota" className="form-control" />
                            </div>
                        </div>
                        <div className="row form-group">
                            <label className="col-4 control-label text-center">Nguyên Liệu</label>
                            <div className="col-8">
                                <input type="text" name="nguyenlieu" className="form-control" />
                            </div>
                        </div>
                        <div className="row form-group ml-2">
                            <label className="col-4 control-label text-center">Thành Phần Dinh Dưỡng</label>
                            <div className="row col-8">
                                <div class="custom-control custom-checkbox col-3 ">
                                    <input type="checkbox" name='tpdd[]' value="Vitamin C" class="custom-control-input tpdd" id="customCheckDisabled1" />
                                    <label class="custom-control-label" for="customCheckDisabled1">Vitamin C</label>
                                </div>
                                <div class="custom-control custom-checkbox col-3 ">
                                    <input type="checkbox" name='tpdd[]' value="Vitamin C" class="custom-control-input tpdd" id="customCheckDisabled2" />
                                    <label class="custom-control-label" for="customCheckDisabled2">Vitamin B</label>
                                </div>
                                <div class="custom-control custom-checkbox col-3 ">
                                    <input type="checkbox" name='tpdd[]' value="Vitamin A" class="custom-control-input tpdd" id="customCheckDisabled3" />
                                    <label class="custom-control-label" for="customCheckDisabled3">Vitamin A</label>
                                </div>
                                <div class="custom-control custom-checkbox col-3 ">
                                    <input type="checkbox" name='tpdd[]' value="Vitamin D" class="custom-control-input tpdd" id="customCheckDisabled4" />
                                    <label class="custom-control-label" for="customCheckDisabled4">Vitamin D</label>
                                </div>
                                <div class="custom-control custom-checkbox col-3 ">
                                    <input type="checkbox" name='tpdd[]' value="Vitamin E" class="custom-control-input tpdd" id="customCheckDisabled5" />
                                    <label class="custom-control-label" for="customCheckDisabled5">Vitamin E</label>
                                </div>
                                <div class="custom-control custom-checkbox col-3 ">
                                    <input type="checkbox" name='tpdd[]' value="Vitamin K" class="custom-control-input tpdd" id="customCheckDisabled6" />
                                    <label class="custom-control-label" for="customCheckDisabled6">Vitamin K</label>
                                </div>
                                <div class="custom-control custom-checkbox col-3 ">
                                    <input type="checkbox" name='tpdd[]' value="Protein" class="custom-control-input tpdd" id="customCheckDisabled7" />
                                    <label class="custom-control-label" for="customCheckDisabled7">Protein</label>
                                </div>
                                <div class="custom-control custom-checkbox col-3 ">
                                    <input type="checkbox" name='tpdd[]' value="Lipit" class="custom-control-input tpdd" id="customCheckDisabled8" />
                                    <label class="custom-control-label" for="customCheckDisabled8">Lipit</label>
                                </div>
                                <div class="custom-control custom-checkbox col-3 ">
                                    <input type="checkbox" name='tpdd[]' value="Glucid" class="custom-control-input tpdd" id="customCheckDisabled9" />
                                    <label class="custom-control-label" for="customCheckDisabled9">Glucid</label>
                                </div>
                                <div class="custom-control custom-checkbox col-3 ">
                                    <input type="checkbox" name='tpdd[]' value="Sắt" class="custom-control-input tpdd" id="customCheckDisabled10" />
                                    <label class="custom-control-label" for="customCheckDisabled10">Sắt</label>
                                </div>
                                <div class="custom-control custom-checkbox col-3 ">
                                    <input type="checkbox" name='tpdd[]' value="Kẽm" class="custom-control-input tpdd" id="customCheckDisabled11" />
                                    <label class="custom-control-label" for="customCheckDisabled11">Kẽm</label>
                                </div>
                                <div class="custom-control custom-checkbox col-3 ">
                                    <input type="checkbox" name='tpdd[]' value="Natri" class="custom-control-input tpdd" id="customCheckDisabled12" />
                                    <label class="custom-control-label" for="customCheckDisabled12">Natri</label>
                                </div>
                            
                            </div>
                        </div>
                        <div className="row form-group">
                            <label className="col-4 control-label text-center">Loại</label>
                            <div className="col-8">
                                <select onClick={this.onChange} onChange={this.Change} name="loai" id="loai" className="btn btn-outline-secondary">
                                    <option value="banhngot">Bánh Ngọt</option>
                                    <option value="trasua">Trà Sữa</option>
                                </select>
                            </div>
                        </div>
                        <div className={this.state.class_data}>
                        <div className="row form-group">
                                <label className="col-4 control-label text-center">Số lượng</label>
                                <div className="col-8 ">
                                    <input type="number" name="soluong" id="soluong" min="1" className="form-control" />
                                </div>
                            </div>
                            <div className="row form-group">
                                <label className="col-4 control-label text-center">Ngày sản xuất</label>
                                <div className="col-8 ">
                                <span className="col-8 text-right colorlight">
                                    {this.state.date.getDate()}/ {this.state.date.getMonth() + 1}/ {this.state.date.getFullYear()}
                                </span>
                                <span onClick={this.onDateFrom} className="col-1 text-right text-primary">Thay đổi</span>
                                </div>
                            </div>
                            <div className="row form-group">
                                <label className="col-4 control-label text-center">Hạn sử dụng</label>
                                <div className="col-8 ">
                                <span className="col-8 text-right colorlight">
                                    {this.state.dateto.getDate()}/ {this.state.dateto.getMonth() + 1}/ {this.state.dateto.getFullYear()}
                                </span>
                                <span onClick={this.onDateTo} className="col-1 text-right text-primary">Thay đổi</span>
                                </div>
                            </div>
                        </div>
                        <div className="row form-group">
                            <label className="col-4 control-label text-center">Hình ảnh</label>
                            <div className="col-8 tenhinh">
                                <input
                                    id="icon-add-img"
                                    type="file"
                                    onChange={(h) => this._handleImageChange(h)}
                                    name="hinhanh" 
                                    id="hinhanh"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="imgPre mb-2">
                                {$imagePreview}
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-12 text-right">
                                <button type="submit" name="add" className="btn btn-info ml-4">Thêm</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default AddDish;