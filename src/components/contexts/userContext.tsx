import { createContext, useContext } from "react";
import { userInterface } from "../types/people";
import UserRoles from "../types/permissions";

const UserContext = createContext<userInterface | undefined>(undefined);

export const UserInfo = (): userInterface | undefined =>
  useContext(UserContext);

export const withPermissions = (allowedPermIDs?: UserRoles[]) => {
  let allowed = false;
  UserInfo()?.permissions?.forEach((x) => {
    if (x.name === UserRoles.SuperUser) {
      allowed = true;
      console.log(x.name);
    } else {
      try {
        allowedPermIDs?.forEach((y) => {
          if (x.name === y) {
            allowed = true;
            console.log(y);
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
