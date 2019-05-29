module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function servePlanets(req, res){
        var query = `SELECT NAME, ID FROM Planets
                     ORDER BY Planets.Name`;
        var mysql = req.app.get('mysql');
        var context = {};


        //execute the sql query
        mysql.pool.query(query, (error, results) =>{
          console.log(error)
          console.log(results)
          //take the results of that query and store ti inside context
          context.planets = results;

          //pass it to handlebars to put inside a file
          res.render('planets', context)
        })

        //res.send('Here you go!');
    }

    function getPlanet(res, mysql, context, id, complete) {
        var sql = `SELECT NAME, ID FROM Planets WHERE ID= ?`;
        //date needs to be in the above format to work with the HTML date input
        var inserts = [id];
        mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.planet = results[0];
            complete();
        });
    }

    router.get('/', servePlanets);

    router.get('/:id', function (req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedPhase.js", "updatePlanet.js"];
        var mysql = req.app.get('mysql');
        getPlanet(res, mysql, context, req.params.id, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('planets-update', context);
            }
        }
    });

    router.put('/:id', function (req, res) {
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE Planets SET Name=? WHERE ID=?";
        var inserts = [req.body.name, req.params.id];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.status(200);
                res.end();
            }
        });
    });

    return router;
}();
