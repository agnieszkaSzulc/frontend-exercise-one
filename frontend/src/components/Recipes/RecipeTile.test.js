import { screen, render } from "@testing-library/react";
import RecipeTile from "./RecipeTile";

const recipe = {
  name: "Curried Lentils and Rice",
  ingredients: [
    {
      quantity: "1 quart",
      name: "beef broth",
      type: "Misc"
    },
    {
      quantity: "1 cup",
      name: "dried green lentils",
      type: "Misc"
    },
    {
      quantity: "1/2 cup",
      name: "basmati rice",
      type: "Misc"
    },
    {
      quantity: "1 tsp",
      name: "curry powder",
      type: "Condiments"
    },
    {
      quantity: "1 tsp",
      name: "salt",
      type: "Condiments"
    }
  ],
  steps: [
    "Bring broth to a low boil.",
    "Add curry powder and salt.",
    "Cook lentils for 20 minutes.",
    "Add rice and simmer for 20 minutes.",
    "Enjoy!"
  ],
  timers: [0, 0, 20, 20, 0],
  imageURL:
    "http://dagzhsfg97k4.cloudfront.net/wp-content/uploads/2012/05/lentils3.jpg"
};

test("renders without crashing with no data", () => {
  render(<RecipeTile />);
});

test("renders given data", () => {
  render(<RecipeTile recipe={recipe} identifier={1} />);
  const title = screen.getByText(recipe.name);
  const img = screen.getByAltText(recipe.name);
  const time = screen.getByText(
    `${recipe.timers.reduce((a, b) => a + b, 0)} min`
  );
  const ingredientsList = screen.getByTestId("ingredients-list");
  expect(img).toBeInTheDocument();
  expect(time).toBeInTheDocument();
  expect(ingredientsList.querySelectorAll("li").length).toEqual(
    recipe.ingredients.length
  );
});

test("handles original url rendering", () => {
  render(<RecipeTile recipe={recipe} identifier={1} />);
  let externalLink = screen.queryByText("See full recipe");
  expect(externalLink).toBeNull();
  render(
    <RecipeTile
      recipe={{ ...recipe, originalURL: "some.url" }}
      identifier={1}
    />
  );
  externalLink = screen.getByText("See full recipe");
  expect(externalLink).toBeInTheDocument();
  expect(externalLink).toHaveAttribute("href", recipe.originalURL);
});
