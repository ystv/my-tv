import { createContext, useContext } from "react";
import { userInterface } from "../types/people";

const UserContext = createContext<userInterface | undefined>(undefined);

export const UserInfo = (): userInterface | undefined =>
  useContext(UserContext);

export const UserContextConsumer = UserContext.Consumer;

export default UserContext;
