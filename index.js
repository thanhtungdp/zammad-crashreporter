const db = require("./src/db");
const conf = require("./config");

db.init(conf.sqliteDb);

const server = require("./src/server");