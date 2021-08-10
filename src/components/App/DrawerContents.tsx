// React Imports
import { ReactElement } from "react";
import { Link as RouterLink } from "react-router-dom";

// MUI components
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import {
  List,
  Divider,
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Button, Link, Tooltip, VStack } from "@chakra-ui/react";

import {
  ExpandLess,
  ExpandMore,
  Mail,
  AllInbox,
  SupervisorAccountRounded,
  MonetizationOn,
  People,
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
  NoteAddRounded,
  SupervisedUserCircleRounded,
  VpnKeyRounded,
} from "@material-ui/icons";

import userContextPermissions from "../functions/userContextPermissions";
import { userInterface } from "../types/people";

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
  handleCollapseClick: (e: any) => void;
  collapseOpen: boolean;
  handleDrawerClose: (e: any) => void;
  userContext: userInterface;
}

export function DrawerContents({
  handleCollapseClick,
  collapseOpen,
  handleDrawerClose,
  userContext,
}: drawerContentsProps) {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      drawerPaper: {},
      nested: {
        paddingLeft: theme.spacing(4),
      },
    })
  );

  const classes = useStyles();

  function ListItemLink(props: ListItemLinkProps) {
    const { primary, to, router = false } = props;

    return (
      <Tooltip label={primary} placement="auto-start">
        {router ? (
          <RouterLink to={to} style={{ width: "100%" }}>
            {ListItemButton(props)}
          </RouterLink>
        ) : (
          <Link href={to} style={{ width: "100%" }}>
            {ListItemButton(props)}
          </Link>
        )}
      </Tooltip>
    );
  }

  function ListItemButton(props: ListItemLinkProps) {
    const { icon, primary, className, disabled = false } = props;
    return (
      <Button
        onClick={handleDrawerClose}
        className={className ? className : ""}
        disabled={disabled}
        leftIcon={icon ? icon : undefined}
        borderRadius={0}
        isFullWidth={true}
        variant={"ghost"}
        justifyContent={"right"}
        iconSpacing={"40px"}
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
          icon={
            <img
              src={"/ystv.png"}
              style={{
                width: "25px",
                filter: "opacity(0.65)",
                height: "intrinsic",
              }}
              alt="Main Site Link"
            />
          }
        />
      </VStack>
      <Divider />
      <VStack>
        <ListItemLink
          to={`${process.env.REACT_APP_CREATOR_BASEURL}`}
          primary="Creator Studio"
          icon={<VideoLibraryRounded />}
        />
      </VStack>
      <Divider />
      <VStack>
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
      {userContextPermissions(userContext, []) && (
        <>
          <ListItem button onClick={handleCollapseClick}>
            <ListItemIcon>
              <SupervisorAccountRounded />
            </ListItemIcon>
            <ListItemText primary="Society Admin" />
            {collapseOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
            <List>
              <ListItemLink
                to="http://auth.ystv.co.uk/internal/users"
                primary="Members"
                icon={<People />}
                className={classes.nested}
              />
              <ListItemLink
                to="/key_list"
                primary="Key List"
                icon={<VpnKeyRounded />}
                className={classes.nested}
                router
                disabled
              />
              <ListItemLink
                to="/roles"
                primary="Officer Roles"
                icon={<SupervisedUserCircleRounded />}
                className={classes.nested}
                router
                disabled
              />
              <ListItemLink
                to="/mailing-lists"
                primary="Mailing Lists"
                icon={<AllInbox />}
                className={classes.nested}
                disabled
              />
              <ListItemLink
                to="/hire-prices"
                primary="Hire Prices"
                icon={<MonetizationOn />}
                className={classes.nested}
                disabled
              />
            </List>
          </Collapse>
        </>
      )}
      <div className="spacer2" />
    </>
  );
}
