// React Imports
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";

// MUI components
import { Step, Steps, useSteps } from "chakra-ui-steps";
import {
  Heading,
  Checkbox,
  Textarea,
  Input,
  HStack,
  Button,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import SearchSelect from "react-select";

// Custom Components
import apiAuthReq from "../components/functions/apiAuthReq";

// Type imports
import { eventInterface, positionInterface } from "../components/types/clapper";

// Other imports

// Begin Code

// const apiReq = async (url: string, method: string, body: any) => {
//   let endpoint = `${process.env.REACT_APP_API_BASEURL}${url}`;
//   await apiAuthReq("/user");
//   let res = await axios.post<eventInterface>(endpoint, body, {
//     withCredentials: true,
//   });
//   return res;
// };

const EventAdd: React.FC = (): JSX.Element => {
  const { register, handleSubmit } = useForm<eventInterface>();
  const [positions, setPositions] = useState<positionInterface[]>([]);
  const { nextStep, activeStep } = useSteps({
    initialStep: 0,
  });

  useEffect(() => {
    apiAuthReq("/v1/internal/clapper/positions").then((e) => setPositions(e));
  }, []);

  function onSubmitStepOne(data: eventInterface) {
    console.log("creating new event", data);
    nextStep();
  }

  return (
    <Steps orientation="vertical" activeStep={activeStep}>
      <Step key="Create Event" label="Create Event">
        <form onSubmit={handleSubmit(onSubmitStepOne)}>
          <Heading>Create Event</Heading>
          <br />

          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input variant="outline" placeholder="Name" {...register("name")} />
          </FormControl>

          <FormLabel>Location</FormLabel>
          <Input
            variant="outline"
            placeholder="Location"
            {...register("name")}
          />

          <FormLabel>Description</FormLabel>
          <Textarea
            resize="vertical"
            placeholder="Description"
            {...register("description")}
            variant="outline"
          />

          <FormLabel>Type</FormLabel>
          <Select {...register("eventType")} variant="outline">
            <option value="show">Show</option>
            <option value="meeting">Meeting</option>
            <option value="social">Social</option>
            <option value="other">Other</option>
          </Select>

          <HStack>
            <Checkbox {...register("isTentative")}>Tentative</Checkbox>
            <Checkbox {...register("isCancelled")}>Cancelled</Checkbox>
          </HStack>

          <br />
          <HStack>
            <Button variant="outline" component={RouterLink} to="/calendar">
              Back
            </Button>{" "}
            <Button variant="solid" type="submit">
              Next
            </Button>
          </HStack>
        </form>
      </Step>
      <Step key="Add Signups" label="Add Signups">
        <Heading>Add Signups</Heading>
        <FormLabel>Positions</FormLabel>
        <SearchSelect
          placeholder="Search or select role"
          options={positions.map((e) => ({
            value: e.positionID,
            label: e.name,
          }))}
        />
      </Step>
    </Steps>
  );
};

export default EventAdd;
