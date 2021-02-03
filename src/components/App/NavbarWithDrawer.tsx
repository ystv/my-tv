// React Imports
import { ReactNode, useState } from "react";

// MUI components
import { CssBaseline } from "@material-ui/core";

// Other imports
import { NavbarStyles } from "./NavbarStyles";
import DrawerComponent from "./DrawerComponent";
import NavbarComponent from "./NavbarComponent";

// Begin Code

export default function NavbarWithDrawer({
  children,
}: {
  children?: ReactNode;
}) {
  /// Declarations
  const classes = NavbarStyles();
  const drawerOpenState = useState(false);

  /// Menu and Drawer Component Master Return

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavbarComponent drawerOpenState={drawerOpenState} />
      <DrawerComponent drawerOpenState={drawerOpenState} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <br />
        {
          /// THIS IS WHERE THE PAGE CONTENT GOES
          children
        }
        <div className="spacer2" />
      </main>
    </div>
  );
}
