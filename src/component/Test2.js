import React, { Component } from 'react';

class Test2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idmon: [],
            gia: [],
        }
    }

    componentDidMount() {
        var idmon = [];
        var gia = [];
        const api = new AdminAPI();
        api.TextAPI()
            .then(response => {
                idmon = response['idmon'];
                gia = response['gia'];
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        return (
            <div>
                aaa
            </div>
        );
    }
}

export default Test2;