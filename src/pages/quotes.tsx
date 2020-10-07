// React Imports
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// MUI components
import {
  Grid,
  Typography,
  Box,
  Paper,
  IconButton,
  Button,
} from "@material-ui/core";
import {
  Refresh,
  Edit,
  ArrowForwardIosRounded,
  ArrowBackIosRounded,
  AddRounded,
} from "@material-ui/icons";

// Custom Components
import apiAuthReq from "../components/functions/apiAuthReq";

// Type imports
import { quotesInterface } from "../components/types/quotes";

// Other imports

// Begin Code

export default function Quotes() {
  const [page, setPage] = useState(0);
  const [quotes, setQuotes] = useState<quotesInterface>();
  let location = useLocation();

  useEffect(() => {
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
      `/v1/internal/misc/quotes/${page === 0 ? 0 : page * 12 - 1}/12`
    ).then((e) => setQuotes(e));
  }

  function updateQuotes(neg: boolean = false) {
    neg ? setPage(page - 1) : setPage(page + 1);
  }

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
          <Link to="/quotes/add">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddRounded />}
            >
              Add Quote
            </Button>
          </Link>
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

                  <IconButton color="primary" disabled>
                    <Link to={`/quotes/edit/${x.id}`}>
                      <Edit />
                    </Link>
                  </IconButton>
                </div>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : null}
    </div>
  );
}
