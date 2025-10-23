import express from "express";
import {Error} from "mongoose";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import Cocktail from "../models/Cocktail";

const cocktailsRouter = express.Router();

cocktailsRouter.get("/", async (req, res, next) => {
    try{
        const filter = req.query.author ? {author: req.query.author} : {};
        const cocktails = await Cocktail.find(filter)
            .populate("author", "username _id")
            .populate("ingredients", "name amount");
        res.json(cocktails);
    } catch (e) {
        next(e);
    }
});

cocktailsRouter.post("/", auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        const authorId = (req as RequestWithUser).user._id;
        const { name, recipe, ingredients } = req.body;

        const newCocktail = new Cocktail({
            name,
            recipe,
            author: authorId,
            ingredients: JSON.parse(ingredients),
            image: req.file ? 'images/' + req.file.filename : null,
        });

        await newCocktail.save();
        res.status(200).send(newCocktail);
    } catch (error) {
        if(error instanceof Error.ValidationError || error instanceof Error.CastError) {
            res.status(400).send(error);
            return;
        }
        next (error);
    }
});

cocktailsRouter.get("/:id", async (req, res, next) => {
    try {
        if (!req.params.id) {
            res.status(404).send("Not Found");
            return;
        }
        const { id } = req.params;

        const cocktail = await Cocktail.findById(id)
            .populate("author", "username displayName _id");

        if (!cocktail) {
            res.status(404).send("Not Found");
            return;
        }
        res.status(200).send(cocktail);
    } catch (e) {
        next(e);
    }
});

cocktailsRouter.delete("/:id",auth, permit('admin'), async (req, res, next) => {
    try{
        if(!req.params.id){
            res.status(404).send("Not Found");
            return;
        }
        const {id} = req.params;
        const cocktail = await Cocktail.findByIdAndDelete(id);
        if(!cocktail) {
            res.status(404).send("Not Found");
            return;
        }
        res.send({message: "Cocktail deleted successfully."});
    } catch (e) {
        next(e);
    }
});

cocktailsRouter.patch("/:id/togglePublished", auth, async (req, res, next) => {
    try{
        if(!req.params.id){
            res.status(404).send("Not Found");
            return;
        }
        const {id} = req.params;
        const user = (req as RequestWithUser).user;

        const cocktail = await Cocktail.findById(id);
        if(!cocktail) {
            res.status(404).send("Not Found");
            return;
        }

        const isAdmin = user.role === 'admin';
        const isAuthor = cocktail.author.toString() === user._id.toString();

        if (!isAdmin && !isAuthor) {
            return res.status(403).send({error: "You do not have permission"});
        }

        cocktail.isPublished = !cocktail.isPublished;
        await cocktail.save();

        res.send({
            message: `Cocktail ${cocktail.isPublished ? 'published' : 'unpublished'} successfully`,
            cocktail: cocktail
        });

    } catch (e) {
        next(e)
    }
});



export default cocktailsRouter;
