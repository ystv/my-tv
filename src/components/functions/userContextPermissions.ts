import { userInterface } from "../types/people";
import "../types/permissions";
import { userRoles } from "../types/permissions";

export default function userContextPermissions(
  user: userInterface | undefined,
  allowedPermIDs?: userRoles[]
) {
  var allowed = false;
  if (user !== undefined) {
    user.permissions.forEach((x) => {
      if (x.name === userRoles.SuperUser) {
        allowed = true;
        console.log(x.name);
      } else {
        try {
          if (allowedPermIDs !== undefined) {
            allowedPermIDs.forEach((y) => {
              if (x.name === y) {
                allowed = true;
                console.log(y);
              }
            });
          }
        } catch {}
      }
    });
  }
  return allowed;
}
