import React, { Component } from 'react';

class Logout extends Component {
    Logout() {
        localStorage.clear();
    }
    render() {
        return (
            <div>
               <a className="dropdown-item" href="/" onClick={this.Logout}>Đăng Xuất</a>
            </div>
        );
    }
}
export default Logout;