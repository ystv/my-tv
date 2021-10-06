/* eslint-disable react/destructuring-assignment */
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

interface TableProps {
  title: string;
  description?: string;
  subheading?: string;
  columnTitles: string[];
  dataKeys: string[];
  data: { [key: string]: any }[];
}

const TextTable: React.FC<TableProps> = (props): JSX.Element => (
  <Box borderWidth={1} borderRadius="10px" p="0 1rem 2rem 1rem">
    <Table variant="simple">
      <TableCaption placement="top" fontSize="1.2rem" p={0}>
        <h1>{props.title}</h1>
      </TableCaption>
      <caption style={{ fontSize: ".8rem" }}>
        <b>{props.subheading}</b>
      </caption>
      <caption style={{ fontSize: ".9rem" }}>
        <p>{props.description}</p>
      </caption>
      <Thead>
        <Tr>
          {props.columnTitles.map((colTitle) => (
            <Th key={`headcell${colTitle}`}>{colTitle}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {props.data?.map((e, i) => (
          <Tr key={`row${props.dataKeys[i]}`}>
            {props.dataKeys.map((n) => (
              <Td key={props.dataKeys[i]}>{e[n]}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Box>
);

export default TextTable;
