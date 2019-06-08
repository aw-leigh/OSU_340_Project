module.exports = function(){
    var express = require('express');
    var router = express.Router();

    
    function serveCharactersMoviesAdd(req, res){
        var query = `SELECT Characters.ID AS "CHARID", Characters.Name AS "CHARNAME"
                    FROM Characters 
                    ORDER BY Characters.Name`
        var mysql = req.app.get('mysql');
        var context = {};

        //execute the sql query
        mysql.pool.query(query, (error, results) =>{
          console.log(results);
          context.characters = results;

          query = `SELECT Movies.Name AS "MOVIENAME", Movies.ID AS "MOVIEID"
          FROM Movies 
          ORDER BY Movies.Name`

          mysql.pool.query(query, (error, results) =>{
            console.log(results);
            context.movies = results;
            res.render('characters-movies-new', context)
          })
        })
    }

    router.post('/', function(req, res){
      console.log(req.body)
      var mysql = req.app.get('mysql');
      var sql = "INSERT INTO Characters_Movies (char_id, movie_id) VALUES (?,?)";
      var inserts = [req.body.character, req.body.movie];
      sql = mysql.pool.query(sql,inserts,function(error, results, fields){
          if(error){
              console.log(JSON.stringify(error))
              res.write(JSON.stringify(error));
              res.end();
          }else{
              res.redirect('/characters-movies');
          }
      });
    });    

    router.get('/', serveCharactersMoviesAdd);

    return router;
}();