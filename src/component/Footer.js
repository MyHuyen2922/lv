import React, { Component } from "react";
import Logo from "../img/logo.jpg";
import phone from "../img/tải xuống.png";

class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cat:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.051178790143!2d105.7438174142821!3d10.01263147556516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0884d57e2cd3f%3A0x584d60bdad0016b8!2zSOG6u20gMTEyLCBBbiBCw6xuaCwgTmluaCBLaeG7gXUsIEPhuqduIFRoxqEsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1605682065400!5m2!1sen!2s",
    }
  }
  render() {
    return (
      <div className="row col-12 mt-2 border p-3 container-fluid bg-da">
        <div className="col-2">
          <img src={Logo} className="gt" alt="logo" />
          <h5 className="mt-2">Thời gian mở cửa</h5>
          <p>Thứ 2 - Thứ 6...8:00 - 21:00</p>
          <p>Thứ 7...................9:00 - 22:00</p>
          <p>Chủ nhật............9:00 - 22:00</p>
        </div>
        <div className="col-3 pl-5">
          <h4>Liên hệ với chúng tôi</h4>
         <div className="text-center">
         <div id="dt">
            <p class="tt">0812323456</p>
          </div>
          <div id="hotline">
            <p class="tt">02912323456</p>
          </div>
          <div id="mail">
            <p class="tt">myhuyen@gmail.com</p>
          </div>
          <div id="fb">
            <p class="tt">
              <a href="https://www.facebook.com/profile.php?id=100022160163646">
                Facebook
              </a>
            </p>
          </div>
          <div id="ins">
            <p class="tt">
              <a href="#">Instagram</a>
            </p>
          </div>
         </div>
        </div>
        <div className="col-7">
            <iframe src={ this.state.cat} frameBorder="0" aria-hidden="false" tabindex="0" allowFullScreen></iframe>	
        </div>
      </div>
    );
  }
}

export default componentName;
