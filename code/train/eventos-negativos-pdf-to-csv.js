const { exec } = require("child_process");
const fs = require('fs');
const path = require('path');

//cria Backup de dados
let ts = Date.now();

let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
fs.copyFile('./train/false-corpus/false.csv', './train/false-corpus/backup/false-backup-' + year + "-" + month + "-" + date + "-" + hours + "h" + minutes + "m" + seconds + "s" + '.csv', (err) => {
    if (err) throw err;
    console.log('Backup de true-corpus realizado!');
  });

var dir = './arquivos/pdf-negativos';

fs.readdir(dir,function(err,files){
    if (err) throw err;
    files.forEach(function(file){
        if(file) {
        fs.readFile('./arquivos/pdf-negativos/'+file, 'utf8', function (err,data) {
            if (err) {
            return console.log(err);
            }
            var cmd = `./process/process-pdf.sh ` + `"./arquivos/pdf-negativos/` + file + `" "./train/false-corpus/false.csv"`
            processSync(cmd);
            //console.log(path.resolve(file));
        });
        }
    });
});

function processSync(cmd) {
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        console.log(`stderr: ${stderr}`);
    });
}

//const cmd = `./process/process-pdf.sh "working2050.pdf" "./train/false-corpus/false.csv"`

/* exec(cmd, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
   // if (stderr) {
        //console.log(`stderr: ${stderr}`);
     //   return;
    //}
    console.log(`stderr: ${stderr}`);
    //console.log(`stdout: ${stdout}`);
}); */
