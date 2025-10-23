import mongoose from "mongoose";

const CocktailSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
    recipe: String,
    isPublished: {
        type: Boolean,
        default: false,
        required: true,
    },
    ingredients: [{
        name: {
            type: String,
            required: true
        },
        amount: {
            type: String,
            required: true
        }
    }]
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);
export default Cocktail;