// React Imports
import React, { useState, useEffect } from "react";

// MUI components
import { Center, Grid, Heading, Spinner } from "@chakra-ui/react";
import apiAuthReq from "../components/functions/apiAuthReq";

// Custom Components

// Type imports

// Other imports

// Begin Code

export default function Webcams(): JSX.Element {
  const interval = 2000;
  const [imagesrcs, setImagesrcs] = useState([]);

  function getImage() {
    apiAuthReq("/v1/internal/misc/webcams").then((e) => {
      const srcs = e.map(
        (i: any) =>
          `${process.env.REACT_APP_API_BASEURL}/v1/internal/misc/webcams/${
            i.id
          }/${i.file}?${Date.now()}}`
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
      <Heading>Webcams</Heading>
      <br />
      {imagesrcs.length === 0 ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}>
          {imagesrcs.map((imageSrc, i) => (
            <img src={imageSrc} key={imageSrc} alt={`webcam ${i}`} />
          ))}
        </Grid>
      )}
      <p>
        Please note that these feeds are not 100% reliable and go down from time
        to time, please inform #computing on slack or email the Computing team.
      </p>
    </div>
  );
}
