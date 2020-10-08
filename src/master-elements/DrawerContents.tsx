// React Imports
import React from "react";
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
  Link,
  Tooltip,
} from "@material-ui/core";

import {
  ExpandLess,
  ExpandMore,
  Mail,
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

interface ListItemLinkProps {
  icon?: React.ReactElement;
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
}

export function DrawerContents({
  handleCollapseClick,
  collapseOpen,
  handleDrawerClose,
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
    const { icon, primary, to, className, disabled, router = false } = props;

    return (
      <li>
        <Tooltip title={primary} placement="right">
          <ListItem
            button
            component={router ? RouterLink : Link}
            to={router ? to : ""}
            href={router ? "" : to}
            color="inherit"
            onClick={handleDrawerClose}
            className={className ? className : ""}
            disabled={disabled}
          >
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
            <ListItemText primary={primary} />
          </ListItem>
        </Tooltip>
      </li>
    );
  }

  return (
    <>
      <List>
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
      </List>
      <Divider />
      <List>
        <ListItemLink
          to="http://creator.ystv.co.uk"
          primary="CStudio"
          icon={<VideoLibraryRounded />}
          disabled
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
        <ListItemLink
          to="/merch"
          primary="Merch"
          icon={<Storefront />}
          disabled
          router
        />
        <ListItemLink
          to="/accounts"
          primary="Social Accounts"
          icon={<AccountBox />}
          disabled
          router
        />
      </List>
      <Divider />
      <ListItem button onClick={handleCollapseClick} disabled>
        <ListItemIcon>
          <SupervisorAccountRounded />
        </ListItemIcon>
        <ListItemText primary="Society Admin" />
        {collapseOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
        <List>
          <ListItemLink
            to="/members"
            primary="Members"
            icon={<People />}
            className={classes.nested}
          />
          <ListItemLink
            to="/mailing-lists"
            primary="Mailing Lists"
            icon={<AllInbox />}
            className={classes.nested}
          />
          <ListItemLink
            to="/hire-prices"
            primary="Hire Prices"
            icon={<MonetizationOn />}
            className={classes.nested}
          />
        </List>
      </Collapse>
      <div style={{ padding: "2rem" }} />
    </>
  );
}
