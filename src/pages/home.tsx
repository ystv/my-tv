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
      <Typography variant="h4">Welcome Home!!</Typography>
      <br />
      <Typography variant="h6">
        You've found a site under construction, keep checking as we add new
        features!
      </Typography>
      <Typography variant="h6">
        Please note this site uses a separate development data source from the
        main site, anything entered on here will not be permenant or show
        changes on the main site; this is for fun experimenting only!
      </Typography>
      <Typography variant="h6">
        If you find something wrong, please let the computing team know :)
      </Typography>
    </div>
  );
}
