var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
 	connection.query('SELECT * FROM usuarios', function (error, resultado, fields) {
		if (error) throw error;
		res.send(JSON.stringify(resultado));
	});
});

module.exports = router;

