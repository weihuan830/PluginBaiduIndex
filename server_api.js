const express = require('express');
const router = express.Router();
const co = require('co');
const key = ["招商银行","上海银行","农业银行","广发证券","美联物业"];

var fs=require("fs");
var WordFile = fs.createWriteStream("./WordFile.txt", {
  encoding: 'utf8'
});
var EmptyFile = fs.createWriteStream("./EmptyFile.txt", {
  encoding: 'utf8'
});
var index = 0;

router.get('/', (req, res) => {
  co(function*() {
    console.log(req);
    console.log("完成第"+index+"个，共"+key.length+"个");
    index++;
    res.send("getNewKey_callback('"+key[index]+"')");
  }).catch(err => {
    res.status(500);
    res.send({ message: 'export.error', err });
  });
});

router.get('/empty', (req, res) => {
  co(function*() {
    EmptyFile.write(decodeURI(req['headers']['emptyword'])+",");
    res.send("SendEmptyWord_callback('"+key[index]+"')");
  }).catch(err => {
    res.status(500);
    res.send({ message: 'export.error', err });
  });
});

router.use('*', (req, res, next) => {
  res.status(404);
  res.json({ message: 'api.not.found' });
});

module.exports = router;