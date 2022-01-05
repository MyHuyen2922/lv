import React, { Component } from 'react';
import AdminAPI from '../../API/admin/AdminAPI';
import UserAPI from '../../API/UserAPI';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idmon: this.props.idmon,
            cmt: "",
            rate: [0, 0, 0, 0, 0],
            diem:0,
        }
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState({ cmt: e.target.value })
    }
    Comment = (e) => {
        e.preventDefault();
        let thamso = new FormData();
        if(this.state.diem !== 0){
            thamso.append("diem", this.state.diem);
        }
        thamso.append("idkh", localStorage.getItem('idkh'));
        thamso.append("idmon", this.state.idmon);
        thamso.append("cmt", this.state.cmt);
        console.log(e.target.value);
        console.log(this.state.cmt);
        const api = new UserAPI();
        api.CommentAPI(thamso)
            .then(response => {
                console.log(response);
                if (response[0].code === '200') {
                    alert("Đã gửi bình luận !!!")
                    this.setState({
                        cmt: ''
                    })
                }

            })
            .catch(error => {
                console.log(error);
            })
    }
    popUp = (index) => {
        console.log(index);
        var i;
        var arr = this.state.rate;
        for (i = this.state.diem; i <= index; i++) {
            arr[i]=1
        }
        this.setState({
            rate: arr,
        })
        console.log(arr)
    }
    popDown = (index) => {
        console.log(index);
        var i;
        var arr = this.state.rate;
        for (i = this.state.diem; i <= index; i++) {
            arr[i]=0
        }
        this.setState({
            rate: arr,
        })
        console.log(arr)
    }
    clickMouse = (index) => {
        console.log(index);
        var i;
        var arr = this.state.rate;
        for (i = this.state.diem; i <= index; i++) {
            arr[i]=1;
        }
        for(i = index +1; i<5;i++){
            arr[i]=0;
        }
       this.setState({
           diem: index + 1,
           rate: arr,
       })
    }
    render() {
        return (
            <div className="row col-12 mb-2">
                <div className="row col-12">
                    {this.state.rate.map((data, index) => {
                        if (data === 0) {
                            return (
                                <div><span onClick={this.clickMouse.bind(this, index)} onMouseOver={this.popUp.bind(this, index)} onMouseOut={this.popDown.bind(this,index)} className="star"></span></div>
                            )
                        }
                        else {
                            return (
                                <div><span onClick={this.clickMouse.bind(this, index)} onMouseOver={this.popUp.bind(this, index)} onMouseOut={this.popDown.bind(this.state, index)} className="yellowstar"></span></div>
                            )
                        }
                    })}
                </div>
                <div className="col-10 text-right">
                    <input className=" inputBL" type="text" name="cmt" value={this.state.cmt} onChange={this.onChange} placeholder=" Nhập bình luận" />
                </div>
                <div className="col-2 text-right">
                    <button className="btn btn-info" onClick={this.Comment}>Bình luận</button>
                </div>
            </div>
        )
    }
}

export default Comment;