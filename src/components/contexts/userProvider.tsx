import React from "react";
import UserContext from "./userContext";
import { UserInterface } from "../types/people";

export interface ProviderProps {
  user: UserInterface;
  children: React.ReactNode;
}

const UserProvider: React.FC<ProviderProps> = ({ user, children }) => {
  const { Provider } = UserContext;
  return <Provider value={user}>{children}</Provider>;
};

export default UserProvider;
