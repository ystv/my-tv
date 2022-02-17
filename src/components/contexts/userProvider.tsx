import React from "react";
import UserContext from "./userContext";
import { User } from "../types/people";

interface ProviderProps {
  user: User;
}

const UserProvider: React.FC<ProviderProps> = ({ user, children }) => {
  const { Provider } = UserContext;
  return <Provider value={user}>{children}</Provider>;
};

export default UserProvider;
