// React Imports
import { useContext, ReactNode } from "react";
import { Route } from "react-router-dom";

// MUI components

// Custom Components
import userContextPermissions from "./functions/userContextPermissions";
import { userRoles } from "./types/permissions";
import { useUserContext } from "../App";

// Type imports

// Other imports

// Begin Code

interface RouteWithPermsProps {
  path: string;
  allowedPermIDs?: userRoles[];
  children: ReactNode;
}

export default function RouteWithPerms({
  allowedPermIDs,
  children,
  path,
}: RouteWithPermsProps) {
  const userContext = useContext(useUserContext);
  const permission = userContextPermissions(userContext, allowedPermIDs);
  console.log(`allowed ${permission} from ${allowedPermIDs},SuperUser`);

  return (
    <Route exact path={path}>
      {permission ? children : (window.location.href = "/301")}
    </Route>
  );
}
