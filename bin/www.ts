#!/usr/bin/env node

/**
 * Module dependencies.
 */

import {Server} from "../app"
/* TS import */

/**
 * Database
 * @MongoDB Mongoose
 * @Mysql Sequelize
 * @type {{}|{}}
 */

const server = new Server();

server.listen(port => {
    console.log(`Server is listening on http://localhost:${port}`);
});