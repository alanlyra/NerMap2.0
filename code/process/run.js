const classifier = require("../lib/bayesian");

const fs = require('fs');

var bayes = new classifier.Bayesian();

let rawdata = fs.readFileSync('./modelo/modelo.json');
let train = JSON.parse(rawdata);

bayes.fromJSON(train);

var category = bayes.classify("By 2050, it is estimated that 1.5 billion goats will fly");   // "s"

console.log(category);