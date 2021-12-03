// React Imports
import React, { useState, useEffect } from "react";

// MUI components
import {
  Center,
  Heading,
  Link,
  SimpleGrid,
  Spinner,
  Image,
} from "@chakra-ui/react";
import { Webcam } from "../components/types/webcams";
import { misc } from "../services/services";

// Custom Components

// Type imports

// Other imports

// Begin Code

export default function Webcams(): JSX.Element {
  const interval = 2000;
  const [cams, setCams] = useState<Webcam[]>();

  useEffect(() => {
    const timer = setInterval(() => {
      misc.getWebcams().then((webcams) => {
        setCams(webcams);
      });
    }, interval);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <Heading>Webcams</Heading>
      <br />
      {!cams ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <SimpleGrid colums={2} spacing="2rem">
          {cams.map((cam) => (
            <Image
              src={`${
                process.env.REACT_APP_API_BASEURL
              }/v1/internal/misc/webcams/${cam.id}/${cam.file}?${Date.now()}}`}
              key={cam.id}
              alt={`Webcam: ${cam.name}`}
              height="16rem"
            />
          ))}
        </SimpleGrid>
      )}
      <p>
        Please note that these feeds are not 100% reliable and go down from time
        to time, please inform{" "}
        <Link href="https://ystv.slack.com/archives/C0CG8PRBN">#computing</Link>{" "}
        Slack channel or email the{" "}
        <Link href="mailto:computing@ystv.co.uk">Computing team</Link>.
      </p>
    </div>
  );
}
