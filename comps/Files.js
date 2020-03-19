import React, { Component } from "react";

import styles from "../styles/styles.scss";

class File extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };
  }

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  render() {
    const { upload } = this.props;
    return (
      <div>
        <input
          title="Subir imagen"
          type="file"
          onChange={this.fileSelectedHandler}
          className={styles.custom_file_input}
          accept={upload == "image" ? "image/*" : "video/*"}
        />
      </div>
    );
  }
}

export default File;

// upload == "image" ? "image/*" : "video/*";
