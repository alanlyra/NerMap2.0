const fs = require('fs');

var corpus = "";

try {
    const data = fs.readFileSync("./eventos-nermap/eventos-industry-4.0.json", "utf8");
    let parseJSON = JSON.parse(data);
    for(let i = 0; i < parseJSON.length; i++){ 
        //console.log(parseJSON[i]["info_original"])
        var str = parseJSON[i]["info_original"]
        str = str.replaceAll("\"", "");
        str = str.replaceAll(";", "");
        str = str.replaceAll(" .", ".");
        str = str.replaceAll("  ", " ");
        corpus+=str
        corpus+=";S"
        corpus+="\n"
    } 
    
} catch (err) {
    console.error(err);
}

let ts = Date.now();

let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();

fs.copyFile('./train/true-corpus/true.csv', './train/true-corpus/backup/true-backup-' + year + "-" + month + "-" + date + "-" + hours + "h" + minutes + "m" + seconds + "s" + '.csv', (err) => {
    if (err) throw err;
    console.log('Backup de true-corpus realizado!');
  });

fs.appendFile("./train/true-corpus/true.csv", corpus, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 
