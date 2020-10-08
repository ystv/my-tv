// React Imports
import React, { useState, useEffect } from "react";

// MUI components
import { Typography, Backdrop, CircularProgress } from "@material-ui/core";
import apiAuthReq from "../components/functions/apiAuthReq";

// Custom Components

// Type imports

// Other imports

// Begin Code

export default function Webcams() {
  const interval = 2000;
  const [imagesrcs, setImagesrcs] = useState([]);

  function getImage() {
    apiAuthReq("/v1/internal/misc/webcams").then((e) => {
      const srcs = e.map(
        (i: any) =>
          `https://api.ystv.co.uk/v1/internal/misc/webcams/${i.id}/${
            i.file
          }?${Date.now()}}`
      );

      setImagesrcs(srcs);
    });
  }

  useEffect(() => {
    const timer = setInterval(() => {
      getImage();
    }, interval);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <Typography variant="h4">Webcams</Typography>
      <br />
      {imagesrcs.length == 0 ? (
        <Backdrop open={true}>
          <CircularProgress color="primary" />
        </Backdrop>
      ) : (
        imagesrcs.map((imagesrc, i) => (
          <img src={imagesrc} width="50%" key={i} />
        ))
      )}
    </div>
  );
}
