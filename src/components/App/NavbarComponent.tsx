import { Link as RouterLink } from "react-router-dom";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import clsx from "clsx";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Zoom,
  Menu as MenuParent,
  MenuItem,
  Link,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import React, { useContext } from "react";
import { useUserContext } from "../../App";

export default function NavbarComponent(props: {
  classes: ClassNameMap<
    | "drawerClose"
    | "grow"
    | "drawer"
    | "logoBox"
    | "sectionDesktop"
    | "title"
    | "drawerPaper"
    | "nested"
    | "content"
    | "inputInput"
    | "toolbar"
    | "inputRoot"
    | "hide"
    | "appBar"
    | "root"
    | "menuButton"
    | "sectionMobile"
    | "drawerOpen"
    | "appBarShift"
  >;
  drawerOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}) {
  const userContext = useContext(useUserContext);
  const [drawOpen, setDrawerOpen] = props.drawerOpenState;

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

  const [profileImageLoaded, setProfileImageLoaded] = React.useState(false);

  return (
    <AppBar
      position="fixed"
      className={clsx(props.classes.appBar, {
        [props.classes.appBarShift]: drawOpen,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(props.classes.menuButton, {
            [props.classes.hide]: drawOpen,
          })}
        >
          <Menu />
        </IconButton>
        <IconButton color="inherit" edge="start" component={RouterLink} to="/">
          <Typography variant="h5" noWrap>
            My-TV
          </Typography>
        </IconButton>
        <div className={props.classes.grow} />

        <Typography variant="subtitle2" style={{ paddingRight: "1rem" }}>
          Build:{" "}
          {process.env.REACT_APP_BUILD_ID !== undefined
            ? process.env.REACT_APP_BUILD_ID
            : "Local"}
        </Typography>
        <IconButton color="inherit" onClick={handleAvatarClick} edge="start">
          <Zoom in={profileImageLoaded || userContext.avatar == null}>
            <Avatar
              src={userContext.avatar}
              imgProps={{ onLoad: () => setProfileImageLoaded(true) }}
            >
              {userContext.firstName
                .charAt(0)
                .concat(userContext.lastName.charAt(0))}
            </Avatar>
          </Zoom>
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
            href={`${process.env.REACT_APP_SECURITY_ENDPOINT}/logout`}
            color="inherit"
          >
            Logout
          </MenuItem>
        </MenuParent>
      </Toolbar>
    </AppBar>
  );
}
