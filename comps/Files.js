import React, { Component } from "react";
import { Button } from "antd";
import styles from "../styles/styles.scss";

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
        <input
          title="Subir imagen"
          type="file"
          onChange={this.fileSelectedHandler}
          className={styles.custom_file_input}
          accept="image/png, image/jpeg, image/jpg"
        />

        {/* <Button onClick={this.fileUploadHandler}></Button> */}
      </div>
    );
  }
}

export default File;
