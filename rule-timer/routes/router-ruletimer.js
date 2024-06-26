const express = require('express');
const sql = require('mssql/msnodesqlv8');

const router = express.Router();
const {createtimer,updatetimer}  = require('../controller/ctrl-ruletimer');

const urlPart = '/ecc/v1/'


router.post('/ecc/v1/updatetimerrecord',updatetimer)
router.post('/ecc/v1/createtimerrecord',createtimer)


//router.get('/ecc/v1/updatetask',updatetask)








module.exports = router;
