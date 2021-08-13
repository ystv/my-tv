// React Imports
import { ReactElement } from "react";
import { Link as RouterLink } from "react-router-dom";

// MUI components

import { Button, Link, VStack, Divider } from "@chakra-ui/react";

import {
  Mail,
  Today,
  FormatQuoteRounded,
  VideocamRounded,
  SecurityRounded,
  BookmarksRounded,
  AssignmentRounded,
  History,
  DescriptionRounded,
  GavelRounded,
  NoteAddRounded,
} from "@material-ui/icons";
import { ReactComponent as YSTVLogoIcon } from "../YSTV_LIGHT.svg";

// import userContextPermissions from "../functions/userContextPermissions";
import { userInterface } from "../types/people";
import { Icon } from "@chakra-ui/icons";

interface ListItemLinkProps {
  icon?:
    | ReactElement<any, string | React.JSXElementConstructor<any>>
    | undefined;
  primary: string;
  to: string;
  className?: string;
  disabled?: boolean;
  router?: boolean;
}

interface drawerContentsProps {
  handleDrawerClose: (e: any) => void;
  userContext: userInterface;
}

export function DrawerContents({
  handleDrawerClose,
  userContext,
}: drawerContentsProps) {
  function ListItemLink(props: ListItemLinkProps) {
    const { to, router = false } = props;

    return (
      // <Tooltip label={primary} placement="auto-start">
      router ? (
        <RouterLink to={to} style={{ width: "100%" }}>
          {ListItemButton(props)}
        </RouterLink>
      ) : (
        <Link href={to} style={{ width: "100%" }}>
          {ListItemButton(props)}
        </Link>
      )
      // </Tooltip>
    );
  }

  function ListItemButton(props: ListItemLinkProps) {
    const { icon, primary, className, disabled = false } = props;
    return (
      <Button
        onClick={handleDrawerClose}
        className={className ? className : ""}
        disabled={disabled}
        leftIcon={icon}
        borderRadius={0}
        isFullWidth={true}
        variant={"ghost"}
        justifyContent={"right"}
        iconSpacing={"30px"}
      >
        {primary}
      </Button>
    );
  }

  return (
    <>
      <VStack>
        <ListItemLink
          to="/calendar"
          primary="Calendar"
          icon={<Today />}
          router
        />
        <ListItemLink
          to="/quotes"
          primary="Quotes"
          icon={<FormatQuoteRounded />}
          router
        />
        <ListItemLink
          to="/webcams"
          primary="Webcams"
          icon={<VideocamRounded />}
          router
        />
        <ListItemLink
          to="https://webmail.ystv.co.uk"
          primary="Email"
          icon={<Mail />}
        />
        <ListItemLink
          to="https://dash.adam-rms.com/"
          primary="Equipment Booking"
          icon={<BookmarksRounded />}
        />
        <ListItemLink
          to="https://vault.ystv.co.uk"
          primary="Vault"
          icon={<SecurityRounded />}
        />
        <ListItemLink
          to={`${process.env.REACT_APP_PUBLIC_BASEURL}`}
          primary="Main Site"
          icon={<Icon w={"1.5em"} fill={"current"} as={YSTVLogoIcon} />}
        />
        <Divider />
        {/*<ListItemLink*/}
        {/*  to={`${process.env.REACT_APP_CREATOR_BASEURL}`}*/}
        {/*  primary="Creator Studio"*/}
        {/*  icon={<VideoLibraryRounded />}*/}
        {/*/>*/}
        {/*<Divider />*/}
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
          to="https://welcome.ystv.co.uk"
          primary="Welcome Pages"
          icon={<NoteAddRounded />}
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
      </VStack>
      {/*{userContextPermissions(userContext, []) && (*/}
      {/*  <>*/}
      {/*    <ListItem button>*/}
      {/*      <ListItemIcon>*/}
      {/*        <SupervisorAccountRounded />*/}
      {/*      </ListItemIcon>*/}
      {/*      <ListItemText primary="Society Admin" />*/}
      {/*      {collapseOpen ? <ExpandLess /> : <ExpandMore />}*/}
      {/*    </ListItem>*/}
      {/*    <Collapse in={collapseOpen} timeout="auto" unmountOnExit>*/}
      {/*      <List>*/}
      {/*        <ListItemLink*/}
      {/*          to="http://auth.ystv.co.uk/internal/users"*/}
      {/*          primary="Members"*/}
      {/*          icon={<People />}*/}
      {/*          className={classes.nested}*/}
      {/*        />*/}
      {/*        <ListItemLink*/}
      {/*          to="/key_list"*/}
      {/*          primary="Key List"*/}
      {/*          icon={<VpnKeyRounded />}*/}
      {/*          className={classes.nested}*/}
      {/*          router*/}
      {/*          disabled*/}
      {/*        />*/}
      {/*        <ListItemLink*/}
      {/*          to="/roles"*/}
      {/*          primary="Officer Roles"*/}
      {/*          icon={<SupervisedUserCircleRounded />}*/}
      {/*          className={classes.nested}*/}
      {/*          router*/}
      {/*          disabled*/}
      {/*        />*/}
      {/*        <ListItemLink*/}
      {/*          to="/mailing-lists"*/}
      {/*          primary="Mailing Lists"*/}
      {/*          icon={<AllInbox />}*/}
      {/*          className={classes.nested}*/}
      {/*          disabled*/}
      {/*        />*/}
      {/*        <ListItemLink*/}
      {/*          to="/hire-prices"*/}
      {/*          primary="Hire Prices"*/}
      {/*          icon={<MonetizationOn />}*/}
      {/*          className={classes.nested}*/}
      {/*          disabled*/}
      {/*        />*/}
      {/*      </List>*/}
      {/*    </Collapse>*/}
      {/*  </>*/}
      {/*)}*/}
      {/*<div className="spacer2" />*/}
    </>
  );
}
