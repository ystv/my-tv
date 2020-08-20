import React, { useEffect, useState } from "react";

// MUI components
import { Button } from "@material-ui/core";

// Custom Components

// Other imports
import apiAuthReq from "../assets/apiAuthReq";

export default function Calendar() {
  const [data, setData] = useState({});

  useEffect(() => {
    apiAuthReq("http://api.ystv.co.uk/v1/internal/people/user/full").then(
      (e) => {
        setData(e);
      }
    );
  }, []);

  return (
    <div>
      <h2>Clapper</h2>
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <h3>Have some graphs and shit</h3>
      <h4>{JSON.stringify(data)}</h4>
    </div>
  );
}
