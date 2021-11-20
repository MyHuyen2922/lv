import React, { Component } from 'react';
import '../App.css';

class Dish extends Component {
    constructor(props) {
        super(props);

    }
    showDish = () => {
        this.props.visibleDetail();
    }
    render() {
        var dish = this.props.title;
        const formatNumber = new Intl.NumberFormat('de');
        return (
            <div className="col-12">
                <img className="hinhanh" src={"http://localhost:80/" + dish.hinhanh} alt="hinhanh" />
                <p onClick={this.showDish}>{dish.tenmon}</p>
                <p>{formatNumber.format(dish.gia)} VND</p>
            </div>
        );
    }
}

export default Dish;