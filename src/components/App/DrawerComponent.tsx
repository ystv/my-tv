import {
  Button,
  Center,
  CloseButton,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Box,
  Divider,
} from "@chakra-ui/react";
import { DrawerContents } from "./DrawerContents";
import React, { useContext, useRef } from "react";
import { useUserContext } from "../../App";
import { ReactComponent as YSTVLogoIcon } from "../YSTV_LIGHT.svg";

interface Props {
  drawerOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  window?: () => Window;
}

export default function DrawerComponent({ drawerOpenState, window }: Props) {
  const userContext = useContext(useUserContext);
  const [drawerOpen, setDrawerOpen] = drawerOpenState;
  const closeDrawerRef = useRef(null);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const drawerArrow = (
    <>
      <Flex direction={"row"} padding={"0 1rem"} align={"center"}>
        <Box w={"32px"} />
        <Center h={"4rem"} flexGrow={1}>
          <YSTVLogoIcon height="2.5rem" fill={"#333333"} />
        </Center>

        <CloseButton onClick={handleDrawerClose} ref={closeDrawerRef} />
      </Flex>
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
    </>
  );
}
