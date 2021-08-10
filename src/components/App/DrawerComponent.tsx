import { Divider, Drawer, Hidden, IconButton } from "@material-ui/core";
import { Box, Center } from "@chakra-ui/react";
import clsx from "clsx";
import { DrawerContents } from "./DrawerContents";
import React, { useContext } from "react";
import { useUserContext } from "../../App";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import { useTheme } from "@material-ui/core/styles";
import { NavbarStyles } from "./NavbarStyles";

interface Props {
  drawerOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  window?: () => Window;
}

export default function DrawerComponent({ drawerOpenState, window }: Props) {
  const classes = NavbarStyles();
  const userContext = useContext(useUserContext);
  const theme = useTheme();
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [drawOpen, setDrawerOpen] = drawerOpenState;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleCollapseClick = () => {
    setCollapseOpen(!collapseOpen);
  };

  const drawerArrow = (
    <>
      <div className={classes.toolbar}>
        <Center>
          <a
            href={process.env.REACT_APP_PUBLIC_BASEURL}
            className={classes.logoBox}
          >
            <img
              src="/ystv.png"
              style={{
                height: "inherit",
                filter: "opacity(0.65)",
                translate: "-36px 4px",
              }}
              alt="YSTV logo"
            />
          </a>
        </Center>

        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </div>
      <Divider />
    </>
  );

  return (
    <nav className={classes.drawer}>
      <Hidden xsDown>
        {
          //desktop version
        }
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: drawOpen,
            [classes.drawerClose]: !drawOpen,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: drawOpen,
              [classes.drawerClose]: !drawOpen,
            }),
          }}
          hideBackdrop
        >
          {drawerArrow}
          <DrawerContents
            handleCollapseClick={handleCollapseClick}
            collapseOpen={collapseOpen}
            handleDrawerClose={handleDrawerClose}
            userContext={userContext}
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
          open={drawOpen}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawerArrow}
          <DrawerContents
            handleCollapseClick={handleCollapseClick}
            collapseOpen={collapseOpen}
            handleDrawerClose={handleDrawerClose}
            userContext={userContext}
          />
        </Drawer>
      </Hidden>
    </nav>
  );
}
