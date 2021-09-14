import React, {useEffect, useState} from "react";
import {Box, Grid} from "@chakra-ui/react";
import {getRecipes} from "./RecipesApi";
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

export default function Recipes() {
    let history = useHistory();
    const [page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useInfiniteScroll(handlePageChange);
    const [pageCount, setPageCount] = useState(() => getRecipes({}, response => {
        setPageCount(response.pageCount)
    }))
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getRecipes({page: page}, response => setRecipes(previousData =>  [...previousData, ...response.recipes]))
        setIsFetching(false);
    }, [page, setRecipes, setIsFetching]);

    function handlePageChange() {
        setTimeout(() => {
            if (page < pageCount) setPage(page + 1)
        }, 1000);
    }

    return <Grid templateColumns="repeat(3, 1fr)" gap={10} m={10}>
        {
            recipes.map((recipe, index) => <Box key={index} onClick={() => history.push(`/recipe/${recipe.name}`)} h="95vh" transition=".3s" boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px" _hover={{transform: "scale(1.03)"}}>
                {recipe.name}
            </Box>)
        }
        {isFetching && (page < pageCount) && 'Fetching more list items...'}
        {page === pageCount && "That's it!"}
    </Grid>
}