require('dotenv').config();
const {ApolloServer} = require('apollo-server-express');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const MongoDB = process.env.MONGODB
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const server = new ApolloServer({
    typeDefs,
    resolvers
})
//app.use(graphqlUploadExpress());
async function startServer() {
    await server.start(); // Ensure Apollo Server is fully started
    server.applyMiddleware({ app }); // Apply middleware to Express app
    mongoose.connect(MongoDB, { useNewUrlParser: true})
        .then(() => {
            console.log('Connected');
            return app.listen({ port: 5000 }, () => {
                console.log("http://localhost:5000"+server.graphqlPath);
            });
        })
        .catch((err) => {
            console.log('error', 'Error:', err);
        });
}

startServer();