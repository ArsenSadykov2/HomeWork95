import { Typography } from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import type {CocktailMutation} from "../../types";
import {selectCocktailCreateLoading} from "./cocktailsSlice.ts";
import { createCocktail } from "./cocktailsThunks.ts";
import CocktailForm from "./components/CocktailForm.tsx";


const NewCocktail = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const createLoading = useAppSelector(selectCocktailCreateLoading);

    const onCreateNewCocktail = async (cocktail: CocktailMutation) => {
        try{
            await dispatch(createCocktail(cocktail)).unwrap();
            toast.success("Your cocktail is under review by the administration.");
            navigate("/");
        } catch (e) {
            console.error(e);
            toast.error("Error creating new album");
        }
    };
    return (
        <div>
            <Typography variant="h4" style={{textAlign: "center", marginBottom: "20px"}}>New Cocktail</Typography>
            <CocktailForm onSubmitCocktail={onCreateNewCocktail} loading={createLoading}/>
        </div>
    );
};

export default NewCocktail;