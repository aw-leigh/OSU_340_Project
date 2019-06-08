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


/*************
 *  DELETE
**************/

router.get('/delete', function(req, res){
  console.log(req.query);
  console.log(req.query.charid);
  console.log(req.query.movieid);
 
  let response = {};
  var mysql = req.app.get('mysql');
  let query = `DELETE FROM Characters_Movies WHERE char_id=? AND movie_id=?`;   
  mysql.pool.query(query, [req.query.charid, req.query.movieid], function(err, result){
    if(err){
      res.status(500);
      res.render('500', {layout: 'error.handlebars'});
      return;
    }
    console.log("deleted");
    res.redirect('/characters-movies')
  })
});   

    return router;
}();