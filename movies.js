module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function serveMovies(req, res){
        //date formatting reference - http://www-db.deis.unibo.it/courses/TW/DOCS/w3schools/sql/func_date_format.asp.html
        var query = `SELECT Movies.Name AS "MovieName",
                     Movies.ID AS ID, 
                     DATE_FORMAT(Movies.Release_Date, '%M %e, %Y') AS "ReleaseDate",
                     Movies.Phase FROM Movies
                     ORDER BY Movies.Release_Date`
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

    function getMovie(res, mysql, context, id, complete){
      var sql = `SELECT ID, Name AS "MovieName",
                  DATE_FORMAT(Movies.Release_Date, '%Y-%m-%d') AS "ReleaseDate",
                  Phase FROM Movies WHERE ID= ?`;
                  //date needs to be in the above format to work with the HTML date input
      var inserts = [id];
      mysql.pool.query(sql, inserts, function(error, results, fields){
          if(error){
              res.write(JSON.stringify(error));
              res.end();
          }
          context.movie = results[0];
          complete();
      });
    }

    router.get('/', serveMovies);

    router.get('/:id', function(req, res){
      callbackCount = 0;
      var context = {};
      context.jsscripts = ["selectedPhase.js", "updateMovie.js"];
      var mysql = req.app.get('mysql');
      getMovie(res, mysql, context, req.params.id, complete);
      function complete(){
          callbackCount++;
          if(callbackCount >= 1){
              res.render('movies-update', context);
          }
      }
    });

    router.put('/:id', function(req, res){
      var mysql = req.app.get('mysql');
      console.log(req.body)
      console.log(req.params.id)
      var sql = "UPDATE Movies SET Name=?, Release_Date=?, Phase=? WHERE ID=?";
      var inserts = [req.body.name, req.body.releaseDate, req.body.Phase, req.params.id];
      sql = mysql.pool.query(sql,inserts,function(error, results, fields){
          if(error){
              console.log(error)
              res.write(JSON.stringify(error));
              res.end();
          }else{
              res.status(200);
              res.end();
          }
      });
    });

    return router;
}();
