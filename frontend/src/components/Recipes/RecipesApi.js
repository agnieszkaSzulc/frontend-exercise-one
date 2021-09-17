import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/";

export function getRecipes(params, callback) {
  axios
    .get("api/recipes", {
      params: params
    })
    .then(response => {
      callback(response.data);
    });
}

export function getIngredientTypes(callback) {
  axios.get("api/ingredient_types").then(response => {
    callback(response.data);
  });
}

export function getIngredients(callback) {
  axios.get("api/ingredients").then(response => {
    callback(response.data);
  });
}
