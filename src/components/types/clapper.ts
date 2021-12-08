export interface Calendar {
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

export interface Event {
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
  signups?: SignupSheet[];
  attendees?: Attendee[];
}

export interface Crew extends Position {
  crewID: number;
  locked: boolean;
  credited: boolean;
  ordering: number;
  user: SmallUser;
}

export interface Attendee extends SmallUser {
  attendStatus: string;
}

export interface SignupSheet {
  signupID: number;
  title: string;
  description: string;
  unlockDate: Date;
  startTime: Date;
  endTime: Date;
  arrivalTime: Date;
  crew: Crew[];
}

export interface SmallUser {
  userID: number;
  nickname: string;
  firstName: string;
  lastName: string;
}

export interface Position {
  positionID: number;
  name: string;
  description: string;
  admin: boolean;
  permissionID: number;
  // Extra
  group: string;
  image: string;
  pageDescription: string;
  responsibilites: string[];
  trainingURL: string;
  watching: boolean;
}

export interface Group {
  groupID: number;
  name: string;
  description: string;
  teamLead: SmallUser;
  primaryColour: string;
}
