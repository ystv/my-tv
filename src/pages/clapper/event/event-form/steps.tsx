import React from "react";
import { StepProps } from "../../../../components/reducers/event-reducer";
import BasicEventInfo from "./basic-event-info";
import SignupSheets from "./signup-sheets";

const FormSteps = ({ step, setStep, state, dispatch }: StepProps) => [
  {
    title: "Basic event information",
    content: (
      <BasicEventInfo
        step={step}
        setStep={setStep}
        state={state}
        dispatch={dispatch}
      />
    ),
  },
  {
    title: "Signup sheets",
    content: (
      <SignupSheets
        step={step}
        setStep={setStep}
        state={state}
        dispatch={dispatch}
      />
    ),
  },
];

export default FormSteps;
