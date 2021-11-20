import React, { Component } from "react";
import Logo from "../img/send.png";
import Cherry from "../img/cherry2.png";
import axios from "axios";

class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class_chat: "col-12 none",
      class_icon: "visible iconmess",
      chat: "",
      trochuyen: [
        ["bot", { Text: "Xin chào bạn !!!", img: null, action: null }],
        ["bot", { Text: "Bạn cần hỗ trợ gì ạ ???", img: null, action: null }],
      ],
    };
  }
  onChatbox = () => {
    this.setState({
      class_chat: "col-12 visible_chatbot",
      class_icon: "none",
    });
  };
  hiddenOnChatbox = () => {
    this.setState({
      class_chat: "col-12 none",
      class_icon: "visible col-12 iconmess",
    });
  };
  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  onSend = () => {
    if (this.state.chat === "") {
      alert("Bạn chưa nhập câu hỏi !!!");
    } else {
      var arr = [];
      var story = this.state.trochuyen;
      arr.push(this.state.chat);
      story.push(arr);
      console.log(arr);
      this.setState(
        {
          chat: "",
          trochuyen: story,
        },
        function () {
          document
            .getElementById("content")
            .scrollTo(0, document.getElementById("content").scrollHeight);
        }
      );
      this.getBotResponse();
    }
  };

  getBotResponse = () => {
    let thamso = {};
    thamso["message"] = this.state.chat;
    const api = axios.create({ baseURL: "http://localhost:5005" });
    return api
      .post("/webhooks/rest/webhook", thamso)
      .then((response) => {
        console.log(response);
        var story = this.state.trochuyen;
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].text !== undefined) {
            var arr = [];
            arr.push("bot", {
              Text: response.data[i].text,
              img: null,
              action: null,
            });
            story.push(arr);
            console.log(story);
          } else {
            var arr = [];
            arr.push("bot", {
              Text: response.data[i].custom.text,
              img: response.data[i].custom.img,
              action: response.data[i].custom.action,
            });
            story.push(arr);
            console.log(story);
          }
        }
        this.setState(
          {
            trochuyen: story,
          },
          function () {
            document
              .getElementById("content")
              .scrollTo(0, document.getElementById("content").scrollHeight);
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  VisibleDetail =(index)=>{
    this.props.visibleDetailBest(index);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className={this.state.class_chat}>
            <div className="chatbox bggreen">
              <div className="col-12 text-right ml-3">
                <span className="mr-2" onClick={this.hiddenOnChatbox}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-x-lg text-danger"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                    />
                  </svg>
                </span>
              </div>
              <div className="content" id="content">
                {this.state.trochuyen.map((trochuyen, index) =>
                  trochuyen[0] === "bot" ? (
                    trochuyen[1]["action"] !== null ? (
                      <div className="mess_bot m-1 p-1" onClick={this.VisibleDetail.bind(this, Number(trochuyen[1]["action"]))}>
                        <img className="cherry" src={Cherry} alt="send" />
                        <span className="p-2">
                          {trochuyen[1]["img"] !== null ? (
                            <div className="colorgreen">
                              <img
                                className="imgChat"
                                src={
                                  "http://localhost:80/" + trochuyen[1]["img"]
                                }
                              />
                              {trochuyen[1]["Text"]
                                .split("|")
                                .map((text, index) => (
                                  <p key={index}>{text}</p>
                                ))}
                            </div>
                          ) : (
                            <div className="colorgreen">
                              {trochuyen[1]["Text"]
                                .split("|")
                                .map((text, index) => (
                                  <p key={index}>{text}</p>
                                ))}
                            </div>
                          )}
                        </span>
                      </div>
                    ) : (
                      <div className="mess_bot m-1 p-1">
                        <img className="cherry" src={Cherry} alt="send" />
                        <span className="p-2"> {trochuyen[1]["Text"]}</span>
                      </div>
                    )
                  ) : (
                    <div className="mess_user m-1 p-1">
                      <span className="p-2"> {trochuyen[0]}</span>
                    </div>
                  )
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="chat"
                  onChange={this.onChange}
                  className="col-10 inpchat mt-1"
                  value={this.state.chat}
                />
                <span onClick={this.onSend}>
                  <img className="ml-1 send" src={Logo} alt="send" />
                </span>
              </div>
            </div>
            <div className="closechat col-12 text-right">
              <span onClick={this.hiddenOnChatbox}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="currentColor"
                  class="bi bi-x-circle text-danger"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className={this.state.class_icon}>
          <p onClick={this.onChatbox} className="rounded-circle btn btn-primary p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="38"
              fill="currentColor"
              class="bi bi-messenger text-white"
              viewBox="0 0 16 16"
            >
              <path d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.639.639 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.639.639 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76zm5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z" />
            </svg>
          </p>
        </div>
      </div>
    );
  }
}
export default componentName;
