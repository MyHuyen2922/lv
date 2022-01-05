import React, { Component } from 'react';
import UserAPI from '../../API/UserAPI';

class BessSelling extends Component {
    constructor(props){
        super(props);
        this.state = {
            bestselling: [],
            allItem:[]
        }
    }
    componentDidMount(){
        const api = new UserAPI();
        api.BestSellingAPI()
        .then(response =>{
            console.log(response);
            var a = Object.keys(response).sort(function(a,b){return response[b] - response[a]}); 
            console.log(a);
                this.setState({
                    bestselling: a,
                })
        })
        .catch(error =>{
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
    visibleDetail =() =>{
        this.props.visibleDetail();
    }
    render() {
        if(this.state.bestselling.length === 0 || this.state.allItem.length === 0)
            return null;
        return (
            <div className="row col-12 ml-3">
            {
                this.state.bestselling.map((idmon, index) =>
                     <div  key={index} className="col-2 mb-2 mon ">
                     <img onClick={this.visibleDetail.bind(this, index)} className="hinhanhBestSelling" src={"http://localhost:80/" + this.state.allItem[idmon].hinhanh} alt="hinhanh" />
                     <p className="text-truncate ttmonCArt" >{this.state.allItem[idmon].tenmon}</p>
                     <p className="text-truncate ttmonCArt" >{this.state.allItem[idmon].gia}</p>
                 </div>
                )
            }
            </div>
        );
    }
}

export default BessSelling;