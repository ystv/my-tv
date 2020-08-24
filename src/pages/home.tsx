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
      <h3>
        You've found a site under construction, keep checking as we add new
        features!
      </h3>
      <h3>
        If you find something wrong, please let the computing team know :)
      </h3>
    </div>
  );
}
