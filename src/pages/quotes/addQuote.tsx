// React Imports
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// Custom Components
import {
  Button,
  Heading,
  HStack,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";

// Type imports
import { QuoteInterface } from "../../components/types/quotes";

// Other imports
import { misc } from "../../services/services";

// Begin Code

export default function AddQuote(): JSX.Element {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  function onSubmit(newQuote: QuoteInterface) {
    misc.newQuote(newQuote).then(() => {
      navigate("/quotes");
    });
  }

  return (
    <>
      <Heading>Create Quote</Heading>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack align="left">
          <Textarea
            placeholder="Quote"
            {...register("quote")}
            multiline
            rows={6}
            fullWidth
            bg="white"
          />
          <Input
            placeholder="Attributed Author"
            {...register("description")}
            fullWidth
            bg="white"
          />
          <HStack>
            <Button variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </HStack>
        </VStack>
      </form>
    </>
  );
}
