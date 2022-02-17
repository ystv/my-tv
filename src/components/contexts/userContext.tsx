import { createContext, useContext } from "react";
import { User } from "../types/people";
import UserPermission from "../types/permissions";

const UserContext = createContext<User>(null!);

export const UserInfo = (): User => useContext(UserContext);

export const isAuthorized = (
  authorizedPermissions: UserPermission[]
): boolean =>
  UserInfo().permissions.some(
    (permission) =>
      permission.name === UserPermission.SuperUser ||
      Object.values<string>(authorizedPermissions).includes(permission.name)
  );

export default UserContext;
