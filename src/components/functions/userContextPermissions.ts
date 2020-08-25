import { userInterface } from "../types/people";
import "../types/permissions";
import { userRoles } from "../types/permissions";

export default function userContextPermissions(
  user: userInterface | undefined,
  allowedPermIDs?: [userRoles]
) {
  var allowed = false;
  if (user !== undefined) {
    user.permissions.map((x) => {
      if (x.name == userRoles.SuperUser) {
        allowed = true;
      }
      try {
        if (allowedPermIDs !== undefined) {
          allowedPermIDs.map((y) => {
            if (x.name == y) {
              allowed = true;
            }
          });
        }
      } catch {}
    });
  }
  return allowed;
}
