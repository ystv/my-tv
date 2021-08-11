import { Divider, Hidden } from "@material-ui/core";
import {
  Button,
  Center,
  CloseButton,
  Menu,
  MenuButton,
  MenuList,
  Drawer,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import { DrawerContents } from "./DrawerContents";
import React, { useContext, useRef } from "react";
import { useUserContext } from "../../App";
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
  const [drawerOpen, setDrawerOpen] = drawerOpenState;
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const closeDrawerRef = useRef(null);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const drawerArrow = (
    <>
      <div className={classes.toolbar}>
        <Center w={"240px"}>
          <a href={process.env.REACT_APP_PUBLIC_BASEURL}>
            <img
              src="/ystv.png"
              style={{
                filter: "opacity(0.65)",
                height: "40px",
              }}
              alt="YSTV logo"
            />
          </a>
        </Center>

        <CloseButton onClick={handleDrawerClose} ref={closeDrawerRef} />
      </div>
      <Divider />
      <br />
    </>
  );

  return (
    <>
      {/*<nav className={classes.drawer}>*/}
      {/*<Hidden xsDown>*/}
      {/*  {*/}
      {/*    //desktop version*/}
      {/*  }*/}
      {/*  <Menu isOpen={drawerOpen}>*/}
      {/*    <MenuButton as={Button} onClick={() => setDrawerOpen(!drawerOpen)}>*/}
      {/*      Menu*/}
      {/*    </MenuButton>*/}
      {/*    <MenuList>*/}
      {/*      <DrawerContents*/}
      {/*        handleDrawerClose={handleDrawerClose}*/}
      {/*        userContext={userContext}*/}
      {/*      />*/}
      {/*    </MenuList>*/}
      {/*  </Menu>*/}
      {/*</Hidden>*/}
      {/*<Hidden smUp>*/}
      {
        //mobile version
      }
      {/*<Drawer*/}
      {/*  container={container}*/}
      {/*  variant="temporary"*/}
      {/*  anchor={theme.direction === "rtl" ? "right" : "left"}*/}
      {/*  open={drawerOpen}*/}
      {/*  onClose={handleDrawerClose}*/}
      {/*  ModalProps={{*/}
      {/*    keepMounted: true, // Better open performance on mobile.*/}
      {/*  }}*/}
      {/*>*/}
      <Drawer
        isOpen={drawerOpen}
        placement="left"
        onClose={() => setDrawerOpen(false)}
        size={"xs"}
        initialFocusRef={closeDrawerRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          {drawerArrow}
          <DrawerContents
            handleDrawerClose={handleDrawerClose}
            userContext={userContext}
          />
        </DrawerContent>
      </Drawer>
      {/*</Drawer>*/}
      {/*</Hidden>*/}
      {/*</nav>*/}
    </>
  );
}
