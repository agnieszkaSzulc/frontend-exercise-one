import cors from "cors";
import express from "express";
import { recipes } from "./sample_data.js";
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const RECIPES_PER_PAGE = 3;

app.get("/ingredients", (req, res) => {
  const uniqueIngredients = [
    ...new Set(
      recipes.flatMap(recipe =>
        recipe.ingredients.map(ingredient => ingredient.name.trim())
      )
    )
  ].sort();
  res.json(uniqueIngredients);
});

app.get("/ingredient_types", (req, res) => {
  const uniqueIngredientTypes = [
    ...new Set(
      recipes.flatMap(recipe =>
        recipe.ingredients.map(ingredient => ingredient.type)
      )
    )
  ].sort();
  res.json(uniqueIngredientTypes);
});

app.get("/recipes", (req, res) => {
  let result = recipes;
  if (req.query.ingredients) {
    result = result.filter(recipe =>
      recipe.ingredients
        .map(i => i.name)
        .some(i => req.query.ingredients.includes(i))
    );
  }
  if (req.query.ingredientTypes) {
    result = result.filter(recipe =>
      recipe.ingredients
        .map(i => i.type)
        .some(i => req.query.ingredientTypes.includes(i))
    );
  }
  if (req.query.cookTime > 0) {
    result = result.filter(
      recipe => recipe.timers.reduce((a, b) => a + b, 0) <= req.query.cookTime
    );
  }

  const pageCount = Math.ceil(result.length / RECIPES_PER_PAGE);
  let page = parseInt(req.query.page);
  if (!page) {
    page = 1;
  }
  if (page > pageCount) {
    page = pageCount;
  }

  res.json({
    pageCount: pageCount,
    totalRecipes: result.length,
    recipes: result.slice(
      page * RECIPES_PER_PAGE - RECIPES_PER_PAGE,
      page * RECIPES_PER_PAGE
    )
  });
});

app.get("/recipes/:id", (req, res) => {
  res.json(recipes.find(recipe => recipe.name === req.params.id));
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
