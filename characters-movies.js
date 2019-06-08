module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function serveCharactersMovies(req, res){
        var query = `SELECT Characters.ID AS "CHARID", Characters.Name AS "CHARNAME", Movies.Name AS "MOVIENAME", Movies.ID AS "MOVIEID"
                    FROM Characters 
                    INNER JOIN Characters_Movies ON Characters.ID = Characters_Movies.char_id
                    INNER JOIN Movies ON Movies.ID = Characters_Movies.movie_id
                    ORDER BY Characters.Name`
        var mysql = req.app.get('mysql');
        var context = {};

        //execute the sql query
        mysql.pool.query(query, (error, results) =>{
          console.log(error)
          console.log(results)
          //take the results of that query and store it inside context
          context.charactersMovies = results;

          //pass it to handlebars to put inside a file
          res.render('characters-movies', context)
        })

        //res.send('Here you go!');
    }

    router.get('/', serveCharactersMovies);

    return router;
}();