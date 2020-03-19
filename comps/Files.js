import React, { Component } from "react";

import styles from "../styles/styles.scss";
import { Row, Col } from "antd";

class File extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: undefined
    };
  }

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  render() {
    const { upload } = this.props;
    console.log(this.state.selectedFile);
    return (
      <Row>
        <Col xs={24} sm={24} md={7} lg={7} xl={7} xxl={7}>
          <div style={{ maxWidth: "140px", maxHeight: "42px" }}>
            <input
              title="Subir archivo"
              type="file"
              onChange={this.fileSelectedHandler}
              className={styles.custom_file_input}
              style={{ width: "100%", maxHeight: "42px" }}
              accept={upload === "image" ? "image/*" : "video/*"}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={17} lg={17} xl={17} xxl={16}>
          <p className={styles.selected_file}>
            {this.state.selectedFile !== undefined
              ? `Archivo seleccionado: ${this.state.selectedFile.name}`
              : "No se ha elegido ningún archivo."}
          </p>
        </Col>
      </Row>
    );
  }
}

export default File;

// upload == "image" ? "image/*" : "video/*";
