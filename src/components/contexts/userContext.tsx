import { createContext, useContext } from "react";
import { UserInterface } from "../types/people";
import UserPermission from "../types/permissions";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const UserContext = createContext<UserInterface>(null!);

export const UserInfo = (): UserInterface => useContext(UserContext);

export const isAuthorized = (
  authorizedPermissions: UserPermission[]
): boolean =>
  UserInfo().permissions.some(
    (permission) =>
      permission.name === UserPermission.SuperUser ||
      Object.values<string>(authorizedPermissions).includes(permission.name)
  );

export default UserContext;
