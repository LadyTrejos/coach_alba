import React, { Component } from "react";
import { Button } from "antd";

class File extends Component {
  state = {
    selectedFile: null
  };
  fileSelectedHandler = event => {
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  //   fileUploadHandler = () => {

  //   };
  render() {
    return (
      <div>
        <input type="file" onChange={this.fileSelectedHandler} />
        {/* <Button onClick={this.fileUploadHandler}></Button> */}
      </div>
    );
  }
}

export default File;
