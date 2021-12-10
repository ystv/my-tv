import React from "react";
import {
  Stack,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { NewGroup } from "../../../components/types/clapper";
import { clapper } from "../../../services/services";

const NewPositionGroupForm: React.FC = (): JSX.Element => {
  const { register, handleSubmit } = useForm<NewGroup>();

  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = (newGroup: NewGroup) => {
    clapper
      .newGroup(newGroup)
      .then((groupID) => navigate(`../${groupID}`))
      .catch((error) => {
        toast({
          title: "Failed to create group",
          description: error.toString(),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <Stack spacing={3} p={2} as="form" onSubmit={handleSubmit(onSubmit)}>
      <Heading>Create Group</Heading>
      <Text>
        Group up roles that are related to each other. This gives people the
        ability to filter by group on other menus. Each group has a page showing
        what roles are part of it and who the team lead is.
      </Text>
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          variant="outline"
          placeholder="Name"
          autoComplete="off"
          {...register("name")}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Description</FormLabel>
        <Textarea
          resize="vertical"
          placeholder="Description"
          {...register("description")}
          variant="outline"
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Team lead</FormLabel>
        <Input
          variant="outline"
          placeholder="Team lead"
          autoComplete="off"
          {...register("teamLeadUserID")}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Primary colour</FormLabel>
        <Input
          variant="outline"
          placeholder="Name"
          autoComplete="off"
          {...register("primaryColour")}
        />
      </FormControl>

      <FormControl>
        <Button variant="solid" type="submit">
          Create
        </Button>
      </FormControl>
    </Stack>
  );
};

export default NewPositionGroupForm;
