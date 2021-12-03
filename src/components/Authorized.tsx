import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthorized } from "./contexts/userContext";
import UserPermission from "./types/permissions";

interface AuthProps {
  requiredPermissions: UserPermission[];
  children: JSX.Element;
}

const Authorized = ({
  requiredPermissions,
  children,
}: AuthProps): JSX.Element =>
  isAuthorized(requiredPermissions) ? (
    children
  ) : (
    <Navigate to="/unauthorized" />
  );

export default Authorized;
