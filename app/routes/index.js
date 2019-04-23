//MASTER ROUTE FILE

const nodeRoutes = require('./bot_routes');

module.exports = function(app, db) {
    nodeRoutes(app, db)
}