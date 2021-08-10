// React Imports
import React from "react";

// MUI components
import { Typography } from "@material-ui/core";

// Custom Components

// Type imports

// Other imports

// Begin Code

export default function Home() {
  return (
    <div>
      <Typography variant="h4">Welcome Home!</Typography>
      <br />
      <Typography variant="h6">
        This site is still being actively developed so some features maybe still
        be missing temporarily! Please check{" "}
        <a href="https://forum.ystv.co.uk">the forum</a> if you have any
        questions or suggestions.
      </Typography>
      <Typography variant="h6">
        If you find something wrong, please let the computing team know :)
      </Typography>
    </div>
  );
}
