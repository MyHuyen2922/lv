import React, { Component } from 'react'; 
import AdminAPI from '../API/admin/AdminAPI';

class Test extends Component {
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
        api.TestAPI()
            .then(response => {
                idmon = response['idmon'];
                gia = response['gia'];
                this.setState({
                    idmon: idmon,
                    gia:gia
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        console.log(this.state.idmon);
        console.log(this.state.gia);
        return (
            <div>
                aaa
            </div>
        );
    }
}

export default Test;