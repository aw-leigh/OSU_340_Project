module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function servePlanets(req, res){
        var query = `SELECT NAME FROM Planets
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

    router.get('/', servePlanets);
    return router;
}();
