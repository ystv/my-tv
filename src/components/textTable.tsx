// React Imports
import React from "react";

// MUI components
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

// Custom Components

// Type imports

// Other imports

// Begin Code

interface Props {
  tableTitle: string;
  columnTitles: string[];
  dataKeys: string[];
  data: { [key: string]: any }[];
}

export default function TextTable(props: Props) {
  return (
    <TableContainer component={Paper}>
      <h2 style={{ marginLeft: "1rem" }}>{props.tableTitle}</h2>
      <Table>
        <TableHead>
          <TableRow>
            {props.columnTitles.map((e, i) => (
              <TableCell key={`headcell${i}`}>{e}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {props.data.map((e, i) => (
            <TableRow key={`row${i}`}>
              {props.dataKeys.map((n, m) => (
                <TableCell key={`cell${m}`}>{e[n]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
