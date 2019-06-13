module.exports = function(){
    var express = require('express');
    var router = express.Router();

    
    function serveCharactersOrganizationAdd(req, res){
        var query = `SELECT Characters.ID AS "CHARID", Characters.Name AS "CHARNAME"
                    FROM Characters 
                    ORDER BY Characters.Name`
        var mysql = req.app.get('mysql');
        var context = {};

        //execute the sql query
        mysql.pool.query(query, (error, results) =>{
          console.log(results);
          context.characters = results;

          query = `SELECT Organizations.Name AS "ORGNAME", Organizations.ID AS "ORGID"
          FROM Organizations
          ORDER BY Organizations.Name`

          mysql.pool.query(query, (error, results) =>{
            console.log(results);
            context.organizations = results;
            res.render('characters-organizations-new', context)
          })
        })
    }

    router.post('/', function(req, res){
      console.log(req.body)
      var mysql = req.app.get('mysql');
      var sql = "INSERT INTO Characters_Organizations (char_id, org_id) VALUES (?,?)";
      var inserts = [req.body.character, req.body.organizations];
      sql = mysql.pool.query(sql,inserts,function(error, results, fields){
          if(error){
              console.log(JSON.stringify(error))
              //res.write(JSON.stringify(error));
              res.redirect('/characters-organizations');
          }else{
              res.redirect('/characters-organizations');
          }
      });
    });    

    router.get('/', serveCharactersOrganizationAdd);

    return router;
}();