// React Imports
import React, { useState, useEffect } from "react";

// MUI components
import Button from "@material-ui/core/Button";

// Custom Components
import apiAuthReq from "../components/functions/apiAuthReq";

// Type imports

// Other imports

// Begin Code

export default function Home() {
  const [data, setData] = useState({});

  useEffect(() => {
    apiAuthReq("/v1/internal/people/user/full").then((e) => {
      setData(e);
    });
  }, []);

  return (
    <div>
      <h2>Welcome Home!!</h2>
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <h3>Have some graphs and shit</h3>
      <h4>{JSON.stringify(data)}</h4>
    </div>
  );
}
