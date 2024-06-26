var config = require('../model/model-db');
const express = require('express');
const sqlfunc = require('mssql/msnodesqlv8');


function checkdeviceidpointidpair(eqpname,deviceid){
    dbName = config.databse

    query = "select count(*) as total from  ["+dbName+"].ECCAnalytics.Devices where equipmentname ='"+eqpname+"' and deviceid = '"+deviceid+"'"
    sqlfunc.connect(config,function(err){
        if(err)console.log('Erro is coming')
        else console.log('conected')
    
        // make a request as
    
        var request = new sqlfunc.Request();
    //console.log(request)
   
       request.query(query,function(err,records){
        if(err){
          console.log(err);
        return query}
          else{
            console.log(records['recordsets'][0][0].total);

           return records['recordsets'][0][0].total;
            //return records['recordsets'][0]
           // return 1

          }

       })
    })  

   // return 1
}

module.exports = {
     checkdeviceidpointidpair
}
