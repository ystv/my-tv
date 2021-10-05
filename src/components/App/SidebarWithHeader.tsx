// React Imports
import React, { ReactNode, ReactText } from "react";

// MUI components

import {
  VStack,
  useDisclosure,
  Box,
  Drawer,
  useColorModeValue,
  Flex,
  Text,
  CloseButton,
  IconButton,
  HStack,
  MenuItem,
  MenuList,
  MenuDivider,
  Menu,
  MenuButton,
  FlexProps,
  BoxProps,
  Avatar,
  DrawerContent,
} from "@chakra-ui/react";

import {
  FiHome,
  FiBell,
  FiChevronDown,
  FiAlignCenter,
  FiVideo,
  FiMail,
  FiClipboard,
  FiKey,
  FiTv,
  FiSlack,
  FiBook,
  FiMessageCircle,
  FiTrello,
} from "react-icons/fi";

// import userContextPermissions from "../functions/userContextPermissions";
import { Icon } from "@chakra-ui/icons";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface LinkItemProps {
  icon?: IconType;
  name: string;
  to: string;
  external: boolean;
}

const LinkItems: Array<LinkItemProps> = [
  {
    name: "Home",
    icon: FiHome,
    to: "/",
    external: false,
  },
  {
    name: "Slack",
    icon: FiSlack,
    to: "https://ystv.slack.com",
    external: true,
  },
  {
    name: "Trello",
    icon: FiTrello,
    to: "https://trello.com/ystv",
    external: true,
  },
  {
    name: "Quotes Board",
    icon: FiAlignCenter,
    to: "/quotes",
    external: false,
  },
  {
    name: "Webcams",
    icon: FiVideo,
    to: "/webcams",
    external: false,
  },
  {
    name: "Webmail",
    icon: FiMail,
    to: "https://webmail.ystv.co.uk",
    external: true,
  },
  {
    name: "Equipment Booking",
    icon: FiClipboard,
    to: "https://dash.adam-rms.com",
    external: true,
  },
  {
    name: "Vault",
    icon: FiKey,
    to: "https://vault.ystv.co.uk",
    external: true,
  },
  {
    name: "Creator Studio",
    icon: FiTv,
    to: `${process.env.REACT_ENV_CREATOR_BASEURL}`,
    external: true,
  },
  {
    name: "History Wiki",
    icon: FiBook,
    to: "https://wiki.ystv.co.uk",
    external: true,
  },
  {
    name: "Documentation Wiki",
    icon: FiBook,
    to: "https://docs.ystv.co.uk",
    external: true,
  },
  {
    name: "Welcome Pages",
    icon: FiBook,
    to: "https://welcome.ystv.co.uk",
    external: true,
  },
  {
    name: "Tech Blog",
    icon: FiMessageCircle,
    to: "https://medium.com/ystv",
    external: true,
  },
  {
    name: "Constitution & Policy",
    icon: FiBook,
    to: "https://docs.ystv.co.uk/wiki/YSTV_Constitution",
    external: true,
  },
];

interface NavItemProps extends FlexProps {
  // eslint-disable-next-line react/require-default-props
  icon?: IconType;
  to: string;
  external: boolean;
  children: ReactText;
}

const NavItem = ({ icon, to, external, children, ...rest }: NavItemProps) =>
  external ? (
    <a rel="noreferrer" href={to}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{ bg: "cyan.400", color: "white" }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{ color: "white" }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </a>
  ) : (
    <Link to={to} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{ bg: "cyan.400", color: "white" }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{ color: "white" }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );

interface SidebarProps extends BoxProps {
  onClose: () => void;
  // userContext: userInterface;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => (
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
    <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
      <Text fontSize="2x1" fontWeight="bold">
        MyTV
      </Text>
      <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
    </Flex>
    {LinkItems.map((link) => (
      <NavItem
        key={link.name}
        icon={link.icon}
        to={link.to}
        external={link.external}
      >
        {link.name}
      </NavItem>
    ))}
  </Box>
);

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => (
  <Flex
    ml={{ base: 0, md: 60 }}
    px={{ base: 4, md: 4 }}
    height="20"
    alignItems="center"
    bg={useColorModeValue("white", "gray.900")}
    borderBottomWidth="1px"
    borderBottomColor={useColorModeValue("gray.200", "gray.700")}
    justifyContent={{ base: "space-between", md: "flex-end" }}
    {...rest}
  >
    <IconButton
      display={{ base: "flex", md: "none" }}
      onClick={onOpen}
      variant="outline"
      aria-label="open menu"
    />

    <Text
      display={{ base: "flex", md: "none" }}
      fontSize="2xl"
      fontWeight="bold"
    >
      MyTV
    </Text>

    <HStack spacing={{ base: "0", md: "6" }}>
      <IconButton
        size="lg"
        variant="ghost"
        aria-label="open menu"
        icon={<FiBell />}
      />
      <Flex alignItems="center">
        <Menu>
          <MenuButton
            py={2}
            transition="all 0.3s"
            _focus={{ boxShadow: "none" }}
          >
            <HStack>
              <Avatar
                size="sm"
                src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
              />
              <VStack
                display={{ base: "none", md: "flex" }}
                alignItems="flex-start"
                spacing="1px"
                ml="2"
              >
                <Text fontSize="sm">Justina Clark</Text>
                <Text fontSize="xs" color="gray.600">
                  Admin
                </Text>
              </VStack>
              <Box display={{ base: "none", md: "flex" }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList
            bg={useColorModeValue("white", "gray.900")}
            borderColor={useColorModeValue("gray.200", "gray.700")}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuDivider />
            <MenuItem>Sign out</MenuItem>
            <Text fontStyle="italic">v1.5.2 (#54)</Text>
          </MenuList>
        </Menu>
      </Flex>
    </HStack>
  </Flex>
);

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* Mobile nav */}
      <MobileNav onOpen={onOpen} />
      <main style={{ padding: "0 2rem" }}>
        <Box height="4rem" />
        <br />
        <Box ml={{ base: 0, md: 60 }} p="4">
          {children}
        </Box>
        <div className="spacer2" />
      </main>
    </Box>
  );
}
