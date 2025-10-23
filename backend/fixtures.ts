import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import {randomUUID} from "node:crypto";



const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try{
        await db.dropCollection('users');
    } catch (e){
        console.log('Connections were not present');
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


    await db.close();
};

run().catch(console.error);