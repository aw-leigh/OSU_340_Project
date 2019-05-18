module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function serveMovies(req, res){
        //date formatting reference - http://www-db.deis.unibo.it/courses/TW/DOCS/w3schools/sql/func_date_format.asp.html
        var query = `SELECT Movies.Name AS "MovieName", 
                     DATE_FORMAT(Movies.Release_Date, '%M %e, %Y') AS "ReleaseDate",
                     Movies.Phase FROM Movies`
        var mysql = req.app.get('mysql');
        var context = {};

        //execute the sql query
        mysql.pool.query(query, (error, results) =>{
          console.log(error)
          console.log(results)
          //take the results of that query and store it inside context
          context.movies = results;

          //pass it to handlebars to put inside a file
          res.render('movies', context)
        })

        //res.send('Here you go!');
    }

    router.get('/', serveMovies);
    return router;
}();
