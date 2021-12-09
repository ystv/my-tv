import React from "react";
import { Box, useRadio, UseRadioProps } from "@chakra-ui/react";

const RadioCard: React.FC<UseRadioProps> = (props): JSX.Element => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  const { children } = props;

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        variant="solid"
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {children}
      </Box>
    </Box>
  );
};

export default RadioCard;
