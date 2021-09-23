import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import * as PropTypes from "prop-types";
import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  List,
  ListIcon,
  ListItem,
  Text
} from "@chakra-ui/react";
import { ExternalLinkIcon, StarIcon, TimeIcon } from "@chakra-ui/icons";

export default function RecipeTile({ recipe }) {
  let history = useHistory();

  if (!recipe) return null;

  return (
    <Flex
      onClick={() => history.push(`/recipe/${recipe.name}`)}
      flexDirection="column"
      h="95vh"
      px={4}
      py={8}
      cursor="pointer"
      transition=".3s"
      boxShadow="rgba(0, 0, 0, .1) 0px 4px 12px"
      _hover={{
        transform: "scale(1.03)",
        boxShadow: "rgba(245, 101, 101, .5) 0px 4px 12px"
      }}
    >
      <Heading as="h3" size="lg" mb={4} textAlign="center" color="red.600">
        {recipe.name}
      </Heading>
      <Box w="100%" position="relative" mb={6}>
        <Image
          src={recipe.imageURL}
          alt={recipe.name}
          fit="cover"
          w="inherit"
          h="auto"
          maxHeight="200px"
          fallbackSrc="https://via.placeholder.com/150"
        />
        <Flex
          justifyContent="center"
          alignItems="center"
          position="absolute"
          bgColor="red.400"
          color="white"
          p={1}
          borderRadius="50%"
          w="100px"
          h="100px"
          bottom="-50px"
          right="0"
        >
          <Text fontSize="md" fontWeight="semibold">
            <TimeIcon fontSize="xl" />{" "}
            {recipe.timers.reduce((a, b) => a + b, 0)} min
          </Text>
        </Flex>
      </Box>
      <Box
        bgColor="red.50"
        borderRadius="md"
        px="10"
        py="6"
        overflow="hidden"
        fontSize="sm"
      >
        <Heading as="h5" size="md" mb={4}>
          Ingredients
        </Heading>
        <List spacing={3} data-testid="ingredients-list">
          {recipe.ingredients.map((ingredient, ingredientIndex) => (
            <ListItem key={ingredientIndex}>
              <ListIcon as={StarIcon} color="red.400" />
              {ingredient.name.trim()}
            </ListItem>
          ))}
        </List>
      </Box>
      {recipe.originalURL && (
        <Flex mt="auto" justifyContent="flex-end">
          <Link
            href={recipe.originalURL}
            onClick={e => e.stopPropagation()}
            isExternal
            color="red.500"
          >
            See full recipe <ExternalLinkIcon mx="2px" />
          </Link>
        </Flex>
      )}
    </Flex>
  );
}

RecipeTile.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    timers: PropTypes.arrayOf(PropTypes.number).isRequired,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        quantity: PropTypes.string
      })
    ),
    originalURL: PropTypes.string
  })
};
