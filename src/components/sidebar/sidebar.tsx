import React from "react";
import {
  BoxProps,
  Box,
  Flex,
  Text,
  CloseButton,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { FiTv } from "react-icons/fi";
import Items from "./items";
import NavItem from "./nav-item";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose, ...rest }) => (
  <Box
    transition="3s ease"
    bg={useColorModeValue("white", "gray.900")}
    borderRight="1px"
    borderRightColor={useColorModeValue("gray.200", "gray.700")}
    w={{ base: "full", md: 60 }}
    pos="fixed"
    h="full"
    {...rest}
  >
    <Flex h="20" alignItems="center" mx="8">
      <Icon fontSize="5xl" _groupHover={{ color: "white" }} as={FiTv} />
      <Text ms="1" fontSize="4xl" fontWeight="semibold">
        mytv
      </Text>
      <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
    </Flex>
    {Items.map((link) => (
      <NavItem
        key={link.name}
        icon={link.icon}
        to={link.to}
        onClick={onClose}
        external={link.external}
      >
        {link.name}
      </NavItem>
    ))}
  </Box>
);

export default Sidebar;
