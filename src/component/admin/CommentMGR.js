import React, { Component } from 'react';
import AdminAPI from '../../API/admin/AdminAPI';
import Chipi from '../../img/chipivui.png';

class CommentMGR extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: [],
            allreport: [],
            detailreport: [],
            class_reason: 'hidden',
            class_content: 'visible',
            nd: '',
            kh:'',
        }
    }
    componentDidMount() {
        this.getComment();
        this.getReport();
    }
    getComment() {
        const api = new AdminAPI();
        api.GetCommentAdminAPI()
            .then(response => {
                console.log(response);
                this.setState({
                    comment: response
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
    getReport() {
        const api = new AdminAPI();
        api.GetReportAPI()
            .then(response => {
                console.log(response);
                this.setState({
                    allreport: response
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
    onReport = (idbl,nd,kh) => {
        let arr = [];
        for (let i = 0; i < this.state.allreport.length; i++) {
            if (this.state.allreport[i].idbl === idbl)
                arr.push(this.state.allreport[i]);
        }
        console.log(arr);
        this.setState({
            detailreport: arr,
            class_reason: 'col-6 offset-3 mt-5 pb-3 visible-ctdh',
            class_content: 'home-hidden',
            nd: nd,
            kh:kh
        });
    }
    hiddenDetail=()=>{
        this.setState({
            class_reason: 'hidden',
            class_content: 'visible',
        })
    }
    DeleteComment =(idbl)=>{
        console.log(idbl);
        let thamso = new FormData();
        thamso.append("idbl",idbl);
        const api = new AdminAPI();
        api.DeleteCommentAPI(thamso)
        .then(response => {
            console.log(response);
            if(response[0].code ==="200"){
                alert("???? x??a !!!")
                this.componentDidMount();
            }
            else{
                alert("Vui l??ng th??? l???i sau !!!");
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
    render() {
        console.log(this.state.detailreport);
        return (
            <div className="iframeadmin">
                <div className={this.state.class_reason}>
                    <div className="col-12 ml-3 text-right">
                        <p onClick={this.hiddenDetail}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg text-danger" viewBox="0 0 16 16">
                                <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                            </svg>
                        </p>
                    </div>
                    <div>
                        <span className="font-weight-bold ">N???i dung:</span><span className="font-italic">{this.state.nd}</span><br /><br />
                        <span className="font-weight-bold ">Kh??ch h??ng b??nh lu???n:</span><span className="font-italic">{this.state.kh}</span>
                    </div>
                    <div className="row col-12 ml-1">
                        <div className="col-5  mt-3 border p-3 text-center bggray font-weight-bold">Kh??ch h??ng b??o x???u</div>
                        <div className="col-7  mt-3 border p-3 text-center bggray font-weight-bold">L?? do</div>
                    </div>
                    {this.state.detailreport.length > 0 ? (
                        this.state.detailreport.map((data, index) => {
                            return (
                                <div className="row col-12 ml-1">
                                    <div className="col-5 border p-2 text-center">{data.hoten}</div>
                                    <div className="col-7 border p-2 text-center">{data.lido}</div>
                                </div>
                            )
                        })
                    ) :
                        (
                            <div className="text-center mt-5">
                                <h4><i>B??nh lu???n kh??ng c?? b??o x???u</i></h4>
                                <img src={Chipi} alt="chipi" className="chipi" />
                            </div>
                        )}
                </div>
                <div className={this.state.class_content}>
                   <div className="col-12 row"><h4 className="text-center col-12 mt-3 mb-3 colorgreen">QU???N L?? B??NH LU???N</h4></div>
                    <div className="row col-12">
                        <div className="col-1 border p-3 text-center bggray font-weight-bold">M??</div>
                        <div className="col-2 border p-3 text-center bggray font-weight-bold">T??n m??n</div>
                        <div className="col-3 border p-3 text-center bggray font-weight-bold">Kh??ch h??ng b??nh lu???n</div>
                        <div className="col-3 border p-3 text-center bggray font-weight-bold">N???i dung</div>
                        <div className="col-2 border p-3 text-center bggray font-weight-bold">B??o x???u</div>
                        <div className="col-1 border p-3 text-center bggray"></div>
                    </div>
                    {
                        this.state.comment.map((data, index) => {
                            if (data.cmt !== '') {
                                return (
                                    <div key={index} className="row col-12">
                                        <div className="col-1 border p-2 text-center"  onClick={this.onReport.bind(this, data.idbl,data.cmt,data.hoten)}>{data.idbl}</div>
                                        <div className="col-2 border p-2 text-center"  onClick={this.onReport.bind(this, data.idbl,data.cmt,data.hoten)}>{data.tenmon}</div>
                                        <div className="col-3 border p-2 text-center"  onClick={this.onReport.bind(this, data.idbl,data.cmt,data.hoten)}>{data.hoten}</div>
                                        <div className="col-3 border p-2 text-center"  onClick={this.onReport.bind(this, data.idbl,data.cmt,data.hoten)}>{data.cmt}</div>
                                        <div className="col-2 border p-2 text-center"  onClick={this.onReport.bind(this, data.idbl,data.cmt,data.hoten)}>{data.report}</div>
                                        <div className="col-1 border p-2 text-center">
                                            <p onClick={this.DeleteComment.bind(this, data.idbl)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash text-danger" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                </svg>
                                            </p>
                                        </div>
                                    </div>
                                )
                            }
                        }
                        )
                    }
                </div>
            </div>
        );
    }
}

export default CommentMGR;