const classifier = require("../lib/bayesian");

const fs = require('fs');
const { parse } = require("csv-parse");

const bayes = new classifier.Bayesian();
var str = "d";
var cond = "g";

fs.createReadStream("./train/false-corpus/false.csv")
  .pipe(parse({ delimiter: ";", from_line: 2 }))
  .on("data", function (row) {
    //console.log(row);
    str =row[0];
    cond =row[1];
    bayes.train(str, cond);
  })
  .on("end", function () {
    console.log("finished read and train false-corpus");
  })
  .on("error", function (error) {
    console.log(error.message);
  });

fs.createReadStream("./train/true-corpus/true.csv")
  .pipe(parse({ delimiter: ";", from_line: 2 }))
  .on("data", function (row) {
    //console.log(row);
    str =row[0];
    cond =row[1];
    bayes.train(str, cond);
  })
  .on("end", function () {
    console.log("finished read and train true-corpus");
  })
  .on("error", function (error) {
    console.log(error.message);
  });

let ts = Date.now();

let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();

 
  setTimeout(function () {

    //cria Backup de dados
    fs.copyFile('./modelo/modelo.json', './modelo/backup/modelo-backup-' + year + "-" + month + "-" + date + "-" + hours + "h" + minutes + "m" + seconds + "s" + '.json', (err) => {
      if (err) throw err;
      console.log('Backup de true-corpus realizado!');
    });

    var json = bayes.toJSON();

    let data = JSON.stringify(json);

    fs.writeFileSync('./modelo/modelo.json', data);
  }, 1000);
