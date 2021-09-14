import cors from "cors"
import express from "express"
import {recipes} from "./sample_data.js"
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/ingredients", (req, res) => {
  const unique_ingredients = [...new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.name.trim())))].sort()
  res.json(unique_ingredients);
});

app.get("/ingredient_types", (req, res) => {
  const unique_ingredient_types = [...new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.type)))].sort()
  res.json(unique_ingredient_types);
});

app.get("/recipes", (req, res) => {
  let result = recipes
  const pageCount = Math.ceil(result.length / 3);
  let page = parseInt(req.query.page);
  if (!page) { page = 1;}
  if (page > pageCount) {
      page = pageCount
  }

  res.json({
    "pageCount": pageCount,
    "recipes": result.slice(page * 3 - 3, page * 3)
  });
});

app.get("/recipes/:id", (req, res) => {
  res.json(recipes.find(recipe => recipe.name === req.params.id));
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
