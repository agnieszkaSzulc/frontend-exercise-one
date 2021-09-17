import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import {
  Box,
  Grid,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper
} from "@chakra-ui/react";
import Select from "react-select";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { getIngredients, getIngredientTypes, getRecipes } from "./RecipesApi";

export default function Recipes() {
  let history = useHistory();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState();
  const [totalRecipes, setTotalRecipes] = useState();
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchRecipes);
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

  const params = {
    page: page,
    ingredients: selectedIngredients.map(i => i.value),
    ingredientTypes: selectedIngredientTypes.map(t => t.value),
    cookTime: cookTime
  };

  useEffect(() => {
    getRecipes(params, response => {
      setRecipes(previousData =>
        recipes?.length >= totalRecipes
          ? response.recipes
          : [...previousData, ...response.recipes]
      );
      setPageCount(response.pageCount);
      setTotalRecipes(response.totalRecipes);
    });
    setIsFetching(false);
  }, [page]);

  useEffect(() => {
    getRecipes({ ...params, page: 1 }, response => {
      setRecipes(response.recipes);
      setTotalRecipes(response.totalRecipes);
    });
    setPage(1);
  }, [selectedIngredients, selectedIngredientTypes, cookTime]);

  function fetchRecipes() {
    setTimeout(() => {
      if (page < pageCount) {
        setPage(page + 1);
      }
    }, 1000);
  }

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={10} m={10}>
        <Box>
          <Select
            value={selectedIngredients}
            isMulti
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
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
      </Grid>

      <Grid templateColumns="repeat(3, 1fr)" gap={10} m={10}>
        {recipes?.map((recipe, index) => (
          <Box
            key={index}
            onClick={() => history.push(`/recipe/${recipe.name}`)}
            h="95vh"
            transition=".3s"
            boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
            _hover={{ transform: "scale(1.03)" }}
          >
            {recipe.name}
          </Box>
        ))}
        {isFetching && page < pageCount && "Fetching more list items..."}
        {page === pageCount && "That's it!"}
      </Grid>
    </>
  );
}
