import React from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

import {
  Link,
  Tooltip,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

export interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
  className?: string;
  disabled?: boolean;
}

export function ListItemRRLink(props: ListItemLinkProps) {
  const { icon, primary, to, className, disabled } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, "to">>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <Tooltip title={primary} placement="right">
        <ListItem
          button
          component={renderLink}
          /*onClick={handleDrawerCloseOnLink}*/
          className={className ? className : ""}
          disabled={disabled}
        >
          {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
          <ListItemText primary={primary} />
        </ListItem>
      </Tooltip>
    </li>
  );
}

export function ListItemLink(props: ListItemLinkProps) {
  var { icon, primary, to, disabled } = props;

  function handleLinkClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    if (disabled) {
      e.preventDefault();
    }
  }

  return (
    <Link
      href={to}
      color="inherit"
      style={{ textDecoration: "inherit" }}
      onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
        handleLinkClick(e)
      }
    >
      <Tooltip title={primary} placement="right">
        <ListItem button disabled={disabled}>
          {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
          <ListItemText primary={primary} />
        </ListItem>
      </Tooltip>
    </Link>
  );
}
