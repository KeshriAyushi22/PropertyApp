import React from "react";
import { Favorite, LocalHotel, Bathtub, Home } from "@material-ui/icons";
import { Paper } from "@material-ui/core";

export default function PaperComponent(props) {
  console.log(props);
  return (
    <Paper elevation={0} style={{ display: "flex", width: "30px" }}>
      {props.value}
    </Paper>
  );
}
