import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Chip,
    Grid,
    IconButton,
    Typography,
    useTheme
} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import NotFoundPic from '../../../../../../HomeWork95/frontend/src/assets/images/NotFoundPic.png';
import {apiUrl} from "../../../../globalConstants.ts";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../users/usersSlice.ts";
import type {User} from "../../../types";
import {selectCocktailDeleteLoading, selectCocktailTogglePublishedLoading} from "../cocktailsSlice.ts";
import {deleteCocktail, toggleCocktailPublished} from "../cocktailsThunks.ts";

interface Props {
    id: string,
    name: string,
    recipe: string,
    image: string | undefined,
    ingredients: {
        name: string;
        amount: string;
    }[],
    isPublished?: boolean,
    showUnpublished?: boolean | null,
    onDelete?: () => void;
    author?: User;
}

const CocktailItem: React.FC<Props> = ({id,name,recipe,image,ingredients,isPublished,showUnpublished,onDelete,author}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const deleteCocktailLoading = useAppSelector(selectCocktailDeleteLoading);
    const togglePublishedLoading = useAppSelector(selectCocktailTogglePublishedLoading);
    const theme = useTheme();
    let cardImage = NotFoundPic;

    if (image) {
        cardImage = apiUrl + '/' + image;
    }

    const isAdmin = user && user.role === 'admin';
    const isAuthor = user && author && author._id === user._id;
    const canChangePublish = isAdmin || isAuthor;
    const canDelete = isAdmin || isAuthor;

    const handleDeleteClick = async () => {
        if (!id) return;

        try {
            await dispatch(deleteCocktail(id)).unwrap();
            if (onDelete) {
                onDelete();
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const handleTogglePublished = async () => {
        if (!id) return;

        if (!canChangePublish) {
            toast.error('You do not have permission to publish cocktails. Please contact administrator.');
            return;
        }

        try {
            await dispatch(toggleCocktailPublished(id)).unwrap();
            toast.success(`Cocktail successfully ${isPublished ? 'unpublished' : 'published'}`);
        } catch (error) {
            console.error('Patch error:', error);
            toast.error('Error changing publication status');
        }
    };

    return (
        <Grid size={{xs: 6, sm: 12, md: 6, lg: 4}}>
            <Card
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows[8],
                        '& .card-media': {
                            transform: 'scale(1.05)'
                        }
                    }
                }}
            >
                {showUnpublished && !isPublished && (
                    <Chip
                        label="Unpublished"
                        color="warning"
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            zIndex: 10,
                            backgroundColor: theme.palette.warning.main,
                            color: 'white'
                        }}
                    />
                )}
                <Box sx={{position: 'relative', overflow: 'hidden'}}>
                    <CardMedia
                        className="card-media"
                        component="img"
                        height="220"
                        image={cardImage}
                        alt={name}
                        sx={{
                            transition: 'transform 0.3s ease-in-out',
                            objectFit: 'cover'
                        }}
                    />
                </Box>

                <CardHeader
                    title={
                        <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                                fontWeight: 600,
                                lineHeight: 1.5,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                minHeight: '60px'
                            }}
                        >
                            {name}
                        </Typography>
                    }
                    sx={{pb: 0}}
                />

                <CardContent sx={{flexGrow: 1, py: 1}}>
                    <Box sx={{mb: 2}}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            Ingredients:
                        </Typography>
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                            {ingredients.slice(0, 3).map((ingredient, index) => (
                                <Chip
                                    key={index}
                                    label={`${ingredient.name} - ${ingredient.amount}`}
                                    size="small"
                                    variant="outlined"
                                    sx={{fontSize: '0.7rem'}}
                                />
                            ))}
                            {ingredients.length > 3 && (
                                <Chip
                                    label={`+${ingredients.length - 3} more`}
                                    size="small"
                                    color="primary"
                                    sx={{fontSize: '0.7rem'}}
                                />
                            )}
                        </Box>
                    </Box>

                    {recipe && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 1,
                                color: 'text.secondary'
                            }}
                        >
                            <LocalBarIcon fontSize="small" />
                            <Typography
                                variant="body2"
                                sx={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                            >
                                {recipe}
                            </Typography>
                        </Box>
                    )}

                    {author && (
                        <Typography variant="caption" color="text.secondary" display="block" sx={{mt: 1}}>
                            Author: {author.displayName || author.username}
                        </Typography>
                    )}
                </CardContent>

                <CardActions sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1}}>
                    <IconButton
                        component={Link}
                        to={'/cocktails/' + id}
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: 'white',
                            '&:hover': {
                                backgroundColor: theme.palette.primary.dark,
                                transform: 'scale(1.2)'
                            }
                        }}
                    >
                        <ArrowForwardIcon/>
                    </IconButton>

                    {(canChangePublish || canDelete) && (
                        <Box sx={{display: 'flex', gap: 1}}>
                            {canChangePublish && (
                                <Button
                                    variant="contained"
                                    startIcon={isPublished ? <UnpublishedIcon/> : <PublishIcon/>}
                                    onClick={handleTogglePublished}
                                    disabled={togglePublishedLoading}
                                    color={isPublished ? "warning" : "success"}
                                    size="small"
                                >
                                    {isPublished ? "Unpublish" : "Publish"}
                                </Button>
                            )}
                            {canDelete && (
                                <Button
                                    variant="outlined"
                                    startIcon={<DeleteIcon/>}
                                    onClick={handleDeleteClick}
                                    disabled={deleteCocktailLoading}
                                    color="error"
                                    size="small"
                                >
                                    Delete
                                </Button>
                            )}
                        </Box>
                    )}
                </CardActions>
            </Card>
        </Grid>
    );
};

export default CocktailItem;