export interface calendarInterface {
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

export interface eventInterface {
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
  signups?: signupInterface[];
  attendees?: attendeeInterface[];
}

export interface crewInterface extends positionInterface {
  crewID: number;
  locked: boolean;
  credited: boolean;
  ordering: number;
  user: calUserInterface;
}

export interface attendeeInterface extends calUserInterface {
  attendStatus: string;
}

export interface signupInterface {
  signupID: number;
  title: string;
  description: string;
  unlockDate: Date;
  startTime: Date;
  endTime: Date;
  crew: crewInterface[];
}

export interface calUserInterface {
  userID: number;
  nickname: string;
  firstName: string;
  lastName: string;
}

export interface positionInterface {
  positionID: number;
  name: string;
  description: string;
  admin: boolean;
  permissionID: number;
}
