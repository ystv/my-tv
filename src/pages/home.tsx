import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import apiAuthReq from "../assets/apiAuthReq";

export default function Home() {
  const [data, setData] = useState({});

  useEffect(() => {
    apiAuthReq("http://api.ystv.co.uk/v1/internal/people/user/full").then(
      (e) => {
        setData(e);
        console.log("final data = ", e);
      }
    );
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
