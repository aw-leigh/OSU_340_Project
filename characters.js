module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function serveCharacters(req, res){
        var query = `SELECT Characters.ID, Characters.Name, Characters.Race, Characters.Alignment, Planets.Name AS "PlanetName"
                    FROM Characters 
                    INNER JOIN Planets ON Characters.Planet = Planets.ID
                    ORDER BY Characters.Name`
        var mysql = req.app.get('mysql');
        var context = {};

        //execute the sql query
        mysql.pool.query(query, (error, results) =>{
          console.log(error)
          console.log(results)
          //take the results of that query and store it inside context
          context.characters = results;

          //pass it to handlebars to put inside a file
          res.render('characters', context)
        })

        //res.send('Here you go!');
    }

    function getCharacter(res, mysql, context, id, complete){
      var sql = "SELECT ID as id, Name, Race, Alignment, Planet FROM Characters WHERE ID= ?";
      var inserts = [id];
      mysql.pool.query(sql, inserts, function(error, results, fields){
          if(error){
              res.write(JSON.stringify(error));
              res.end();
          }
          context.character = results[0];
          complete();
      });
    }

    function getPlanets(res, mysql, context, complete){
      mysql.pool.query("SELECT NAME, ID FROM Planets", function(error, results, fields){
          if(error){
              res.write(JSON.stringify(error));
              res.end();
          }
          context.planets = results;
          complete();
      });
    }

    router.get('/', serveCharacters);

/*************
 *  UPDATE
**************/

    router.get('/:id', function(req, res){
      callbackCount = 0;
      var context = {};
      context.jsscripts = ["selectedplanet.js", "selectedAlignment.js", "updateCharacter.js"];
      var mysql = req.app.get('mysql');
      getCharacter(res, mysql, context, req.params.id, complete);
      getPlanets(res, mysql, context, complete);
      function complete(){
          callbackCount++;
          if(callbackCount >= 2){
              res.render('characters-update', context);
          }
      }
    });


    /* The URL that update data is sent to in order to update a character */

    router.put('/:id', function(req, res){
      var mysql = req.app.get('mysql');
      console.log(req.body)
      console.log(req.params.id)
      var sql = "UPDATE Characters SET Name=?, Race=?, Alignment=?, Planet=? WHERE id=?";
      var inserts = [req.body.name, req.body.race, req.body.alignment, req.body.homeplanet, req.params.id];
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

/*************
 *  DELETE
**************/

router.get('/delete/:id', function(req, res){
    let response = {};
    var mysql = req.app.get('mysql');
    let query = `DELETE FROM Characters WHERE id=?`;   
    mysql.pool.query(query, [req.params.id], function(err, result){
      if(err){
        next(err);
        return;
      }
      console.log(result.changedRows);
      response.deleted = result.changedRows;
      res.redirect('/characters')
    })
});   

    return router;
}();
