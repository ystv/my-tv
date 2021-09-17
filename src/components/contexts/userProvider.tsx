import React from "react";
import UserContext from "./userContext";
import { userInterface } from "../types/people";

interface ProviderProps {
  user: userInterface;
}

const UserProvider: React.FC<ProviderProps> = ({ user, children }) => {
  const { Provider } = UserContext;
  return <Provider value={user}>{children}</Provider>;
};

export default UserProvider;
