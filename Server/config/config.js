const db_req = require('./db.js');

module.exports = {
    host: '127.0.0.1',
    port: 80,
    db: db_req.db,
    log_file: "log.txt"
}

