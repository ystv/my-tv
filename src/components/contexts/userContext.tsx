import { createContext, useContext } from "react";
import { UserInterface } from "../types/people";
import UserRoles from "../types/permissions";

const UserContext = createContext<UserInterface | undefined>(undefined);

export const UserInfo = (): UserInterface | undefined =>
  useContext(UserContext);

export const withPermissions = (allowedPermIDs?: UserRoles[]): boolean => {
  let allowed = false;
  UserInfo()?.permissions?.forEach((x) => {
    if (x.name === UserRoles.SuperUser) {
      allowed = true;
    } else {
      try {
        allowedPermIDs?.forEach((y) => {
          if (x.name === y) {
            allowed = true;
          }
        });
      } catch (err) {
        console.error(err);
      }
    }
  });
  return allowed;
};

export const UserContextConsumer = UserContext.Consumer;

export default UserContext;
