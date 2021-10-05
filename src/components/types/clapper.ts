export interface CalendarInterface {
  eventID: number;
  eventType: string;
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  location: string;
  isPrivate: boolean;
  isCancelled: boolean;
  isTentative: boolean;
}

export interface EventInterface {
  eventID: number;
  eventType: string;
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  location: string;
  isPrivate: boolean;
  isCancelled: boolean;
  isTentative: boolean;
  signups?: SignupSheetInterface[];
  attendees?: AttendeeInterface[];
}

export interface CrewInterface extends PositionInterface {
  crewID: number;
  locked: boolean;
  credited: boolean;
  ordering: number;
  user: ClapperUserInterface;
}

export interface AttendeeInterface extends ClapperUserInterface {
  attendStatus: string;
}

export interface SignupSheetInterface {
  signupID: number;
  title: string;
  description: string;
  unlockDate: Date;
  startTime: Date;
  endTime: Date;
  arrivalTime: Date;
  crew: CrewInterface[];
}

export interface ClapperUserInterface {
  userID: number;
  nickname: string;
  firstName: string;
  lastName: string;
}

export interface PositionInterface {
  positionID: number;
  name: string;
  description: string;
  admin: boolean;
  permissionID: number;
}
