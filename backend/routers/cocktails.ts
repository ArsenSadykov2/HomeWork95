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

cocktailsRouter.post("/",auth,imagesUpload.single('image'), async (req, res, next) => {
    try {
        const authorId = (req as RequestWithUser).user._id;

        if (!authorId) {
            return res.status(401).send({ message: 'User not found' });
        }
        const name = req.body.name;
        const ingredients = req.body.ingredients;
        const author = authorId;
        const recipe = req.body.recipe;

        const newCocktail = new Cocktail({
            name, ingredients, author, recipe,
            image: req.file ? 'images/' + req.file.filename : null,
        })
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
    try{
        if(!req.params.id){
            res.status(404).send("Not Found");
            return;
        }
        const {id} = req.params;

        const cocktail = await Cocktail.find({author: id})
            .populate("author", "username _id")
        if(!cocktail){
            res.status(404).send("Not Found");
            return;
        }
        res.status(200).send(cocktail);
    } catch (e){
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

cocktailsRouter.patch("/:id/togglePublished", auth, permit('admin'), async (req, res, next) => {
    try{
        if(!req.params.id){
            res.status(404).send("Not Found");
            return;
        }
        const {id} = req.params;
        const cocktail = await Cocktail.findById(id);
        if(!cocktail) {
            res.status(404).send("Not Found");
            return;
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
