import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/";

export function getRecipe(recipeId, callback) {
  axios.get(`api/recipe/${recipeId}`).then(response => {
    callback(response.data);
  });
}
