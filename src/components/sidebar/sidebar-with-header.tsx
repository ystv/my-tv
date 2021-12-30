import React from "react";
import {
  useDisclosure,
  Box,
  Drawer,
  useColorModeValue,
  DrawerContent,
  useBreakpointValue,
} from "@chakra-ui/react";
import Sidebar from "./sidebar";
import Header from "./header";

const SidebarWithHeader: React.FC = ({ children }): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <Sidebar onClose={onClose} display={{ base: "none", md: "block" }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen && (isMobile ?? false)}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Header onOpen={onOpen} style={{ position: "sticky", top: 0 }} />
      <main style={{ padding: "0 2rem" }}>
        <Box ml={{ base: 0, md: 60 }} p="4">
          {children}
        </Box>
        <div className="spacer2" />
      </main>
    </Box>
  );
};

export default SidebarWithHeader;
