import React, { Component } from 'react';
import UserAPI from '../../API/UserAPI';

class GetComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: [],
            class_report: 'hidden',
            class_cmt: 'mt-2 col-12 visible',
            report: 'Spam',
            detailComment: [],
            orther_report: '',
            class_orther:'hidden',
        }
    }

    componentDidMount() {
        if (this.props.idmon !== undefined) {
            let thamso = new FormData();
            thamso.append("idmon", this.props.idmon);
            console.log(this.props.idmon);
            const api = new UserAPI();
            api.GetCommentAPI(thamso)
                .then(response => {
                    console.log(response);
                    this.setState({ comment: response })
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        })
       if(value === 'Khác'){
           this.setState({
               class_orther:'visible'
           })
       }
       else{
        this.setState({
            class_orther:'hidden'
        })
       }
    }
    onReport = (idbl) => {
        let data = this.state.comment;
        console.log(data[idbl]);
        this.setState({
            detailComment: data[idbl],
            class_cmt: 'home-hidden',
            class_report: 'col-4 offset-4 visible-search dcmoi bg-white p-3'
        })
    }
    hiddenReport = () => {
        this.setState({
            class_report: 'hidden',
            class_cmt: 'mt-2 col-12 visible',
            class_orther:'hidden'
        })
    }
    Change = (e) => {
        e.preventDefault();
        this.setState({
            orther_report: e.target.value,
        })
    }
    onSubmit = () => {
        let thamso = new FormData();
        if (this.state.report === 'Khác') {
           thamso.append("lido",this.state.orther_report);
        }
        else{
            thamso.append("lido", this.state.report);
        }
        thamso.append("idkh", localStorage.getItem('idkh'));
        thamso.append("idbl", this.state.detailComment.idbl);
        const api = new UserAPI();
        api.ReportAPI(thamso)
            .then(response => {
                console.log(response);
                if (response[0].code === "200") {
                    alert("Report thành công !!!")
                    this.setState({
                        report: 'Spam',
                        class_orther:'hidden',
                        class_report: 'hidden',
                        class_cmt: 'mt-2 col-12 visible',
                    })
                }
                else {
                    alert("Vui lòng thử lại !!!")
                }

            })
            .catch(error => {
                console.log(error);
            })

    }
    render() {
        var reason = ['Spam', 'Thông tin sai sự thật', 'Ngôn từ thô tục', 'Nội dung không phù hợp', 'Quấy rối', 'Khác'];
        if (this.props.idmon === undefined)
            return null;
        return (
            <div className="mt-2 col-12">
                <div className={this.state.class_report}>
                    <form>
                        <h4>Chọn lí do bạn muốn Report</h4>
                        {
                            reason.map((reason, index) =>
                                reason === this.state.report ? (
                                    <div>
                                        <input type="radio" name="report" value={reason} checked /> &nbsp;
                                        <label>{reason}</label><br />
                                    </div>
                                ) : (
                                    <div>
                                        <input onChange={this.onChange} type="radio" name="report" value={reason} /> &nbsp;
                                        <label>{reason}</label><br />
                                    </div>
                                )
                            )
                        }
                        <div className={this.state.class_orther}>
                            <textarea rows="3" cols="40" type="text" name="orther_report" onChange={this.Change} placeholder="Nội dung báo xấu" />
                        </div>
                        <div className="col-12 text-right">
                            <span onClick={this.onSubmit} className="btn btn-success">Gửi</span>&nbsp;&nbsp;
                            <span onClick={this.hiddenReport} className="btn btn-secondary">Đóng</span>
                        </div>
                    </form>
                </div>
                <div className={this.state.class_cmt}>
                    <h4>Đánh giá sản phẩm</h4>
                    {
                        this.state.comment.length > 0 ? (
                            this.state.comment.map((data, index) => {
                                if (Number(data.diem) !== 0) {
                                    return (
                                        <div className="row cmt ml-2">
                                            <div className="col-1">
                                                <img src={"http://localhost:80/" + data.avatar} className="rounded-circle avatarCmt" alt="avt" />
                                            </div>
                                            <div className="row col-11">
                                                <div className="row col-12">
                                                    <div className="col-10">
                                                        <p className="font-weight-light font-italic">{data.hoten}</p>
                                                    </div>
                                                    <div className="col-2 text-right">
                                                        <p onClick={this.onReport.bind(this,index)} className="btn btn-secondary">Report</p>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div class="ratings mt-auto">
                                                        <div className="rating-outer">
                                                            <div className="rating-inner" style={{ width: `${(data.diem / 5) * 100}%` }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <p>{data.cmt}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                else {
                                    return (
                                        <div className="row cmt ml-2">
                                            <div className="col-1">
                                                <img src={"http://localhost:80/" + data.avatar} className="rounded-circle avatarCmt" alt="avt" />
                                            </div>
                                            <div className="row col-11">
                                                <div className="row col-12">
                                                    <div className="col-10">
                                                        <p className="font-weight-light font-italic">{data.hoten}</p>
                                                    </div>
                                                    <div className="col-2 text-right">
                                                        <p onClick={this.onReport.bind(this,index)} className="btn btn-secondary">Report</p>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <p>{data.cmt}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            }
                            )
                        ) : (
                            <div className="mt-2">
                                <h6><i>Chưa có đánh giá</i></h6>
                            </div>
                        )

                    }
                </div>
            </div>
        );
    }
}

export default GetComment;