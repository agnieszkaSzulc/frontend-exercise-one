import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
  Tooltip
} from "@chakra-ui/react";
import { getRecipe } from "./RecipeApi";
import { CheckIcon, TimeIcon } from "@chakra-ui/icons";

export default function Recipe() {
  const location = useParams();
  const [recipe, setRecipe] = useState(() =>
    getRecipe(location.name, result => setRecipe(result))
  );

  if (!recipe) return null;

  return (
    <>
      <Heading as="h1" size="xl" mt="6" textAlign="center" color="red.600">
        {recipe.name}
      </Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={5} mx={10} p={10}>
        <GridItem bgColor="red.50" borderRadius="md" px="10" py="6">
          <Flex flexDirection="column" height="100%">
            <Heading as="h5" size="md" mb={6}>
              Ingredients
            </Heading>
            <List spacing={3}>
              {recipe.ingredients.map((ingredient, index) => (
                <ListItem key={index}>
                  <Tooltip
                    label={ingredient.type}
                    fontSize="md"
                    placement="left"
                  >
                    <ListIcon as={CheckIcon} color="red.400" />
                  </Tooltip>
                  {ingredient.quantity}{" "}
                  <strong>{ingredient.name.trim()}</strong>
                </ListItem>
              ))}
            </List>
            <Flex alignItems="center" mt="auto" justifyContent="flex-end">
              <TimeIcon fontSize="xl" mr="2" />
              {recipe.timers.reduce((a, b) => a + b, 0)} min
            </Flex>
          </Flex>
        </GridItem>
        <GridItem colSpan={2}>
          <Box w="100%" mb={6}>
            <Image
              src={recipe.imageURL}
              alt={recipe.name}
              fit="cover"
              w="inherit"
              h="auto"
              maxHeight="400px"
              fallbackSrc="https://via.placeholder.com/150"
            />
          </Box>
          <Box>
            <List spacing={3} style={{ counterReset: "step" }}>
              {recipe.steps.map((step, index) => (
                <ListItem
                  key={index}
                  style={{ counterIncrement: "step" }}
                  _before={{
                    content: "counter(step)",
                    color: "red.400",
                    px: "2",
                    py: "1",
                    fontWeight: "bold",
                    fontSize: "xl"
                  }}
                >
                  {step}
                </ListItem>
              ))}
            </List>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}
