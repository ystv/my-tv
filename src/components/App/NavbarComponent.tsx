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
import React, { useContext } from "react";
import { useUserContext } from "../../App";
import {
  Heading,
  Text,
  Avatar,
  Button,
  IconButton as CIconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function NavbarComponent(props: {
  drawerOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}) {
  const userContext = useContext(useUserContext);
  const [drawOpen, setDrawerOpen] = props.drawerOpenState;
  const classes = NavbarStyles();
  const { toggleColorMode } = useColorMode();
  const colourModeIcon = useColorModeValue(<MoonIcon />, <SunIcon />);

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
        <CIconButton
          onClick={handleDrawerOpen}
          hidden={drawOpen}
          icon={<HamburgerIcon />}
          aria-label={"Open main menu"}
          variant={"ghost"}
          colorScheme={"white"}
          _hover={{ background: "whiteAlpha.300" }}
        />
        <Button
          as={RouterLink}
          to="/"
          variant={"ghost"}
          colorScheme={"white"}
          _hover={{ background: "whiteAlpha.300" }}
        >
          <Heading size={"lg"}>My-TV</Heading>
        </Button>
        <div className={classes.grow} />

        <CIconButton
          onClick={toggleColorMode}
          icon={colourModeIcon}
          aria-label={"Toggle colour"}
          variant={"ghost"}
          colorScheme={"white"}
          _hover={{ background: "whiteAlpha.300" }}
          mr={2}
        />

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
