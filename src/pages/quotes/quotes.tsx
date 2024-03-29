// React Imports
import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

// ChakraUI components
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
  IconButton,
  HStack,
  Flex,
  Spacer,
  Grid,
  GridItem,
  Wrap,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, RepeatIcon } from "@chakra-ui/icons";

// Custom Components
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Type imports
import { QuoteInterface, QuotesInterface } from "../../components/types/quotes";

// Other imports

import { misc } from "../../services/services";

// Begin Code

export default function Quotes(): JSX.Element {
  const [page, setPage] = useState(0);
  const [quotes, setQuotes] = useState<QuotesInterface>();
  const location = useLocation();
  const [showEditing, setShowEditing] = useState(false);
  const { register, handleSubmit } = useForm();
  const cancelRefDelete = useRef(null);
  const cancelRefEdit = useRef(null);

  function getQuotes() {
    misc
      .getQuotes(page === 0 ? 0 : page * 12, 12)
      .then((recievedQuotes) => setQuotes(recievedQuotes));
  }

  function updateQuotes(neg = false) {
    if (neg) {
      setPage(page - 1);
    } else {
      setPage(page + 1);
    }
  }

  useEffect(() => {
    let newPage = parseInt(location.pathname.split("/")[2], 10);
    if (Number.isNaN(newPage)) {
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

  function onSubmit(selectedQuote: QuoteInterface) {
    misc.updateQuote(selectedQuote).then(() => {
      getQuotes();
      handleEditMenuClose();
    });
  }

  const handleDeleteConfirm = () => {
    misc.deleteQuote(selQuote).then(() => {
      getQuotes();
      handleDeleteMenuClose();
    });
  };

  return (
    <>
      <Heading>Quotes Board</Heading>

      <Wrap spacing={2} justify="flex-end">
        <Spacer />
        <Button
          variant={showEditing ? "solid" : "ghost"}
          onClick={() => setShowEditing(!showEditing)}
        >
          Edit Mode
        </Button>
        <IconButton
          disabled={page === 0}
          onClick={() => updateQuotes(true)}
          variant="outline"
          icon={<FiChevronLeft />}
          aria-label="Previous quotes page"
        />
        <IconButton
          onClick={() => updateQuotes()}
          icon={<FiChevronRight />}
          aria-label="Next quotes page"
          variant="outline"
        />
        <IconButton
          onClick={() => getQuotes()}
          icon={<RepeatIcon />}
          aria-label="Refresh quotes"
          variant="outline"
        />
        <Button variant="solid" as={RouterLink} to="/quotes/add">
          Add Quote
        </Button>
      </Wrap>

      <br />

      <Grid
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
        ]}
        gap={3}
      >
        {quotes ? (
          quotes.Quotes.map((quote) => (
            <GridItem>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                style={{ padding: "1rem" }}
                bg="white"
              >
                <Text
                  fontSize="xl"
                  dangerouslySetInnerHTML={{ __html: quote.quote }}
                />
                {quote.description !== "" ? (
                  <>
                    <br />
                    <Heading fontSize="sm">{quote.description}</Heading>
                  </>
                ) : null}

                {showEditing && (
                  <Flex align="flex-end">
                    <Text fontSize="xs" fontStyle="italic">
                      #{quote.id}
                    </Text>
                    <Spacer />
                    <HStack spacing={2}>
                      <IconButton
                        onClick={() => handleEditMenuClickOpen(quote.id)}
                        icon={<EditIcon />}
                        aria-label="Edit quote"
                        variant="outline"
                      />

                      <IconButton
                        onClick={() => handleDeleteMenuClickOpen(quote.id)}
                        icon={<DeleteIcon />}
                        aria-label="Delete quote"
                        variant="outline"
                      />
                    </HStack>
                  </Flex>
                )}
              </Box>
            </GridItem>
          ))
        ) : (
          <h1>loading</h1>
        )}
      </Grid>

      <AlertDialog
        isOpen={openDeleteMenu}
        onClose={handleDeleteMenuClose}
        leastDestructiveRef={cancelRefDelete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {`Deleting quote ${selQuote}:`}
            </AlertDialogHeader>
            <AlertDialogBody>
              Warning this operation is permanent and cannot be undone
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                onClick={handleDeleteMenuClose}
                ref={cancelRefDelete}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                colorScheme="red"
                variant="solid"
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
                <Button variant="solid" type="submit" ml={3}>
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
