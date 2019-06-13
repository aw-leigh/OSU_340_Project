module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function serveCharactersOrganizations(req, res){
        var query = `SELECT Characters.ID AS "CHARID", Characters.Name AS "CHARNAME", Organizations.Name AS "ORGNAME", Organizations.ID AS "ORGID"
                    FROM Characters 
                    INNER JOIN Characters_Organizations ON Characters.ID = Characters_Organizations.char_id
                    INNER JOIN Organizations ON Organizations.ID = Characters_Organizations.org_id
                    ORDER BY Characters.Name`
        var mysql = req.app.get('mysql');
        var context = {};

        //execute the sql query
        mysql.pool.query(query, (error, results) =>{
          console.log(error)
          console.log(results)
          //take the results of that query and store it inside context
          context.charactersOrganizations = results;

          //pass it to handlebars to put inside a file
          res.render('characters-organizations', context)
        })

        //res.send('Here you go!');
    }

    router.get('/', serveCharactersOrganizations);


/*************
 *  DELETE
**************/

router.get('/delete', function(req, res){
  console.log(req.query);
  console.log(req.query.charid);
  console.log(req.query.orgid);
 
  let response = {};
  var mysql = req.app.get('mysql');
  let query = `DELETE FROM Characters_Organizations WHERE char_id=? AND org_id=?`;   
  mysql.pool.query(query, [req.query.charid, req.query.orgid], function(err, result){
    if(err){
      res.status(500);
      res.render('500', {layout: 'error.handlebars'});
      return;
    }
    console.log("deleted");
    res.redirect('/characters-organizations')
  })
});   

    return router;
}();