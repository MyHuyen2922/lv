import React, { Component } from 'react';
import UserAPI from '../API/UserAPI';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            dish: [],
        }
    }
    onChange = (e) => {
        e.preventDefault();
        this.setState({
            search: e.target.value,
        })
    }

    Search = () => {
        let thamso = new FormData();
        thamso.append("search", this.state.search);
        const api = new UserAPI();
        api.SearchAPI(thamso)
            .then(response => {
                console.log(response);
                    this.setState({
                        dish: response,
                    })
            })
            .catch(error => {
                console.log(error);
            })

    }

    render() {
        console.log(this.state.dish)
        const formatNumber = new Intl.NumberFormat('de');
        return (
            <div className="row ">
                <div className="input-group col-10 offset-1 mt-3">
                    <input type="text" name="search" onChange={this.onChange} className="form-control" placeholder="Bạn tìm..." />
                    <div className="input-group-append">
                        <p onClick={this.Search} className="btn btn-info" >Tìm</p>
                    </div>
                </div>
                <div className="row col-12">
                    {
                        this.state.dish.map((data, index) =>
                            <div className="col-2 mb-2 mon">
                                <img className="hinhanh" src={"http://localhost:80/" + data.hinhanh} alt="hinhanh" />
                                <p className="text-truncate ttmonCArt" >{data.tenmon}</p>
                                <p className="text-truncate ttmonCArt">{formatNumber.format(data.gia)}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default Search;