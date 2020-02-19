import React, { Component, useRef } from "react";
import Files from "../../comps/Files";

function Create() {
  const fileRef = useRef(null);

  return (
    <div>
      <Files ref={fileRef}></Files>
    </div>
  );
}

export default Create;
