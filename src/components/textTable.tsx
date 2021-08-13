// React Imports
import React from "react";

// MUI components
import {
  Box,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

// Custom Components

// Type imports

// Other imports

// Begin Code

interface Props {
  tableTitle: string;
  tableDescription?: string;
  tableSubheading?: string;
  columnTitles: string[];
  dataKeys: string[];
  data: { [key: string]: any }[];
}

export default function TextTable(props: Props) {
  return (
    <Box borderWidth={1} borderRadius={"10px"} p={"0 1rem 2rem 1rem"}>
      <Table variant={"simple"}>
        <TableCaption placement={"top"} fontSize={"1.2rem"} p={0}>
          <h1>{props.tableTitle}</h1>
        </TableCaption>
        <caption style={{ fontSize: ".8rem" }}>
          <b>{props.tableSubheading}</b>
        </caption>
        <caption style={{ fontSize: ".9rem" }}>
          <p>{props.tableDescription}</p>
        </caption>
        <Thead>
          <Tr>
            {props.columnTitles.map((e, i) => (
              <Th key={`headcell${i}`}>{e}</Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {props.data?.map((e, i) => (
            <Tr key={`row${i}`}>
              {props.dataKeys.map((n, m) => (
                <Td key={`cell${m}`}>{e[n]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
