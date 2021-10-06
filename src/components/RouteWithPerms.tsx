import React, { useEffect, useState } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import getToken from "../api/auth";
import APIToken from "./types/apiToken";

interface AuthProps extends RouteProps {
  requiredRoles?: string[];
}

const AuthRoute: React.FC<AuthProps> = (props): JSX.Element => {
  const [token, setToken] = useState<APIToken | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      getToken()
        .then((gotToken) => {
          setToken(gotToken);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    getData();
  }, []);

  if (!isLoading) {
    if (token === null) {
      return <Redirect to="/login" />;
    }

    let reqRoles: string[];
    // if a reqRole wasn't given, default to all
    if (props.requiredRoles) {
      reqRoles = props.requiredRoles;
    } else {
      reqRoles = [""];
    }

    const userHasRequiredRole = token?.perms.some((permission) =>
      reqRoles.includes(permission.name)
    );
    const message = "Unauthorized";
    if (userHasRequiredRole || reqRoles === [""]) {
      return <Route />;
    }
    return (
      <Redirect
        to={{
          pathname: "/unauthorized",
          state: {
            message,
            requestedPath: props.path,
          },
        }}
      />
    );
  }

  return <h1>Loading</h1>;
};

export default AuthRoute;
