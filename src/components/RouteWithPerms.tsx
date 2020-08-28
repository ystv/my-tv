// React Imports
import React from "react";
import { Route } from "react-router-dom";

// MUI components

// Custom Components
import userContextPermissions from "./functions/userContextPermissions";
import { userInterface } from "./types/people";
import { userRoles } from "./types/permissions";

// Type imports

// Other imports

// Begin Code

interface RouteWithPermsProps {
  path: string;
  user: userInterface;
  allowedPermIDs?: userRoles[];
  children: React.ReactNode;
}

export default function RouteWithPerms(props: RouteWithPermsProps) {
  const permission = userContextPermissions(props.user, props.allowedPermIDs);
  console.log(`allowed ${permission} from ${props.allowedPermIDs},SuperUser`);

  return (
    <Route exact path={props.path}>
      {permission ? props.children : (window.location.href = "/301")}
    </Route>
  );
}
