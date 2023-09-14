import { CircularProgress, Typography } from "@mui/joy";
import { Component } from "react";

export default class footer extends Component {
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography level="h3">Loading Data...</Typography>
        <CircularProgress variant={"soft"} color="primary" />
      </div>
    );
  }
}
