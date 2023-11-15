import React from "react";
import ReactQuill from "react-quill";

import { Card } from "@mui/material";

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

const Editor = ({ value, onChange, ...other }) => {
  return (
    <Card>
      <ReactQuill
        className="add-new-post__editor mb-1"
        placeholder="Describe Your Clothes Here"
        value={value}
        onChange={onChange}
        {...other}
      />
    </Card>
  );
};

export default Editor;
