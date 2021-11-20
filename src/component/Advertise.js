import React, { Component } from 'react';
import br1 from '../img/br1.png';
import br2 from '../img/br2.png';
import br3 from '../img/br3.png';
import Slogan from '../img/slogan.png';

class Advertise extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-7">
            <div id="demo" className="carousel slide" data-ride="carousel">
              <ul className="carousel-indicators">
                <li data-target="#demo" data-slide-to="0" class="active"></li>
                <li data-target="#demo" data-slide-to="1"></li>
                <li data-target="#demo" data-slide-to="2"></li>
              </ul>
              <div className="carousel-inner border border-primary">
                <div className="carousel-item active">
                  <img src={br1} id="br1" alt="br"/>
                </div>
                <div className="carousel-item">
                  <img src={br2} id="br2" alt="br"/>
                </div>
                <div className="carousel-item">
                  <img src={br3} id="br3" alt="br"/>
                </div>
              </div>
              <a className="carousel-control-prev" href="#demo" data-slide="prev">
                <span className="carousel-control-prev-icon"></span>
              </a>
              <a className="carousel-control-next" href="#demo" data-slide="next">
                <span className="carousel-control-next-icon"></span>
              </a>
            </div>
          </div>
          <div className="col-md-5">
            <img src={Slogan} className="slogan border border-primary" alt="slogan"/>
          </div>
        </div>
      </div>
    );
  }
}

export default Advertise;