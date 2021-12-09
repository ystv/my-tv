import React, { useEffect, useState } from "react";
import SearchSelect from "react-select";
import { Stack, FormControl, FormLabel, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Position, SignupSheet } from "../../../components/types/clapper";
import { clapper } from "../../../services/services";
import { StepProps } from "../../../components/reducers/event-reducer";

const SignupSheets: React.FC<StepProps> = ({
  step,
  setStep,
  state,
  dispatch,
}): JSX.Element => {
  const { signups } = state;
  const { register, handleSubmit } = useForm<SignupSheet[]>({
    defaultValues: signups,
  });
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    clapper.getPositions().then((pos) => setPositions(pos));
  }, []);

  const onSubmit = (newSignups: SignupSheet[]) => {
    dispatch({ type: "update-signups", signups: newSignups });
    setStep(step + 1);
  };

  return (
    <Stack spacing={3} p={2} as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel>Positions</FormLabel>
        <SearchSelect
          {...register}
          placeholder="Search or select role"
          options={positions.map((position) => ({
            value: position.positionID,
            label: position.name,
          }))}
        />
      </FormControl>
      <Button variant="solid" type="submit">
        Next
      </Button>
    </Stack>
  );
};

export default SignupSheets;
