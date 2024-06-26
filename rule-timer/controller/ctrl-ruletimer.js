const express = require('express');
var async = require("async");
const sql = require('mssql/msnodesqlv8');

//var port = require('./const');
var config = require('../model/model-db');
var DB = config.databse
var dbName = config.databse

/*
var config = {

    server : "localhost\\ECC", // eg:: 'DESKTOP_mjsi\\MSSQLEXPRESS'
   databse: "ECCDB",
   driver:"msnodesqlv8",
   user :'corp\\anudasgu',      // please read above note
   password:"Hydrogen1234",   // please read above note
  options :{
    trustedConnection:true,
  }
}

*/





const updatetimer = async (req,res)=>{
  console.log(req.originalUrl);

  equipment = req.body.equipment
  workflowname = req.body.workflowname
  timer = req.body.timer


  maxsql = "SELECT count(*) as total FROM ["+dbName+"].[ECCAnalytics].[Ruletimer] where equipment = '"+equipment+"' and workflowname = '"+workflowname+"';"


  sql.connect(config,function(err){
      if(err)
        console.log(maxsql)
  
      var request = new sql.Request();
  
      request.query(maxsql,function(err,records){
          if(err)
          console.log(err);
          else{
           // return 0;
            if(records['recordsets'][0][0].total > 0){
              console.log(records['recordsets'][0][0].total);

              query = "UPDATE ["+dbName+"].[ECCAnalytics].[Ruletimer] set timer = "+timer+"  where equipment = '"+equipment+"' and workflowname = '"+workflowname+"';"

              request.query(query,function(err,records){
                if(err)
                console.log(err);
                else{
                    return res.status(200).json({'status': 'success'})
                        
                     }
            
        
            })

            }
            else{
              return res.status(200).json({'status': 'No Data Found'})
            }
                  
               }
      
  
      })//*

  })


}

//createT()

function createT(){
  setTimeout(callback,2000)

}

function delay(callback) {
  setTimeout(() => {
    callback(null, 'done');
  }, 1000); // Simulate a delay of 1 second
}




function callme(req,res){
  let equipment = req.body.equipment
  let  workflowname = req.body.workflowname
  let timer = req.body.timer

 

  maxsql = "SELECT count(*) as total FROM ["+dbName+"].[ECCAnalytics].[Ruletimer] where equipment = '"+equipment+"' and workflowname = '"+workflowname+"';"


  sql.connect(config,function(err){
      if(err)console.log(maxsql)
  
      var request = new sql.Request();
  
      request.query(maxsql,function(err,records){
          if(err)
          console.log(err);
          else{
           // return 0;
            if(records['recordsets'][0][0].total == 0){

               query = "INSERT INTO ["+dbName+"].[ECCAnalytics].[Ruletimer] (equipment,workflowname) VALUES ('"+equipment+"','"+workflowname+"')"

              request.query(query,function(err,records){
                if(err){
                console.log(query);
                  return err
                }
                else{
                    return {'status': 0}
                        
                     }
            
        
            })

            }
            else{ /************ */
              query = "SELECT * FROM ["+dbName+"].[ECCAnalytics].[Ruletimer] where equipment = '"+equipment+"' and workflowname = '"+workflowname+"';"

              request.query(query,function(err,records){
                if(err){
                console.log(err);
                return err
                }
                else{
                  console.log(records['recordsets'][0][0])
                    //return records['recordsets'][0][0]
                    return res.status(200).json( records['recordsets'][0][0])
  
                     }
            
        
            })

            }
                  
               }
      
  
      })//*

  })


}



 const createtimer = async (req,res)=>{

  console.log(req.originalUrl);

  let equipment = req.body.equipment
  let  workflowname = req.body.workflowname
  let timer = req.body.timer

  //console.log(workflowname);

 setImmediate((equipment,workflowname,timer)=>{
  //console.log(req.body.equipment);
//console.log(1)
  result = callme(req,res)
  //return res.status(200).json(result)
 })

 
}








/********************************************************************************************************************* */
module.exports = {

  updatetimer,
    createtimer
    
}