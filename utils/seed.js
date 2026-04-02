import mongoose from "mongoose";
import authors from './authors.json' with { type: "json" };
import books from './books.json' with { type: "json" };
import { connectDB } from "../db/connectDB.js";
import Author from "../models/Author.js";
import Book from "../models/Book.js";
import "dotenv/config";

class SeedDatabase{
    constructor () {
        this.authors = authors;
        this.connect = connectDB;
        this.books = books;
    }
    async connectToDB () {
        console.log("Connecting to database .... ⌛⌛");
        await this.connect(process.env.MONGO_URI);
        console.log("Connected to database 👍🏾✅");
    };

    async seedAuthors () {
        try{
            await this.connectToDB();
        
            console.log("Seeding authors into database ⌛⌛");
            for (let i = 0; i < authors.length; i++) {
                console.log(`Seeding author at position ${i} ⌛⌛`);
                const author = authors[i];
                const { name, bio } = author;
                const authorExists = await Author.findOne({name});
                if ( authorExists ) {
                    console.log(`Author at position ${i} already seeded 👍🏾✅`);
                    continue;
                };
                await Author.create({name, bio});
                console.log(`Seeded author id: ${i} 👍🏾✅`);
            };
            console.log("Seeding into database completed!!!! ✅✅✅✅✅");
            
            return 1
        } catch (err) {
            console.log(err);
            return 0;
        };
    };
    async seedBooks () {
        try {
            // Connect to datavase;
            await this.connectToDB();
            //   Seeding books.
            console.log("Seeding books into database ⌛⌛");
            outerloop: for (let i = 0; i < books.length; i++) {
                console.log(`Seeding book at position ${i} ⌛⌛`);
                const book = books[i];
                const { title, isbn, thumbnail, authors, status } = book;
                const authorIDs = [];
                innerloop: for (const author of authors) {
                    const authorExists = await Book.findOne({name: author.trim().toLowerCase()});
                    if ( !authorExists ) {
                        console.log(`Author at position ${i} not seeded yet. Add to database and continue. 👍🏾✅`);
                        continue outerloop;
                    };

                    authorIDs.push(authorExists._id);
                };
                const bookExists = await Author.findOne({title: title.trim().toLowerCase()});
                if ( bookExists ) {
                    console.log(`Book at position ${i} already seeded 👍🏾✅`);
                    continue;
                };
                await Book.create({title, isbn, thumbnail, authors: authorIDs, status: "IN"});
                console.log(`Seeded author id: ${i} 👍🏾✅`);
            };
            console.log("Seeding into database completed!!!! ✅✅✅✅✅");
            
        } catch (err) {
            console.log(err);
            return 0;
        };
    };
};

new SeedDatabase().seedBooks().then(data => {
    console.log(data);
    process.exit(0);
}).catch(err => {
    console.log(err);
    process.exit(1);
});
