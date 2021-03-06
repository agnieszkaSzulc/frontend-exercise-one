## dev setup & run

1. `make dev-build`
2. `make dev-start`

It requires you to install Docker on your machine.

It provides **API** (Node.js / Express in `api/` directory) with auto reload on file edit and **Frontend** (Create-React-App in `frontend/` directory) with hot-module-reload.
This is a good starting point for a new project.
Example API endpoint & API call from frontend is also provided in code.

## Exercise

Example data to use
https://raw.githubusercontent.com/raywenderlich/recipes/master/Recipes.json

1. Normalize data, add ids etc.

2. Create an API (Node.js / Express) which:
- will return a list of all possible unique ingredients (variations of a products can be treated as unique ones)
- will return a list of all possible unique ingredients types (baking/drinks etc)
- will return a list of all possible recipes (with support for pagination)
- will return all of the recipes that uses provided products
- will return all of the recipes that total cook time (sum of a timers) will not exceed provided value
- will return one recipe by provided id

3. UI. 
Please use React.js and selected UI Kit (we use Chakra internally so it is preferred one).
The UI should contain two views:
- List of all possible recipes, you can show only 3 recipes at the same time (use infinite scroll or pagination).
Every recipe should contain picture, name, ingredients, total cook time and source url.
There should be also the possibility to filter recipes by ingredients type (multi select), ingredients (multi select - it should contain only results corresponding to the previous selection) and total cook time.
- Extended view of selected recipe containing all of the data in readable way.

4. Please fork this repo and commit at every important step, git history is also important for us. When you will be finished, create a PR with your implementation and contact us.
