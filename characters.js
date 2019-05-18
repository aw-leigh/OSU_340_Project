module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function serveCharacters(req, res){
        var query = `SELECT Characters.Name, Characters.Race, Characters.Alignment, Planets.Name AS "PlanetName"
                    FROM Characters 
                    INNER JOIN Planets ON Characters.Planet = Planets.ID
                    ORDER BY Characters.Name`
        var mysql = req.app.get('mysql');
        var context = {};

        //execute the sql query
        mysql.pool.query(query, (error, results) =>{
          console.log(error)
          console.log(results)
          //take the results of that query and store ti inside context
          context.characters = results;

          //pass it to handlebars to put inside a file
          res.render('characters', context)
        })

        //res.send('Here you go!');
    }

    router.get('/', serveCharacters);
    return router;
}();
