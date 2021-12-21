import React, { Component } from 'react';
import UserAPI from '../../API/UserAPI';
import AdminAPI from '../../API/admin/AdminAPI';
import Chipi from '../../img/chipi.png';
import { Bar, Pie } from 'react-chartjs-2';

class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            giaodich: [],
            mon: [],
            thongkedoanhthu: {},
            labels: {},
            list: ['Ngày', 'Tháng', 'Năm', 'Món', 'Hình thức nhận'],
            type: 'Ngày',
            day: 1,
            month: 1,
            year: 2021,
            tongdoanhthu: 0,

        }
    }

    componentDidMount() {
        var giaodich = [];
        var mon = [];
        var thamso = new FormData();
        const api = new AdminAPI();
        api.GetDishOrdersAPI(thamso)
            .then(response => {
                this.StatisticsRevenue(response['giaodich'], response['tenmon'], "Ngày");
                giaodich = response['giaodich'];
                mon = response['tenmon'];
                console.log(response['tenmon']);
                this.setState({
                    giaodich: response['giaodich'],
                    mon: response['tenmon'],
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    StatisticsRevenue = (raw_data, name, type) => {
        var background = [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
        ]
        var border = [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
        ]
        console.log(raw_data);
        if (type === "Ngày") {
            let labels = [];
            let data = [];
            let tongdoanhthu = 0;
            let now = new Date();
            let current_month = now.getMonth() + 1;
            let current_year = now.getFullYear();
            let numday = new Date(current_year, current_month, 0).getDate();
            for (let i = 1; i <= numday; i++) {
                labels.push(i + "/" + current_month + "/" + current_year);
                data.push(0);
            }
            for (let i = 0; i < raw_data.length; i++) {
                let trans = raw_data[i];
                let trans_day = trans.ngayban.split("/");
                if (Number(trans_day[1]) === Number(current_month) && Number(trans_day[2]) === Number(current_year)) {
                    data[trans_day[0] - 1] += Number(trans.tongtien);
                    tongdoanhthu += Number(trans.tongtien);
                }
            }
            let thongke = {};
            let dataset = [];
            let dict = {};
            dict['label'] = "Doanh thu theo ngày/ tháng";
            dict['data'] = data;
            dict['backgroundColor'] = background;
            dict['borderColor'] = border;
            dict['borderWidth'] = 1;
            dataset.push(dict);
            thongke['labels'] = labels;
            thongke['datasets'] = dataset;
            this.setState({
                thongkedoanhthu: thongke,
                type: 'Ngày',
                tongdoanhthu: tongdoanhthu,
            })
        }
        else if (type === 'Tháng') {
            let tongdoanhthu = 0;
            let labels = [];
            let data = [];
            let now = new Date();
            let year = now.getFullYear();
            for (let i = 1; i <= 12; i++) {
                labels.push(i + "/" + year);
                data.push(0);
            }
            for (let i = 0; i < raw_data.length; i++) {
                let trans = raw_data[i];
                let trans_day = trans.ngayban.split("/");
                if (Number(trans_day[2]) === Number(year)) {
                    data[trans_day[1] - 1] += Number(trans.tongtien);
                    tongdoanhthu += Number(trans.tongtien);
                }
            }
            let thongke = {};
            let dataset = [];
            let dict = {};
            dict['label'] = "Doanh thu theo tháng/ năm";
            dict['data'] = data;
            dict['backgroundColor'] = background;
            dict['borderColor'] = border;
            dict['borderWidth'] = 1;
            dataset.push(dict);
            thongke['labels'] = labels;
            thongke['datasets'] = dataset;
            this.setState({
                thongkedoanhthu: thongke,
                type: 'Tháng',
                tongdoanhthu: tongdoanhthu,
            })
        }
        else if (type === 'Năm') {
            let tongdoanhthu = 0;
            let labels = [];
            let data = [];
            let now = new Date();
            let year = now.getFullYear();
            for (let i = 2020; i <= year; i++) {
                labels.push(i);
                data.push(0);
            }
            for (let i = 0; i < raw_data.length; i++) {
                let trans = raw_data[i];
                let trans_day = trans.ngayban.split("/");
                console.log(trans_day);
                data[labels.indexOf(Number(trans_day[2]))] += Number(trans.tongtien);
                tongdoanhthu += Number(trans.tongtien);
            }
            let thongke = {};
            let dataset = [];
            let dict = {};
            dict['label'] = "Doanh thu theo năm";
            dict['data'] = data;
            dict['backgroundColor'] = background;
            dict['borderColor'] = border;
            dict['borderWidth'] = 1;
            dataset.push(dict);
            thongke['labels'] = labels;
            thongke['datasets'] = dataset;
            this.setState({
                thongkedoanhthu: thongke,
                type: 'Năm',
                tongdoanhthu: tongdoanhthu,
            })
            console.log(labels);
            console.log(data);
        }
        else if (type === 'Hình thức nhận') {
            let tongdoanhthu = 0;
            let labels = ["Nhận tại cửa hàng", "Giao hàng"];
            let data = [0, 0];
            for (let i = 0; i < raw_data.length; i++) {
                let trans = raw_data[i];
                data[labels.indexOf(trans.hinhthuc)] += Number(trans.tongtien);
                tongdoanhthu += Number(trans.tongtien);
            }
            let thongke = {};
            let dataset = [];
            let dict = {};
            dict['label'] = "Doanh thu hình thức nhận món";
            dict['data'] = data;
            dict['backgroundColor'] = background;
            dict['borderColor'] = border;
            dict['borderWidth'] = 1;
            dataset.push(dict);
            thongke['labels'] = labels;
            thongke['datasets'] = dataset;
            this.setState({
                thongkedoanhthu: thongke,
                type: 'Hình thức nhận',
                tongdoanhthu: tongdoanhthu,
            })
            console.log(labels);
            console.log(data);
        }
        else if (type === 'Món') {
            let tongdoanhthu = 0;
            let label = [];
            let data = [];
            for (let i = 0; i < raw_data.length; i++) {
                let trans = raw_data[i];
                let sl = trans.sl.split("|");
                sl.splice(0, 1);
                let giadh = trans.giadh.split("|");
                giadh.splice(0, 1);
                let idmon = trans.idmon.split("|");
                idmon.splice(0, 1);
                for (let x = 0; x < idmon.length; x++) {
                    if (label.indexOf(idmon[x]) !== -1) {
                        data[label.indexOf(idmon[x])] += Number(giadh[x]) * Number(sl[x]);
                    }
                    else {
                        label.push(idmon[x]);
                        data.push(Number(giadh[x]) * Number(sl[x]));
                    }
                }
                tongdoanhthu += Number(trans.tongtien);
            }
            let tenmon = name;
            let labels = [];
            for (let y = 0; y < label.length; y++) {
                labels.push(tenmon[label[y]]);
            }
            let thongke = {};
            let dataset = [];
            let dict = [];
            dict['label'] = "Doanh thu từng món";
            dict['data'] = data;
            dict['backgroundColor'] = background;
            dict['borderColor'] = border;
            dict['borderWidth'] = 1;
            dataset.push(dict);
            thongke['labels'] = labels;
            thongke['datasets'] = dataset;
            this.setState({
                thongkedoanhthu: thongke,
                type: 'Món',
                tongdoanhthu: tongdoanhthu,
            })
        }
    }
    onChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }
    Search = (raw_data,name) => {
        var background = [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
        ]
        var border = [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
        ]
        if (this.state.day !== '' && this.state.month === '') {
            alert("Chọn tháng !!!");
        }
        else if (this.state.month !== '' && this.state.year === '') {
            alert("Chọn năm !!!");
        }
        else if (this.state.day === '' && this.state.month === '' && this.state.year !== '') {
            let tongdoanhthu = 0;
            let labels = [];
            let data = [];
            let year = this.state.year;
            for (let i = 1; i <= 12; i++) {
                labels.push(i + "/" + year);
                data.push(0);
            }
            for (let i = 0; i < raw_data.length; i++) {
                let trans = raw_data[i];
                let trans_day = trans.ngayban.split("/");
                if (Number(trans_day[2]) === Number(year)) {
                    data[trans_day[1] - 1] += Number(trans.tongtien);
                    tongdoanhthu += Number(trans.tongtien);
                }
            }
            let thongke = {};
            let dataset = [];
            let dict = {};
            dict['label'] = "Doanh thu theo tháng";
            dict['data'] = data;
            dict['backgroundColor'] = background;
            dict['borderColor'] = border;
            dict['borderWidth'] = 1;
            dataset.push(dict);
            thongke['labels'] = labels;
            thongke['datasets'] = dataset;
            this.setState({
                thongkedoanhthu: thongke,
                tongdoanhthu: tongdoanhthu,
            })
        }
        else if (this.state.day === '' && this.state.month !== '' && this.state.year !== '') {
            let tongdoanhthu = 0;
            let labels = [];
            let data = [];
            let current_month = this.state.month;
            let current_year = this.state.year;
            let numday = new Date(current_year, current_month, 0).getDate();
            for (let i = 1; i <= numday; i++) {
                labels.push(i + "/" + current_month + "/" + current_year);
                data.push(0);
            }
            for (let i = 0; i < raw_data.length; i++) {
                let trans = raw_data[i];
                let trans_day = trans.ngayban.split("/");
                if (Number(trans_day[1]) === Number(current_month) && Number(trans_day[2]) === Number(current_year)) {
                    data[trans_day[0] - 1] += Number(trans.tongtien);
                    tongdoanhthu += Number(trans.tongtien);
                }
            }
            let thongke = {};
            let dataset = [];
            let dict = {};
            dict['label'] = "Doanh thu theo ngày";
            dict['data'] = data;
            dict['backgroundColor'] = background;
            dict['borderColor'] = border;
            dict['borderWidth'] = 1;
            dataset.push(dict);
            thongke['labels'] = labels;
            thongke['datasets'] = dataset;
            this.setState({
                thongkedoanhthu: thongke,
                tongdoanhthu: tongdoanhthu,
            })
        }
        else {
            let tongdoanhthu = 0;
            let label = [];
            let data = [];
            let current_day = this.state.day;
            let current_month = this.state.month;
            let current_year = this.state.year;
            for (let i = 0; i < raw_data.length; i++) {
                let trans = raw_data[i];
                let sl = trans.sl.split("|");
                sl.splice(0, 1);
                let giadh = trans.giadh.split("|");
                giadh.splice(0, 1);
                let idmon = trans.idmon.split("|");
                idmon.splice(0, 1);
                let trans_day = trans.ngayban.split("/");
                if (Number(trans_day[0]) === Number(current_day) && Number(trans_day[1]) === Number(current_month) && Number(trans_day[2]) === Number(current_year)) {
                    for (let x = 0; x < idmon.length; x++) {
                        if (label.indexOf(idmon[x]) !== -1) {
                            data[label.indexOf(idmon[x])] += Number(giadh[x]) * Number(sl[x]);
                        }
                        else {
                            label.push(idmon[x]);
                            data.push(Number(giadh[x]) * Number(sl[x]));
                        }
                    }
                    tongdoanhthu += Number(trans.tongtien);
                }
               
            }
            let tenmon = name;
            let labels = [];
            for (let y = 0; y < label.length; y++) {
                labels.push(tenmon[label[y]]);
            }
            let thongke = {};
            let dataset = [];
            let dict = [];
            dict['label'] = "Doanh thu từng món";
            dict['data'] = data;
            dict['backgroundColor'] = background;
            dict['borderColor'] = border;
            dict['borderWidth'] = 1;
            dataset.push(dict);
            thongke['labels'] = labels;
            thongke['datasets'] = dataset;
            this.setState({
                thongkedoanhthu: thongke,
                tongdoanhthu: tongdoanhthu,
            })
        }
    }
    onChangeDay = (e) =>{
        this.setState({
            day: e.target.value
        })
    }
    onChangeMonth = (e) =>{
        this.setState({
            month: e.target.value
        })
    }
    onChangeYear = (e) =>{
        this.setState({
            year: e.target.value
        })
    }
    Test = () =>{
        alert(this.state.year);
    }
    render() {
        if(Object.keys(this.state.thongkedoanhthu).length === 0)
            return null;
        const formatNumber = new Intl.NumberFormat('de');
        return (
            <div className="iframeadmin">
                <h4 className="col-12 text-center mt-3 colorgreen">THỐNG KÊ DOANH THU</h4>
                <div className="mt-3 mb-3 col-11 ml-5 text-right">
                <select class="form-select inpSales mr-2 border border-success" onChange={this.onChangeDay} aria-label="Default select example">
                    <option value="1">01</option>
                    <option value="2">02</option>
                    <option value="3">03</option>
                    <option value="4">04</option>
                    <option value="5">05</option>
                    <option value="6">06</option>
                    <option value="7">07</option>
                    <option value="8">08</option>
                    <option value="9">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                </select>
                <select class="form-select inpSales mr-2 border border-success" onChange={this.onChangeMonth} aria-label="Default select example">
                    <option value="1">01</option>
                    <option value="2">02</option>
                    <option value="3">03</option>
                    <option value="4">04</option>
                    <option value="5">05</option>
                    <option value="6">06</option>
                    <option value="7">07</option>
                    <option value="8">08</option>
                    <option value="9">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
                <select class="form-select inpSales mr-2 border border-success" onChange={this.onChangeYear} aria-label="Default select example">
                    <option value="2020">2020</option>
                    <option value="2021" selected>2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                    <option value="2031">2031</option>
                </select>
                    <span onClick={this.Search.bind(this, this.state.giaodich, this.state.mon)} className="inpSales border p-2 pl-3 pr-3 bg-success text-light">Tìm</span>
                </div>
                <div className="dropdown mt-3 mb-3 col-11 ml-5 text-right">
                    <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.type}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {
                            this.state.list.map((data, index) =>
                                <a onClick={this.StatisticsRevenue.bind(this, this.state.giaodich, this.state.mon, data)} class="dropdown-item" href="#">{data}</a>
                            )
                        }

                    </div>
                </div>
                <div>
                    {
                        this.state.type === "Hình thức nhận" ? (
                            <div className="col-11 mt-3 ml-5">
                                <h5 className="col-12 text-right" >Tổng doanh thu: <span className="giakm">{formatNumber.format(this.state.tongdoanhthu)}₫</span></h5>
                                <div className="col-6 mt-3 offset-3">
                                    <Pie data={this.state.thongkedoanhthu} />
                                </div>
                            </div>
                        ) : (
                            <div className="col-11 mt-3 ml-5">
                                <h5 className="col-12 text-right" >Tổng doanh thu: <span className="giakm">{formatNumber.format(this.state.tongdoanhthu)}₫</span></h5>
                                <Bar data={this.state.thongkedoanhthu} />
                            </div>
                        )
                    }
                </div>


            </div>
        );
    }
}

export default Sales;