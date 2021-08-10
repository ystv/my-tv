// React Imports
import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

// MUI components
import {
  Grid,
  Typography,
  Box,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  Slide,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@material-ui/core";

import {
  Refresh,
  Edit,
  ArrowForwardIosRounded,
  ArrowBackIosRounded,
  AddRounded,
  Delete,
  Save,
} from "@material-ui/icons";

import { TransitionProps } from "@material-ui/core/transitions";

// Custom Components
import apiAuthReq from "../components/functions/apiAuthReq";

// Type imports
import { quoteInterface, quotesInterface } from "../components/types/quotes";
import Axios from "axios";

// Other imports
import { useForm } from "react-hook-form";

// Begin Code

export default function Quotes() {
  const [page, setPage] = useState(0);
  const [quotes, setQuotes] = useState<quotesInterface>();
  let location = useLocation();
  const [showEditing, setShowEditing] = useState(false);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    let newPage = parseInt(location.pathname.split("/")[2]);
    if (isNaN(newPage)) {
      newPage = 0;
    }
    setPage(newPage);
    // eslint-disable-next-line
  }, [location.pathname]);

  useEffect(() => {
    getQuotes();
    window.history.replaceState(null, "YSTV | My-TV", `/quotes/${page}`);
    // eslint-disable-next-line
  }, [page]);

  function getQuotes() {
    apiAuthReq<quotesInterface>(
      `/v1/internal/misc/quotes/${page === 0 ? 0 : page * 12}/12`
    ).then((e) => setQuotes(e));
  }

  function updateQuotes(neg: boolean = false) {
    neg ? setPage(page - 1) : setPage(page + 1);
  }

  function onSubmit(data: quoteInterface) {
    apiAuthReq("/v1/internal/people/user").then(() =>
      Axios.put<quoteInterface>(
        `${process.env.REACT_APP_API_BASEURL}/v1/internal/misc/quotes`,
        { data },
        {
          withCredentials: true,
        }
      ).then(() => {
        getQuotes();
        handleEditMenuClose();
      })
    );
  }

  const [openDeleteMenu, setOpenDeleteMenu] = useState(false);
  const [selQuote, setSelQuote] = useState(-1);
  const [openEditMenu, setOpenEditMenu] = useState(false);

  const handleDeleteMenuClickOpen = (e: number) => {
    setSelQuote(e);
    setOpenDeleteMenu(true);
  };

  const handleEditMenuClickOpen = (e: number) => {
    setSelQuote(e);
    setOpenEditMenu(true);
  };

  const handleEditMenuClose = () => {
    setOpenEditMenu(false);
  };

  const handleDeleteMenuClose = () => {
    setOpenDeleteMenu(false);
  };

  const handleDeleteConfirm = () => {
    apiAuthReq("/v1/internal/people/user").then(() =>
      Axios.delete(
        `${process.env.REACT_APP_API_BASEURL}/v1/internal/misc/quotes/${selQuote}`,
        {
          withCredentials: true,
        }
      ).then(() => {
        getQuotes();
        handleDeleteMenuClose();
      })
    );
  };

  return (
    <>
      <Typography variant="h4">Quotes</Typography>
      <Typography variant="subtitle1">(Authenticity not verified)</Typography>

      <Grid container alignContent="space-between">
        <div style={{ flex: 1 }} />
        <Box component="span">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setShowEditing(!showEditing)}
          >
            Edit Mode
          </Button>
          <IconButton disabled={page === 0} onClick={() => updateQuotes(true)}>
            <ArrowBackIosRounded />
          </IconButton>
          <IconButton onClick={() => updateQuotes()}>
            <ArrowForwardIosRounded />
          </IconButton>
          <IconButton onClick={() => getQuotes()}>
            <Refresh />
          </IconButton>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddRounded />}
            component={RouterLink}
            to="/quotes/add"
          >
            Add Quote
          </Button>
        </Box>
      </Grid>

      <br />

      <Grid container justifyContent="center" spacing={3}>
        {quotes?.Quotes.map((x, n) => (
          <Grid key={n} item xs={12} sm={6} md={4} xl={3}>
            <Box component={Paper} style={{ padding: "1rem" }}>
              <Typography
                variant="body1"
                dangerouslySetInnerHTML={{ __html: x.quote }}
              />
              {x.description !== "" ? (
                <>
                  <br />
                  <Typography variant="subtitle2">{x.description}</Typography>
                </>
              ) : null}

              <div style={{ display: "flex" }}>
                {showEditing && (
                  <>
                    <Typography variant="caption">{x.id}</Typography>
                    <div style={{ flex: 1 }} />
                    <IconButton
                      color="primary"
                      onClick={() => handleEditMenuClickOpen(x.id)}
                    >
                      <Edit />
                    </IconButton>

                    <IconButton
                      color="inherit"
                      onClick={() => handleDeleteMenuClickOpen(x.id)}
                    >
                      <Delete />
                    </IconButton>
                  </>
                )}
              </div>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDeleteMenu}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDeleteMenuClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {`Delete quote ${selQuote}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Warning this operation is permanent and cannot be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteMenuClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openEditMenu}
        onClose={handleEditMenuClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {`Editing quote ${selQuote}:`}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              type="text"
              placeholder="Quote"
              {...register("quote")}
              defaultValue={
                quotes?.Quotes.find((e) => e.id === selQuote)?.quote
              }
              multiline
              rows={6}
              variant="outlined"
              fullWidth
            />

            <TextField
              type="text"
              placeholder="Attributed Author"
              {...register("description")}
              defaultValue={
                quotes?.Quotes.find((e) => e.id === selQuote)?.description
              }
              variant="outlined"
              fullWidth
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleEditMenuClose} color="primary">
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Save />}
              type="submit"
            >
              Save Quote
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
