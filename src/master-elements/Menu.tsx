// React Imports
import React from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

// MUI components
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";

import {
  Drawer,
  AppBar,
  Toolbar,
  Hidden,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  Avatar,
  Box,
  Zoom,
  Menu as MenuParent,
  MenuItem,
  Link,
} from "@material-ui/core";

import { Menu, ChevronLeft, ChevronRight, Settings } from "@material-ui/icons";

// Custom Components

// Type imports

// Other imports
import clsx from "clsx";
import { DrawerContents } from "./DrawerContents";

// Begin Code

/// Navbar/Drawer Styling

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    hide: {
      display: "none",
    },
    drawer: {
      maxWidth: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      overflowWrap: "break-word",
      width: drawerWidth,
      minHeight: "100vh",
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    drawerPaper: {},
    nested: {
      paddingLeft: theme.spacing(4),
    },
    logoBox: {
      height: "40px",
      width: "100%",
      textAlign: "center",
    },
  })
);

/// Navabar/Drawer Mega-Component

interface Props {
  window?: () => Window;
  children?: React.ReactNode;
  initials: String;
  profilePhoto?: string | "";
}

export default function NavbarWithDrawer(props: Props) {
  /// Declarations
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [
    profileAnchorEl,
    setProfileAnchorEl,
  ] = React.useState<null | HTMLElement>(null);

  /// Handler Functions

  const handleCollapseClick = () => {
    setCollapseOpen(!collapseOpen);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSettingsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    return 0;
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  /// Contents of side drawer

  const drawerArrow = (
    <>
      <div className={classes.toolbar}>
        <Box className={classes.logoBox}>
          <img
            src="/ystv.png"
            style={{
              height: "inherit",
              filter: "opacity(0.65)",
              translate: "24",
            }}
            alt="YSTV logo"
          ></img>
        </Box>

        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </div>
      <Divider />
    </>
  );

  const [profileImageLoaded, setProfileImageLoaded] = React.useState(false);

  /// Menu and Drawer Component Master Return

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <Menu />
          </IconButton>
          <IconButton
            color="inherit"
            edge="start"
            component={RouterLink}
            to="/"
          >
            <Typography variant="h5" noWrap>
              My-TV
            </Typography>
          </IconButton>
          <div className={classes.grow} />

          <Typography variant="subtitle2" style={{ paddingRight: "1rem" }}>
            Build:{" "}
            {process.env.REACT_APP_BUILD_ID !== undefined
              ? process.env.REACT_APP_BUILD_ID
              : "Local"}
          </Typography>
          {/* <IconButton
            color="inherit"
            onClick={handleSettingsMenuOpen}
            edge="start"
            disabled
          >
            <Settings />
          </IconButton> */}
          <IconButton color="inherit" onClick={handleAvatarClick} edge="start">
            <Zoom in={profileImageLoaded}>
              <Avatar
                src={props.profilePhoto}
                imgProps={{ onLoad: () => setProfileImageLoaded(true) }}
              >
                {props.initials}
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
            >
              Profile
            </MenuItem>
            <MenuItem onClick={handleProfileClose}>
              <Link
                href={`${process.env.REACT_APP_SECURITY_ENDPOINT}/logout`}
                color="inherit"
              >
                Logout
              </Link>
            </MenuItem>
          </MenuParent>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden xsDown>
          {
            //desktop version
          }
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
          >
            {drawerArrow}
            <DrawerContents
              handleCollapseClick={handleCollapseClick}
              collapseOpen={collapseOpen}
              handleDrawerClose={handleDrawerClose}
            />
          </Drawer>
        </Hidden>
        <Hidden smUp>
          {
            //mobile version
          }
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={open}
            onClose={handleDrawerClose}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawerArrow}
            <DrawerContents
              handleCollapseClick={handleCollapseClick}
              collapseOpen={collapseOpen}
              handleDrawerClose={handleDrawerClose}
            />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <br />
        {
          /// THIS IS WHERE THE PAGE CONTENT GOES
          props.children
        }
      </main>
    </div>
  );
}
