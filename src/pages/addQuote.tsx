// React Imports
import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

// MUI components
import { Typography, Grid, Button, Box, TextField } from "@material-ui/core";
import { Save, Cancel } from "@material-ui/icons";

// Custom Components
import apiAuthReq from "../components/functions/apiAuthReq";

// Type imports

// Other imports

// Begin Code

export default function EventEdit() {
  const { register, handleSubmit, errors } = useForm();
  let history = useHistory();

  function onSubmit(data: any) {
    apiAuthReq("/v1/internal/people/user").then(() =>
      axios
        .post(
          `${process.env.REACT_APP_API_BASEURL}/v1/internal/misc/quotes`,
          data,
          {
            withCredentials: true,
          }
        )
        .then((result) => {
          history.push("/quotes");
        })
    );
  }

  return (
    <>
      <Grid container alignContent="space-between">
        <Typography variant="h4" style={{ flex: 1 }}>
          Edit Event
        </Typography>
        <Box component="span">
          <Button variant="contained" color="secondary" startIcon={<Cancel />}>
            Cancel
          </Button>
        </Box>
        {/* <Box component="span">
          <Button variant="contained" color="primary" startIcon={<Save />}>
            Save Quote
          </Button>
        </Box> */}
      </Grid>

      <br />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
          spacing={2}
        >
          <Grid item>
            <TextField
              type="text"
              placeholder="Quote"
              name="quote"
              inputRef={register({ required: true })}
              multiline
              rows={6}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              type="text"
              placeholder="Attributed Author"
              name="description"
              inputRef={register({ required: true })}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Save />}
              type="submit"
            >
              Save Quote
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
