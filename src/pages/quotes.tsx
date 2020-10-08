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
} from "@material-ui/core";

import {
  Refresh,
  Edit,
  ArrowForwardIosRounded,
  ArrowBackIosRounded,
  AddRounded,
  Delete,
} from "@material-ui/icons";

import { TransitionProps } from "@material-ui/core/transitions";

// Custom Components
import apiAuthReq from "../components/functions/apiAuthReq";

// Type imports
import { quotesInterface } from "../components/types/quotes";
import { userInterface } from "../components/types/people";
import userContextPermissions from "../components/functions/userContextPermissions";
import Axios from "axios";

// Other imports

// Begin Code

interface QuotesProps {
  user: userInterface;
}

export default function Quotes(props: QuotesProps) {
  const [page, setPage] = useState(0);
  const [quotes, setQuotes] = useState<quotesInterface>();
  let location = useLocation();
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    setShowDelete(userContextPermissions(props.user));
    var newPage = parseInt(location.pathname.split("/")[2]);
    if (isNaN(newPage)) {
      newPage = 0;
    }
    setPage(newPage);
  }, []);

  useEffect(() => {
    getQuotes();
    window.history.replaceState(null, "YSTV | My-TV", `/quotes/${page}`);
  }, [page]);

  function getQuotes() {
    apiAuthReq(
      `/v1/internal/misc/quotes/${page === 0 ? 0 : page * 12}/12`
    ).then((e) => setQuotes(e));
  }

  function updateQuotes(neg: boolean = false) {
    neg ? setPage(page - 1) : setPage(page + 1);
  }

  const [openDeleteMenu, setOpenDeleteMenu] = useState(false);
  const [selQuote, setSelQuote] = useState(-1);

  const handleDeleteMenuClickOpen = (e: number) => {
    setSelQuote(e);
    setOpenDeleteMenu(true);
  };

  const handleDeleteMenuClose = () => {
    setOpenDeleteMenu(false);
  };

  const handleDeleteConfirm = () => {
    Axios.delete(
      `${process.env.REACT_APP_API_BASEURL}/v1/internal/misc/quotes/${selQuote}`,
      {
        withCredentials: true,
      }
    ).then(() => {
      getQuotes();
      handleDeleteMenuClose();
    });
  };

  return (
    <div>
      <Typography variant="h4">Quotes</Typography>
      <Typography variant="subtitle1">(Authenticity not varified)</Typography>

      <Grid container alignContent="space-between">
        <div style={{ flex: 1 }} />
        <Box component="span">
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

      {quotes !== undefined ? (
        <Grid container justify="center" spacing={3}>
          {quotes.Quotes.map((x, n) => (
            <Grid key={n} item xs={12} sm={6} md={4} xl={3}>
              <Box component={Paper} style={{ padding: "1rem" }}>
                <Typography variant="body1">
                  <div dangerouslySetInnerHTML={{ __html: x.quote }} />
                </Typography>
                <Typography variant="subtitle2">{x.description}</Typography>

                <div style={{ display: "flex" }}>
                  <Typography variant="caption">{x.id}</Typography>
                  <div style={{ flex: 1 }} />

                  <IconButton
                    color="primary"
                    disabled
                    component={RouterLink}
                    to={`/quotes/edit/${x.id}`}
                  >
                    <Edit />
                  </IconButton>
                  {showDelete ? (
                    <IconButton
                      color="inherit"
                      onClick={() => handleDeleteMenuClickOpen(x.id)}
                    >
                      <Delete />
                    </IconButton>
                  ) : null}
                </div>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : null}

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
            Warning this operation is permenant and cannot be undone
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
    </div>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
