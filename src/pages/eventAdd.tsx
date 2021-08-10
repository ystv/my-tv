// React Imports
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";

// MUI components
import {
  Typography,
  Grid,
  Button,
  Box,
  TextField,
  Stepper,
  Step,
  StepContent,
  StepLabel,
  Select,
  FormControl,
  MenuItem,
  Checkbox,
  InputLabel,
} from "@material-ui/core";

// Custom Components
//import apiAuthReq from "../components/functions/apiAuthReq";

// Type imports
import { eventInterface } from "../components/types/clapper";

// Other imports

// Begin Code

// const apiReq = async (url: string, method: string, body: any) => {
//   let endpoint = `${process.env.REACT_APP_API_BASEURL}${url}`;
//   await apiAuthReq("/user");
//   let res = await axios.post<eventInterface>(endpoint, body, {
//     withCredentials: true,
//   });
//   return res;
// };

const EventAdd: React.FC = (): JSX.Element => {
  const { register, handleSubmit } = useForm<eventInterface>();
  const [activeStep, setActiveStep] = useState(0);

  function onSubmit(data: eventInterface) {
    console.log("creating new event", data);
    setActiveStep(0);
  }

  return (
    <Stepper orientation={"vertical"} activeStep={activeStep}>
      <Step key="Create Event">
        <StepLabel>Create Event</StepLabel>
        <StepContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container alignContent="space-between">
              <Typography variant="h4" style={{ flex: 1 }}>
                Create Event
              </Typography>
            </Grid>
            <br />

            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={2}
            >
              <Grid item>
                <TextField
                  type="text"
                  placeholder="Event Name"
                  {...register("name")}
                  variant="outlined"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  type="text"
                  placeholder="Event Description"
                  {...register("description")}
                  variant="outlined"
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item>
                <FormControl required>
                  <InputLabel>Event Type</InputLabel>
                  <Select
                    {...register("eventType")}
                    variant={"outlined"}
                    fullWidth
                  >
                    <MenuItem value="show">Show</MenuItem>
                    <MenuItem value="meeting">Meeting</MenuItem>
                    <MenuItem value="social">Social</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <Checkbox {...register("isCancelled")} />
              </Grid>
            </Grid>
            <br />
            <Box component="span">
              <Button
                variant="outlined"
                component={RouterLink}
                to={`/calendar`}
              >
                Back
              </Button>{" "}
              <Button variant="contained" color="primary" type="submit">
                Next
              </Button>
            </Box>
          </form>
        </StepContent>
      </Step>
    </Stepper>
  );
};

export default EventAdd;
