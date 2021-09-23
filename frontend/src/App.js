import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Recipes from "./components/Recipes/Recipes";
import Recipe from "./components/Recipe/Recipe";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Recipes />
          </Route>
          <Route path="/recipe/:name">
            <Recipe />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
