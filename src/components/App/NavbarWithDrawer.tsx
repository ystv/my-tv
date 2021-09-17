// React Imports
import { ReactNode, useState } from "react";

// MUI components

// Other imports
// import DrawerComponent from "./DrawerComponent";
// import NavbarComponent from "./NavbarComponent";
import { Box } from "@chakra-ui/react";
import SidebarWithHeader from "./DrawerContents";

// Begin Code

export default function NavbarWithDrawer({
  children,
}: {
  children?: ReactNode;
}) {
  /// Declarations
  const drawerOpenState = useState(false);

  /// Menu and Drawer Component Master Return

  return (
    <SidebarWithHeader>
      <main style={{ padding: "0 2rem" }}>
        <Box height={"4rem"} />
        <br />
        {
          /// THIS IS WHERE THE PAGE CONTENT GOES
          children
        }
        <div className="spacer2" />
      </main>
    </SidebarWithHeader>
  );
}
