import React from "react";
import {
  Stack,
  HStack,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { StepProps } from "../../../components/reducers/event-reducer";
import { Event } from "../../../components/types/clapper";

const BasicEventInfo: React.FC<StepProps> = ({
  step,
  setStep,
  state,
  dispatch,
}): JSX.Element => {
  const { register, handleSubmit } = useForm<Event>({ defaultValues: state });

  const toast = useToast();

  const onSubmit = (newEvent: Event) => {
    dispatch({ type: "update-basic", event: newEvent });
    toast({
      title: "Stepped one",
      description: JSON.stringify(newEvent, null, 4),
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setStep(step + 1);
  };

  return (
    <Stack spacing={3} p={2} as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          variant="outline"
          placeholder="Name"
          autoComplete="off"
          {...register("name")}
        />
      </FormControl>

      <FormLabel>Location</FormLabel>
      <Input variant="outline" placeholder="Location" {...register("name")} />

      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea
          resize="vertical"
          placeholder="Description"
          {...register("description")}
          variant="outline"
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Type</FormLabel>
        <Select {...register("eventType")} variant="outline">
          <option value="show">Show</option>
          <option value="meeting">Meeting</option>
          <option value="social">Social</option>
          <option value="other">Other</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Options</FormLabel>
        <HStack>
          <Checkbox size="md" {...register("isTentative")}>
            Tentative
          </Checkbox>
          <Checkbox size="md" {...register("isPrivate")}>
            Private
          </Checkbox>
        </HStack>
      </FormControl>

      <FormControl>
        <Button variant="solid" type="submit">
          Next
        </Button>
      </FormControl>
    </Stack>
  );
};

export default BasicEventInfo;
