import {Grid, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import { selectCocktails, selectCocktailsLoading } from "./cocktailsSlice.ts";
import Spinner from "../../components/Spinner/Spinner.tsx";
import {useParams} from "react-router-dom";
import {selectUser} from "../users/usersSlice.ts";
import {fetchAllCocktails, fetchCocktailById} from "./cocktailsThunks.ts";
import CocktailItem from "./components/CocktailItem.tsx";

const Cocktails = () => {
    const dispatch = useAppDispatch();
    const cocktails = useAppSelector(selectCocktails);
    const cocktailsFetchLoading = useAppSelector(selectCocktailsLoading);
    const user = useAppSelector(selectUser);

    const {id} = useParams();

    useEffect(() => {
         dispatch(fetchAllCocktails())
    }, [dispatch])

    const filteredCocktails = cocktails.filter(cocktail => {
        if (user && user.role === 'admin') {
            return true;
        }
        else if (cocktail.isPublished) {
            return true;
        }
        else if (user && cocktail.author && cocktail.author._id === user._id) {
            return true;
        }

        return false;
    });

    const handleCocktailsDelete = () => {
        if(id) {
            dispatch(fetchCocktailById(id));
        }
    };

    return (
        <Grid container direction="column" spacing={2}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid>
                    <Typography variant='h4'>Cocktails</Typography>
                </Grid>
            </Grid>

            {cocktailsFetchLoading ? <Spinner/> :
                <>
                    {filteredCocktails.length > 0 ? (
                        <Grid container direction="row" spacing={1}>
                            {filteredCocktails.map(cocktail => (
                                <CocktailItem
                                    key={cocktail._id}
                                    name={cocktail.name}
                                    id={cocktail._id}
                                    recipe={cocktail.recipe}
                                    image={cocktail.image || undefined}
                                    ingredients={cocktail.ingredients}
                                    isPublished={cocktail.isPublished}
                                    showUnpublished={user?.role === 'admin' ||
                                        (user && cocktail.author && cocktail.author._id === user._id)}
                                    onDelete={handleCocktailsDelete}
                                    author={cocktail.author}
                                />
                            ))}
                        </Grid>
                    ) : (
                        <Typography variant="h6" color="text.secondary">
                            No cocktails found
                        </Typography>
                    )}
                </>
            }
        </Grid>
    );
};

export default Cocktails;