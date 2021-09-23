import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spinner
} from "@chakra-ui/react";
import Select from "react-select";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { getIngredients, getIngredientTypes, getRecipes } from "./RecipesApi";
import RecipeTile from "./RecipeTile";

export default function Recipes() {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState();
  const [totalRecipes, setTotalRecipes] = useState();

  const loadRecipes = useCallback(() => {
    setTimeout(() => {
      if (page < pageCount) {
        setPage(page + 1);
      }
    }, 1000);
  }, [page, pageCount]);

  const [isFetching, setIsFetching] = useInfiniteScroll(loadRecipes);
  const [ingredients, setIngredients] = useState(() =>
    getIngredients(response => setIngredients(response))
  );
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientTypes, setIngredientTypes] = useState(() =>
    getIngredientTypes(response => setIngredientTypes(response))
  );
  const [selectedIngredientTypes, setSelectedIngredientTypes] = useState([]);
  const [cookTime, setCookTime] = useState();
  const [recipes, setRecipes] = useState([]);

  const params = useMemo(() => {
    return {
      page: page,
      ingredients: selectedIngredients.map(i => i.value),
      ingredientTypes: selectedIngredientTypes.map(t => t.value),
      cookTime: cookTime
    };
  }, [page, selectedIngredients, selectedIngredientTypes, cookTime]);

  useEffect(() => {
    fetchRecipes(params, response => {
      setPageCount(response.pageCount);
      setTotalRecipes(response.totalRecipes);
    });
  }, [params]);

  useEffect(() => {
    fetchRecipes(params, response => {
      setRecipes(previousData =>
        recipes?.length >= totalRecipes
          ? response.recipes
          : [...previousData, ...response.recipes]
      );
    });
    setIsFetching(false);
  }, [page, params, setIsFetching]);

  useEffect(() => {
    fetchRecipes({ ...params, page: 1 }, response => {
      setRecipes(response.recipes);
      setTotalRecipes(response.totalRecipes);
    });
    setPage(1);
  }, [selectedIngredients, selectedIngredientTypes, cookTime]);

  function fetchRecipes(parameters, callback) {
    getRecipes({ ...parameters }, response => callback(response));
  }

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={10} m={10}>
        <Box>
          <Select
            value={selectedIngredients}
            isMulti
            placeholder="Select ingredients"
            onChange={setSelectedIngredients}
            options={ingredients?.map(ingredient => {
              let option = {};
              option.label = ingredient;
              option.value = ingredient;
              return option;
            })}
          />
        </Box>
        <Box>
          <Select
            value={selectedIngredientTypes}
            isMulti
            placeholder="Select ingredients types"
            onChange={setSelectedIngredientTypes}
            options={ingredientTypes?.map(type => {
              let option = {};
              option.label = type;
              option.value = type;
              return option;
            })}
          />
        </Box>
        <Box>
          <NumberInput
            value={cookTime}
            onChange={(_, valueAsNumber) => setCookTime(valueAsNumber)}
          >
            <NumberInputField placeholder="Set total cook time" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
      </Grid>

      <Grid templateColumns="repeat(3, 1fr)" gap={10} m={10} p={10}>
        {recipes?.map((recipe, index) => (
          <RecipeTile recipe={recipe} key={index} />
        ))}
      </Grid>
      {isFetching && page < pageCount && (
        <Flex justifyContent="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="red.600"
            size="xl"
          />
        </Flex>
      )}
    </>
  );
}
