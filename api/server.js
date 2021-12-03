const express = require('express');
const server = express();
const actionsRoutes = require('./actions/actions-router');
const projectsRoutes = require('./projects/projects-router');


// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json())
server.use('/api/projects', projectsRoutes)
server.use('/api/actions', actionsRoutes)

server.get('/', (req, res) => {
    res.send("<h1>I'm crushing this spring challenge!</h1>")
})

module.exports = server;
