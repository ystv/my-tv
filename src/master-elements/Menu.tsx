/// Import Components

import React from "react";
import clsx from "clsx";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Link from "@material-ui/core/Link";
import Hidden from "@material-ui/core/Hidden";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

/// Import Icons

import {
  ExpandLess,
  ExpandMore,
  Menu,
  ChevronLeft,
  ChevronRight,
  Mail,
  Settings,
  AllInbox,
  SupervisorAccountRounded,
  MonetizationOn,
  People,
  Storefront,
  AccountBox,
  Today,
  FormatQuoteRounded,
  VideocamRounded,
  SecurityRounded,
  BookmarksRounded,
  AssignmentRounded,
  VideoLibraryRounded,
  History,
  DescriptionRounded,
  GavelRounded,
} from "@material-ui/icons";

import ystv from "../assets/ystv.png";

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
}

export default function MiniDrawer(props: Props) {
  /// Declarations
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  /// Handler Functions

  const handleCollapseClick = () => {
    setCollapseOpen(!collapseOpen);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
    setMobileOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setMobileOpen(false);
  };

  const handleDrawerCloseOnLink = () => {
    setMobileOpen(false);
  };

  const handleSettingsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    return 0;
  };

  const handleLogoutClick = (event: React.MouseEvent<HTMLElement>) => {
    return 0;
  };

  /// Contents of side drawer

  const drawerArrow = (
    <>
      <div className={classes.toolbar}>
        <Box className={classes.logoBox}>
          <img
            src={ystv}
            style={{
              height: "inherit",
              filter: "opacity(0.6)",
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

  const drawerContents = (
    <>
      <List>
        <ListItemRRLink to="/calendar" primary="Calendar" icon={<Today />} />
        <ListItemRRLink
          to="/quotes"
          primary="Quotes"
          icon={<FormatQuoteRounded />}
        />
        <ListItemRRLink
          to="/webcams"
          primary="Webcams"
          icon={<VideocamRounded />}
        />
        <ListItemLink
          to="http://webmail.ystv.co.uk"
          primary="Email"
          icon={<Mail />}
        />
        <ListItemLink
          to="http://ystv.co.uk/hires"
          primary="Equipment Booking"
          icon={<BookmarksRounded />}
        />
        <ListItemRRLink
          to="/vault"
          primary="Vault"
          icon={<SecurityRounded />}
        />
      </List>
      <Divider />
      <List>
        <ListItemLink
          to="http://ystv.co.uk"
          primary="CStudio"
          icon={<VideoLibraryRounded />}
        />
      </List>
      <Divider />
      <List>
        <ListItemLink
          to="http://wiki.ystv.co.uk"
          primary="History Wiki"
          icon={<History />}
        />
        <ListItemLink
          to="http://docs.ystv.co.uk"
          primary="Docs Wiki"
          icon={<DescriptionRounded />}
        />
        <ListItemLink
          to="https://medium.com/ystv"
          primary="Tech Blog"
          icon={<AssignmentRounded />}
        />
        <ListItemLink
          to="https://docs.ystv.co.uk/wiki/YSTV_Constitution"
          primary="Constitution & Policy"
          icon={<GavelRounded />}
        />
      </List>
      <Divider />
      <List>
        <ListItemRRLink to="/merch" primary="Merch" icon={<Storefront />} />
        <ListItemRRLink
          to="/accounts"
          primary="Social Accounts"
          icon={<AccountBox />}
        />
      </List>
      <Divider />
      <ListItem button onClick={handleCollapseClick}>
        <ListItemIcon>
          <SupervisorAccountRounded />
        </ListItemIcon>
        <ListItemText primary="Society Admin" />
        {collapseOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
        <List>
          <ListItemRRLink
            to="/members"
            primary="Members"
            icon={<People />}
            className={classes.nested}
          />
          <ListItemRRLink
            to="/mailing-lists"
            primary="Mailing Lists"
            icon={<AllInbox />}
            className={classes.nested}
          />
          <ListItemRRLink
            to="/hire-prices"
            primary="Hire Prices"
            icon={<MonetizationOn />}
            className={classes.nested}
          />
        </List>
      </Collapse>
    </>
  );

  /// Special React Router and Standard Buttons with links Prop

  interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
    className?: string;
  }

  function ListItemRRLink(props: ListItemLinkProps) {
    const { icon, primary, to, className } = props;

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
            onClick={handleDrawerCloseOnLink}
            className={className ? className : ""}
          >
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
            <ListItemText primary={primary} />
          </ListItem>
        </Tooltip>
      </li>
    );
  }

  function ListItemLink(props: ListItemLinkProps) {
    const { icon, primary, to } = props;

    return (
      <Link href={to} color="inherit" style={{ textDecoration: "inherit" }}>
        <Tooltip title={primary} placement="right">
          <ListItem button>
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
            <ListItemText primary={primary} />
          </ListItem>
        </Tooltip>
      </Link>
    );
  }

  /// Special YSTV Logo Component

  function TitleReactLink() {
    const renderLink = React.useMemo(
      () =>
        React.forwardRef<any, Omit<RouterLinkProps, "to">>((itemProps, ref) => (
          <RouterLink to={"/"} ref={ref} {...itemProps} />
        )),
      []
    );

    return (
      <IconButton color="inherit" edge="start" component={renderLink}>
        <Typography variant="h5" noWrap>
          My-TV
        </Typography>
      </IconButton>
    );
  }

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
          <TitleReactLink />
          <div className={classes.grow} />
          <IconButton
            color="inherit"
            onClick={handleSettingsMenuOpen}
            edge="start"
          >
            <Settings />
          </IconButton>
          <IconButton color="inherit" onClick={handleLogoutClick} edge="start">
            <Avatar>BA</Avatar>
          </IconButton>
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
            {drawerContents}
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
            open={mobileOpen}
            onClose={handleDrawerClose}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawerArrow}
            {drawerContents}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {
          /// THIS IS WHERE THE PAGE CONTENT GOES
          props.children
        }
      </main>
    </div>
  );
}
