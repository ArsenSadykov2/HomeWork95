import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {fetchCocktailById} from "./cocktailsThunks.ts";
import {
    Box,
    CardMedia,
    Chip,
    Container,
    Grid,
    Typography
} from "@mui/material";
import Spinner from "../../components/Spinner/Spinner.tsx";
import LocalBarIcon from '@mui/icons-material/LocalBar';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NotFoundPic from '../../assets/images/NotFoundPic.png';
import {apiUrl} from "../../../globalConstants.ts";
import {selectCurrentCocktail, selectCurrentCocktailLoading} from "./cocktailsSlice.ts";

const FullCocktail = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const cocktail = useAppSelector(selectCurrentCocktail);
    const loading = useAppSelector(selectCurrentCocktailLoading);

    useEffect(() => {
        if (id) {
            dispatch(fetchCocktailById(id));
        }
    }, [id, dispatch]);

    if (loading) {
        return <Spinner/>;
    }

    if (!cocktail) {
        return (
            <Container maxWidth="md">
                <Typography variant="h4" textAlign="center" sx={{mt: 4}}>
                    Cocktail not found
                </Typography>
            </Container>
        );
    }

    const cardImage = cocktail.image ? apiUrl + '/' + cocktail.image : NotFoundPic;

    return (
        <Container maxWidth="lg" sx={{py: 3}}>
            <Grid container spacing={3}>
                <Grid size={{xs: 12, md: 4}}>
                    <CardMedia
                        component="img"
                        image={cardImage}
                        alt={cocktail.name}
                        sx={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '300px',
                            borderRadius: 2
                        }}
                    />
                </Grid>

                <Grid size={{xs: 12, md: 8}}>
                    <Box sx={{mb: 2}}>
                        <Typography variant="h4" component="h1" gutterBottom sx={{fontWeight: 'bold'}}>
                            {cocktail.name}
                        </Typography>

                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2, mb: 2}}>
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                <PersonIcon color="action"/>
                                <Typography variant="body1" color="text.secondary">
                                    By {cocktail.author.displayName || cocktail.author.username}
                                </Typography>
                            </Box>
                            {!cocktail.isPublished && (
                                <Chip
                                    label="Unpublished"
                                    color="warning"
                                    size="small"
                                />
                            )}
                        </Box>
                    </Box>

                    <Box>
                        <Typography variant="h5" gutterBottom sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 2}}>
                            <LocalBarIcon/>
                            Ingredients
                        </Typography>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                            {cocktail.ingredients.map((ingredient, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        py: 1,
                                        borderBottom: '1px solid #e0e0e0'
                                    }}
                                >
                                    <Typography variant="body1">
                                        {ingredient.name}
                                    </Typography>
                                    <Typography variant="body1" color="primary" sx={{fontWeight: 'medium'}}>
                                        {ingredient.amount}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Grid>

                <Grid size={12}>
                    <Box sx={{mt: 2}}>
                        <Typography variant="h5" gutterBottom sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 2}}>
                            <MenuBookIcon/>
                            Recipe
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                lineHeight: 1.6,
                                whiteSpace: 'pre-line',
                                p: 2,
                                backgroundColor: '#f5f5f5',
                                borderRadius: 1
                            }}
                        >
                            {cocktail.recipe}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default FullCocktail;