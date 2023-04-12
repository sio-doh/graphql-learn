const express = require("express");
const app = express(); 
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";

app.get("/", (req, res) => {
    res.send("GraphQL is quite lovely!");
});

const root = { product: () => {
    return {
        "id": 123456, 
        "name": "widget", 
        "description": "A very lovely garden widget", 
        "price": 19.99, 
        "soldout": false 
    } 
}};

app.use("/graphql", graphqlHTTP({
    schema: schema, 
    rootValue: root,
    graphiql: true
}));

app.listen(8080, () => console.log("Running server on port localhost:8080/graphql"));
