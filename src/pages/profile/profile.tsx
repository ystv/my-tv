import React, { useEffect, useState } from "react";
import {
  Spinner,
  Flex,
  Box,
  Heading,
  Text,
  Image,
  Spacer,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { people } from "../../services/services";
import { User } from "../../components/types/people";

const Profile: React.FC = (): JSX.Element => {
  const { userID } = useParams();
  const [user, setUser] = useState<User>();
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (userID) {
      people.getUserByUserID(parseInt(userID, 10)).then((u) => setUser(u));
    } else {
      people.getUserByToken().then((u) => setUser(u));
    }
    setLoaded(true);
  }, [loaded]);

  if (!user) return <Spinner />;

  return (
    <Flex>
      <Box flex="1">
        <Heading>{`${user.nickname} ${user.lastName}`}</Heading>
        <Text as="i" color="gray.500">
          {user.username}
        </Text>
        <Spacer />
        <Heading fontSize="md">Permissions</Heading>
        {user.permissions.map((permission) => (
          <p>{permission.name}</p>
        ))}
      </Box>
      <Box>
        <Image
          boxSize="xs"
          src={user.avatar}
          alt={`${user.nickname}'s profile picture`}
        />
      </Box>
    </Flex>
  );
};

export default Profile;
