import React, {useEffect, useState} from "react";
import {Box, Grid} from "@chakra-ui/react";
import {getRecipes} from "./RecipesApi";
import {useHistory} from "react-router-dom/cjs/react-router-dom";

export default function Recipes({}) {
    let history = useHistory();
    const [page, setPage] = useState(1);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getRecipes({page: page}, response => setRecipes(previousData =>  [...previousData, ...response]))
    }, [page, setRecipes]);

    return <Grid templateColumns="repeat(3, 1fr)" gap={10} m={10}>
        {
            recipes.map((recipe, index) => <Box key={index} onClick={() => history.push(`/recipe/${recipe.name}`)} h="90vh" transition=".3s" boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px" _hover={{transform: "scale(1.03)"}}>
                {recipe.name}
            </Box>)
        }
        <button onClick={() => setPage(page + 1)}>Load More</button>
    </Grid>
}