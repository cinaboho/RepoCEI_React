import React from "react";
import { Typography } from "@mui/material"

const TextError = (props) => {
    return <Typography  style={{ color: "red", fontSize: "0.7rem", padding: 2 }}>{props.children}</Typography>;
};

export default TextError;
