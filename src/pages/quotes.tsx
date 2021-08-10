// React Imports
import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

// MUI components
import { Grid, IconButton } from "@material-ui/core";
import {
  Button,
  Heading,
  Text,
  Box,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  Textarea,
  Input,
} from "@chakra-ui/react";

import {
  Refresh,
  Edit,
  ArrowForwardIosRounded,
  ArrowBackIosRounded,
  AddRounded,
  Delete,
} from "@material-ui/icons";

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
  const cancelRefDelete = useRef(null);
  const cancelRefEdit = useRef(null);

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
      <Heading>Quotes</Heading>
      <Text>(Authenticity not verified)</Text>

      <Grid container alignContent="space-between">
        <div style={{ flex: 1 }} />
        <Box component="span">
          <Button variant="ghost" onClick={() => setShowEditing(!showEditing)}>
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
            variant="solid"
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
            <Box
              borderWidth="1px"
              borderRadius="lg"
              style={{ padding: "1rem" }}
            >
              <Text
                fontSize="xl"
                dangerouslySetInnerHTML={{ __html: x.quote }}
              />
              {x.description !== "" ? (
                <>
                  <br />
                  <Heading fontSize="sm">{x.description}</Heading>
                </>
              ) : null}

              <div style={{ display: "flex" }}>
                {showEditing && (
                  <>
                    <Heading fontSize="xs">{x.id}</Heading>
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

      <AlertDialog
        isOpen={openDeleteMenu}
        onClose={handleDeleteMenuClose}
        leastDestructiveRef={cancelRefDelete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>
            <AlertDialogBody>
              Warning this operation is permanent and cannot be undone
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                onClick={handleDeleteMenuClose}
                ref={cancelRefDelete}
                variant={"outline"}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                colorScheme={"red"}
                variant={"solid"}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isOpen={openEditMenu}
        onClose={handleEditMenuClose}
        leastDestructiveRef={cancelRefEdit}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {`Editing quote ${selQuote}:`}
            </AlertDialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <AlertDialogBody>
                <Textarea
                  placeholder="Quote"
                  {...register("quote")}
                  defaultValue={
                    quotes?.Quotes.find((e) => e.id === selQuote)?.quote
                  }
                  multiline
                  rows={6}
                  variant="outline"
                />

                <Input
                  placeholder="Attributed Author"
                  {...register("description")}
                  defaultValue={
                    quotes?.Quotes.find((e) => e.id === selQuote)?.description
                  }
                  variant="outline"
                />
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  onClick={handleEditMenuClose}
                  variant="outline"
                  ref={cancelRefEdit}
                >
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  type="submit"
                  colorScheme={"blue"}
                  ml={3}
                >
                  Save Quote
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
