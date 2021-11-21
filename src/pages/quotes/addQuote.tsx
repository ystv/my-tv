// React Imports
import React from "react";
import { useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";
import axios from "axios";

// Custom Components
import {
  Button,
  Heading,
  HStack,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import apiAuthReq from "../../components/functions/apiAuthReq";
import { QuoteInterface } from "../../components/types/quotes";

// Type imports

// Other imports

// Begin Code

export default function AddQuote(): JSX.Element {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  function onSubmit(data: QuoteInterface) {
    apiAuthReq("/v1/internal/people/user").then(() =>
      axios
        .post(
          `${process.env.REACT_APP_API_BASEURL}/v1/internal/misc/quotes`,
          data,
          {
            withCredentials: true,
          }
        )
        .then(() => {
          history.push("/quotes");
        })
    );
  }

  return (
    <>
      <Heading>Edit Event</Heading>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack align="left">
          <Textarea
            placeholder="Quote"
            {...register("quote")}
            multiline
            rows={6}
            fullWidth
          />
          <Input
            placeholder="Attributed Author"
            {...register("description")}
            fullWidth
          />
          <HStack>
            <Button variant="outline" onClick={history.goBack}>
              Cancel
            </Button>
            <Button type="submit">Save Quote</Button>
          </HStack>
        </VStack>
      </form>
    </>
  );
}
