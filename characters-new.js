module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function servePlanets(req, res){
      var query = `SELECT NAME, ID FROM Planets`;
      var mysql = req.app.get('mysql');
      var context = {};


      //execute the sql query
      mysql.pool.query(query, (error, results) =>{
        console.log(error)
        console.log(results)
        //take the results of that query and store ti inside context
        context.planets = results;

          //pass it to handlebars to put inside a file
          res.render('characters-new', context)
        })

        //res.send('Here you go!');
    }

    
    router.post('/', function(req, res){
      console.log(req.body)
      var mysql = req.app.get('mysql');
      var sql = "INSERT INTO Characters (Name, Race, Alignment, Planet) VALUES (?,?,?,?)";
      var inserts = [req.body.name, req.body.race, req.body.alignment, req.body.homeplanet];
      sql = mysql.pool.query(sql,inserts,function(error, results, fields){
          if(error){
              console.log(JSON.stringify(error))
              res.write(JSON.stringify(error));
              res.end();
          }else{
              res.redirect('/characters');
          }
      });
    });

    router.get('/', servePlanets);
    return router;
}();
