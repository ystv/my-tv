import { Event, EventType, SignupSheet } from "../types/clapper";

export const DefaultEvent: Event = {
  eventID: 0,
  eventType: EventType.show,
  name: "",
  startDate: new Date(),
  endDate: new Date(),
  description: "",
  location: "",
  isPrivate: false,
  isCancelled: false,
  isTentative: false,
};

type Action =
  | { type: "update-basic"; event: Event }
  | { type: "update-signups"; signups: SignupSheet[] };

export const EventReducer = (event: Event, action: Action): Event => {
  switch (action.type) {
    case "update-basic":
      return {
        ...event,
        ...action.event,
      };
    case "update-signups":
      return {
        ...event,
        signups: {
          ...event.signups,
          ...action.signups,
        },
      };
    default:
      return event;
  }
};

export interface StepProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  state: Event;
  dispatch: React.Dispatch<Action>;
}
