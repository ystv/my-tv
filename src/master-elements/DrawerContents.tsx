// React Imports
import React from "react";

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

import { ListItemRRLink, ListItemLink } from "./DrawerLinkComponents";

interface drawerContentsProps {
  handleCollapseClick: (e: any) => void;
  collapseOpen: boolean;
}

export function DrawerContents({
  handleCollapseClick,
  collapseOpen,
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
  return (
    <>
      <List>
        <ListItemRRLink to="/calendar" primary="Calendar" icon={<Today />} />
        <ListItemRRLink
          to="/quotes"
          primary="Quotes"
          icon={<FormatQuoteRounded />}
          disabled
        />
        <ListItemRRLink
          to="/webcams"
          primary="Webcams"
          icon={<VideocamRounded />}
          disabled
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
        <ListItemRRLink
          to="/merch"
          primary="Merch"
          icon={<Storefront />}
          disabled
        />
        <ListItemRRLink
          to="/accounts"
          primary="Social Accounts"
          icon={<AccountBox />}
          disabled
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
          <ListItemRRLink
            to="/members"
            primary="Members"
            icon={<People />}
            className={classes.nested}
          />
          <ListItemRRLink
            to="/mailing-lists"
            primary="Mailing Lists"
            icon={<AllInbox />}
            className={classes.nested}
          />
          <ListItemRRLink
            to="/hire-prices"
            primary="Hire Prices"
            icon={<MonetizationOn />}
            className={classes.nested}
          />
        </List>
      </Collapse>
    </>
  );
}
