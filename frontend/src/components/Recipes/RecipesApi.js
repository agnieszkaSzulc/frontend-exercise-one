import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080/';

export function getRecipes(params, callback) {
    axios.get('api/recipes', {
        params: params
    })
    .then(response => {
        callback(response.data.recipes)
    });
}