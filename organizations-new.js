module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function serveLeaders(req, res){
      var query = `SELECT NAME, ID FROM Characters`;
      var mysql = req.app.get('mysql');
      var context = {};


      //execute the sql query
      mysql.pool.query(query, (error, results) =>{
        console.log(error)
        console.log(results)
        //take the results of that query and store ti inside context
          context.characters = results;

          //pass it to handlebars to put inside a file
          res.render('organizations-new', context)
        })

        //res.send('Here you go!');
    }

    
    router.post('/', function(req, res){
      console.log(req.body)
      var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Organizations (Name, Leader) VALUES (?,?)";
        var inserts = [req.body.name, req.body.leader];
      sql = mysql.pool.query(sql,inserts,function(error, results, fields){
          if(error){
              console.log(JSON.stringify(error))
              res.write(JSON.stringify(error));
              res.end();
          }else{
              res.redirect('/organizations');
          }
      });
    });

    router.get('/', serveLeaders);
    return router;
}();
