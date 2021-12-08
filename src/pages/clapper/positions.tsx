import React, { useEffect, useState } from "react";

import {
  Button,
  Spacer,
  Heading,
  SimpleGrid,
  ButtonGroup,
  Text,
} from "@chakra-ui/react";
import PositionCard from "./positionCard";
import { Group, Position } from "../../components/types/clapper";
import { clapper } from "../../services/services";

interface GroupButtons extends Group {
  filtered: boolean;
}

const Positions = (): JSX.Element => {
  const [positions, setPositions] = useState<Position[]>();
  const [visiblePositions, setVisiblePositions] = useState<
    Position[] | undefined
  >(positions);
  const [groups, setGroups] = useState<GroupButtons[]>();

  useEffect(() => {
    clapper.getPositions().then((pos) => {
      setPositions(pos);
      setVisiblePositions(pos);
    });
    clapper.getGroups().then((grps) => {
      setGroups(
        grps.map((grp) => ({ ...grp, filtered: false } as GroupButtons))
      );
    });
  }, []);

  const updateVisiblePositions = () => {
    if (!groups) return;
    const filteredGroups = groups
      .filter((group) => group.filtered)
      .map((group) => group.name);

    if (filteredGroups.length === 0) {
      setVisiblePositions(positions);
      return;
    }

    if (!positions) return;
    setVisiblePositions(
      positions.filter((position) => filteredGroups.includes(position.group))
    );
  };

  if (!(positions && visiblePositions && groups)) {
    return <h1>loading</h1>;
  }

  return (
    <>
      <Heading>Crew Roles</Heading>
      <Text>All positions that you can subscribe too</Text>
      <ButtonGroup variant="outline" spacing="6" pt="2">
        {groups.map((group) => (
          <Button
            px={6}
            variant={!group.filtered ? "outlined" : "solid"}
            onClick={() => {
              setGroups(
                groups.map((grp) => {
                  if (group.name === grp.name) {
                    const updatedGroup = grp;
                    updatedGroup.filtered = !grp.filtered;
                    return updatedGroup;
                  }
                  return grp;
                })
              );
              updateVisiblePositions();
            }}
          >
            {group.name}
          </Button>
        ))}
      </ButtonGroup>
      <Spacer p="4rem" />
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        {visiblePositions.map((position) => (
          <PositionCard position={position} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default Positions;
