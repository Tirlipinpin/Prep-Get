var colors = require('colors');
var mysql = require('mysql');

const DB = exports.db_datas = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database : 'prep_get'
}

const BD_CONN = exports.connection = mysql.createConnection(DB);

// connect to your database
BD_CONN.connect(DB, function (err) {
    if (err)
    {
        console.log(colors.red("Bad MySQL config :\n" + JSON.stringify(err)));
        process.exit(1);
    }
});

