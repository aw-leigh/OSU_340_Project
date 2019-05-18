module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function serveOrganizations(req, res){
        var query = `SELECT Organizations.Name AS "OrganizationName", Characters.Name AS "Leader"
                     FROM Organizations 
                     INNER JOIN Characters ON Organizations.Leader = Characters.ID`
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

    router.get('/', serveOrganizations);
    return router;
}();
