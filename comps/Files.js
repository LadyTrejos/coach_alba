import React, { Component } from "react";

import styles from "../styles/styles.scss";

class File extends Component {
  state = {
    selectedFile: null
  };
  fileSelectedHandler = event => {
    console.log(event.target.files);
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  render() {
    return (
      <div>
        <input
          title="Subir imagen"
          type="file"
          onChange={this.fileSelectedHandler}
          className={styles.custom_file_input}
          accept="image/png, image/jpeg, image/jpg"
          multiple
        />
      </div>
    );
  }
}

export default File;
