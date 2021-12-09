import React, { ReactText } from "react";
import { Flex, FlexProps, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface NavItemProps extends FlexProps {
  // eslint-disable-next-line react/require-default-props
  icon?: IconType;
  to: string;
  external: boolean;
  onClick: () => void;
  children: ReactText;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  to,
  external,
  onClick,
  children,
  ...rest
}): JSX.Element =>
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
    <Link to={to} style={{ textDecoration: "none" }} onClick={onClick}>
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

export default NavItem;
