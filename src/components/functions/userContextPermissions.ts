import { userInterface } from "../types/people";
import "../types/permissions";
import { userRoles } from "../types/permissions";

export default function userContextPermissions(
  userContext: userInterface | undefined,
  allowedPermIDs?: userRoles[]
) {
  let allowed = false;
  userContext?.permissions?.forEach((x) => {
    if (x.name === userRoles.SuperUser) {
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
      } catch {}
    }
  });
  return allowed;
}
