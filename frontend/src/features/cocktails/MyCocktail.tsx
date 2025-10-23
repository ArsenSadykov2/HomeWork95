import {Grid, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import { selectCocktails, selectCocktailsLoading } from "./cocktailsSlice.ts";
import {fetchAllCocktails} from "./cocktailsThunks.ts";
import Spinner from "../../components/Spinner/Spinner.tsx";
import CocktailItem from "./components/CocktailItem.tsx";
import {selectUser} from "../users/usersSlice.ts";

const MyCocktail = () => {
    const dispatch = useAppDispatch();
    const cocktails = useAppSelector(selectCocktails);
    const cocktailsFetchLoading = useAppSelector(selectCocktailsLoading);
    const user = useAppSelector(selectUser);

    useEffect(() => {
        dispatch(fetchAllCocktails());
    }, [dispatch]);

    const myCocktails = cocktails.filter(cocktail => {
        return user && cocktail.author && cocktail.author._id === user._id;
    });

    const handleCocktailsDelete = () => {
        dispatch(fetchAllCocktails());
    };

    return (
        <Grid container direction="column" spacing={2}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid>
                    <Typography variant='h4'>My Cocktails</Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {myCocktails.length} cocktail{myCocktails.length !== 1 ? 's' : ''}
                    </Typography>
                </Grid>
            </Grid>

            {cocktailsFetchLoading ? <Spinner/> :
                <>
                    {myCocktails.length > 0 ? (
                        <Grid container direction="row" spacing={1}>
                            {myCocktails.map(cocktail => (
                                <CocktailItem
                                    key={cocktail._id}
                                    name={cocktail.name}
                                    id={cocktail._id}
                                    recipe={cocktail.recipe}
                                    image={cocktail.image || undefined}
                                    ingredients={cocktail.ingredients}
                                    isPublished={cocktail.isPublished}
                                    showUnpublished={true}
                                    onDelete={handleCocktailsDelete}
                                    author={cocktail.author}
                                />
                            ))}
                        </Grid>
                    ) : (
                        <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                            {user ? 'You have no cocktails yet' : 'Please log in to see your cocktails'}
                        </Typography>
                    )}
                </>
            }
        </Grid>
    );
};

export default MyCocktail;