import React, { useReducer, useState } from "react";
import { Heading, Flex } from "@chakra-ui/react";
import {
  EventReducer,
  DefaultEvent,
} from "../../../components/reducers/event-reducer";
import FormSteps from "./event-form/steps";

const NewEvent: React.FC = (): JSX.Element => {
  const [step, setStep] = useState(0);
  const [state, dispatch] = useReducer(EventReducer, DefaultEvent);

  const steps = FormSteps({ step, setStep, state, dispatch });

  return (
    <>
      <Heading>Create Event: {steps[step].title}</Heading>

      <Flex>{steps[step].content}</Flex>
    </>
  );
};

export default NewEvent;
