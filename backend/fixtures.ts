import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Cocktail from "./models/Cocktail";
import {randomUUID} from "node:crypto";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try{
        await db.dropCollection('users');
        await db.dropCollection('cocktails');
    } catch (e){
        console.log('Collections were not present');
    }

    const adminUser = await User.create({
        username: 'Admin',
        email: 'Admin@mail.com',
        password: '123',
        displayName: 'Admin',
        role: 'admin',
        token: randomUUID(),
    });

    const userUser = await User.create({
        username: 'User',
        email: 'User@mail.com',
        password: '123',
        displayName: 'User',
        role: 'user',
        token: randomUUID(),
    });

    await Cocktail.create([
        {
            author: adminUser._id,
            name: "Mojito",
            recipe: "Mix mint leaves with sugar and lime juice. Add rum and top with club soda. Garnish with mint sprig.",
            isPublished: true,
            image: 'fixtures/img_1.png',
            ingredients: [
                { name: "White rum", amount: "50 ml" },
                { name: "Fresh mint leaves", amount: "10 leaves" },
                { name: "Lime", amount: "1 piece" },
                { name: "Sugar", amount: "2 teaspoons" },
                { name: "Club soda", amount: "100 ml" }
            ]
        }
    ]);

    await Cocktail.create([
        {
            author: userUser._id,
            name: "Margarita",
            recipe: "Shake tequila, lime juice and triple sec with ice. Strain into salt-rimmed glass.",
            isPublished: true,
            image: 'fixtures/img.png',
            ingredients: [
                { name: "Tequila", amount: "50 ml" },
                { name: "Triple sec", amount: "25 ml" },
                { name: "Lime juice", amount: "25 ml" },
                { name: "Salt", amount: "for rim" }
            ]
        }
    ]);

    await db.close();
};

run().catch(console.error);