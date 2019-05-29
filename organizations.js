module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function serveOrganizations(req, res){
        var query = `SELECT Organizations.ID, Organizations.Name AS "OrganizationName", Characters.Name AS "Leader"
                     FROM Organizations 
                     INNER JOIN Characters ON Organizations.Leader = Characters.ID
                     ORDER BY Organizations.Name`
        var mysql = req.app.get('mysql');
        var context = {};

        //execute the sql query
        mysql.pool.query(query, (error, results) =>{
          console.log(error)
          console.log(results)
          //take the results of that query and store ti inside context
          context.organizations = results;

          //pass it to handlebars to put inside a file
          res.render('organizations', context)
        })

        //res.send('Here you go!');
    }


    function getOrganization(res, mysql, context, id, complete){
      var sql = `SELECT ID, Name, Leader FROM Organizations WHERE ID= ?`;
      var inserts = [id];
      mysql.pool.query(sql, inserts, function(error, results, fields){
          if(error){
              res.write(JSON.stringify(error));
              res.end();
          }
          context.organization = results[0];
          complete();
      });
    }

    function getCharacter(res, mysql, context, complete){
      mysql.pool.query("SELECT ID, Name FROM Characters", function(error, results, fields){
          if(error){
              res.write(JSON.stringify(error));
              res.end();
          }
          context.character = results;
          complete();
      });
    }

    router.get('/', serveOrganizations);

    router.get('/:id', function(req, res){
      callbackCount = 0;
      var context = {};
      context.jsscripts = ["selectedLeader.js", "updateOrganization.js"];
      var mysql = req.app.get('mysql');
      getOrganization(res, mysql, context, req.params.id, complete);
      getCharacter(res, mysql, context, complete);
      function complete(){
          callbackCount++;
          if(callbackCount >= 2){
              res.render('organizations-update', context);
          }
      }
    });

    router.put('/:id', function(req, res){
      var mysql = req.app.get('mysql');
      console.log(req.body)
      console.log(req.params.id)
      var sql = "UPDATE Organizations SET Name=?, Leader=? WHERE id=?";
      var inserts = [req.body.name, req.body.leader, req.params.id];
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
