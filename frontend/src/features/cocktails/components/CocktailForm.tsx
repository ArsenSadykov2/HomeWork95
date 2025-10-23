import {Button, TextField, IconButton} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useState} from "react";
import type {CocktailMutation} from "../../../types";
import Spinner from "../../../components/Spinner/Spinner.tsx";
import FileInput from "../../../components/FileInput/FileInput.tsx";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    onSubmitCocktail: (cocktail: CocktailMutation) => void;
    loading: boolean;
}

const CocktailForm: React.FC<Props> = ({onSubmitCocktail, loading}) => {
    const [form, setForm] = useState<CocktailMutation>({
        author: '',
        name: '',
        recipe: '',
        image: null,
        isPublished: false,
        ingredients: [{
            name: '',
            amount: '',
        }],
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmitCocktail({...form});
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const onIngredientChange = (index: number, field: 'name' | 'amount', value: string) => {
        const updatedIngredients = form.ingredients.map((ingredient, i) =>
            i === index ? { ...ingredient, [field]: value } : ingredient
        );
        setForm({ ...form, ingredients: updatedIngredients });
    };

    const addIngredient = () => {
        setForm({
            ...form,
            ingredients: [...form.ingredients, { name: '', amount: '' }]
        });
    };

    const removeIngredient = (index: number) => {
        if (form.ingredients.length > 1) {
            const updatedIngredients = form.ingredients.filter((_, i) => i !== index);
            setForm({ ...form, ingredients: updatedIngredients });
        }
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;

        if(files) {
            setForm(prevState => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    };

    return (
        <form onSubmit={onSubmit} style={{ width: "50%", margin: "0 auto" }}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{ width: "100%"}}
                        id="name"
                        label="Name"
                        name="name"
                        value={form.name}
                        onChange={onInputChange}
                        disabled={loading}
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}} style={{ width: "100%" }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h3>Ingredients</h3>
                        <Button
                            startIcon={<AddIcon />}
                            onClick={addIngredient}
                            color="primary"
                            variant="outlined"
                            disabled={loading}
                        >
                            Add Ingredient
                        </Button>
                    </div>

                    {form.ingredients.map((ingredient, index) => (
                        <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                            <TextField
                                style={{ flex: 2 }}
                                label="Ingredient Name"
                                value={ingredient.name}
                                onChange={(e) => onIngredientChange(index, 'name', e.target.value)}
                                disabled={loading}
                                required
                            />
                            <TextField
                                style={{ flex: 1 }}
                                label="Amount"
                                value={ingredient.amount}
                                onChange={(e) => onIngredientChange(index, 'amount', e.target.value)}
                                disabled={loading}
                                required
                            />
                            <IconButton
                                onClick={() => removeIngredient(index)}
                                disabled={loading || form.ingredients.length === 1}
                                color="error"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    ))}
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{ width: "100%"}}
                        multiline
                        rows={3}
                        id="recipe"
                        label="Recipe"
                        name="recipe"
                        value={form.recipe}
                        onChange={onInputChange}
                        disabled={loading}
                    />
                </Grid>
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <FileInput
                        name="image"
                        label="Image"
                        onChange={fileInputChangeHandler}
                        disabled={loading}
                    />
                </Grid>
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <Button
                        style={{ width: "100%"}}
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={loading}
                    >
                        {loading ? <Spinner /> : "Create"}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default CocktailForm;