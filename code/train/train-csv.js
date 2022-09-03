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
 
  setTimeout(function () {
    var json = bayes.toJSON();

    let data = JSON.stringify(json);

    fs.writeFileSync('./modelo/modelo.json', data);
  }, 1000);
