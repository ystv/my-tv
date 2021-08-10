import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import { NavbarStyles } from "./NavbarStyles";

import {
  AppBar,
  Toolbar,
  IconButton,
  Menu as MenuParent,
  MenuItem,
  Link,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import React, { useContext } from "react";
import { useUserContext } from "../../App";
import { Heading, Text, Avatar } from "@chakra-ui/react";

export default function NavbarComponent(props: {
  drawerOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}) {
  const userContext = useContext(useUserContext);
  const [drawOpen, setDrawerOpen] = props.drawerOpenState;
  const classes = NavbarStyles();

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const [
    profileAnchorEl,
    setProfileAnchorEl,
  ] = React.useState<null | HTMLElement>(null);

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: drawOpen,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: drawOpen,
          })}
        >
          <Menu />
        </IconButton>
        <IconButton color="inherit" edge="start" component={RouterLink} to="/">
          <Heading size={"lg"}>My-TV</Heading>
        </IconButton>
        <div className={classes.grow} />

        <Text fontSize={"sm"} style={{ paddingRight: "1rem" }}>
          Build:{" "}
          {process.env.REACT_APP_BUILD_ID !== undefined
            ? process.env.REACT_APP_BUILD_ID
            : "Local"}
        </Text>
        <IconButton color="inherit" onClick={handleAvatarClick} edge="start">
          <Avatar
            name={`${userContext.firstName} ${userContext.lastName}`}
            src={userContext.avatar}
          />
        </IconButton>
        <MenuParent
          id="simple-menu"
          anchorEl={profileAnchorEl}
          keepMounted
          open={Boolean(profileAnchorEl)}
          onClose={handleProfileClose}
        >
          <MenuItem
            onClick={handleProfileClose}
            component={RouterLink}
            to="/profile"
            disabled
          >
            Profile
          </MenuItem>
          <MenuItem
            onClick={handleProfileClose}
            component={Link}
            href={`${process.env.REACT_APP_SECURITY_BASEURL}/logout`}
            color="inherit"
          >
            Logout
          </MenuItem>
        </MenuParent>
      </Toolbar>
    </AppBar>
  );
}
