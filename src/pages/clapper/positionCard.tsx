import React, { useState } from "react";
import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
} from "@chakra-ui/react";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Clapper, RichPosition } from "../../services/api/clapper";

interface Props {
  position: RichPosition;
}

const PositionCard: React.FC<Props> = ({ position }): JSX.Element => {
  const [watching, setWatching] = useState<boolean>(position.watching);
  const subscribe = () => {
    if (watching) {
      Clapper.unwatchPosition(position.positionID);
      setWatching(false);
    } else {
      Clapper.watchPosition(position.positionID);
      setWatching(true);
    }
  };

  return (
    <Box
      role="group"
      p={5}
      maxW="16rem"
      w="full"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="2xl"
      rounded="lg"
      pos="relative"
      zIndex={1}
    >
      <Stack pt={5} align="center">
        <Image
          rounded="lg"
          height="8rem"
          objectFit="cover"
          src={position.image}
        />
        <Text color="gray.500" fontSize="sm" textTransform="uppercase">
          {position.group}
        </Text>
        <Heading fontSize="2xl" fontFamily="heading" fontWeight={500}>
          {position.name}
        </Heading>
        <Stack mt={8} direction="row" spacing={4}>
          <Link to={`/clapper/positions/${position.positionID}#signups`}>
            <Button flex={1} fontSize="sm">
              Signups
            </Button>
          </Link>
          <Button
            onClick={subscribe}
            flex={1}
            fontSize="sm"
            colorScheme="blue"
            variant={watching ? "solid" : "outline"}
          >
            {watching ? "Watching" : "Watch"}
          </Button>
        </Stack>
        <Link to={`/clapper/positions/${position.positionID}`}>
          <Button
            colorScheme="blue"
            variant="outline"
            rightIcon={<FiArrowUpRight />}
          >
            Details
          </Button>
        </Link>
      </Stack>
    </Box>
  );
};

export default PositionCard;
