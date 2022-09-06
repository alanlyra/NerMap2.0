//Função para usar o resultado de IDs de arquivos que possuem prospecção e separar em uma pasta os que não tem para treino de negativas
const fs = require('fs');
const events = require('events');
const readline = require('readline');
//require('events').EventEmitter.prototype._maxListeners = 100;

var basedir = __dirname;
var dir = basedir + '/pdf/';

var arquivos = [];

fs.readdir(dir,function(err,files){
    if (err) throw err;
    processLineByLine()
    files.forEach(function(file){
        if(file) {
        fs.readFile(dir + file, 'utf8', function (err,data) {
            if (err) {
            return console.log(err);
            }
            if(arquivos.includes(file.replace(".pdf", ""))) {
                console.log("Documento " + file + " está na lista");
                copiaArquivo(file)
            }
            else {
                console.log("Documento " + file + " NÃO está na lista");
            }
        });
        }
    });
});

function copiaArquivo(file) {
   //copia arquivo
    fs.copyFile(dir + file, __dirname + '/pdf-negativos/' + file, (err) => {
        if (err) throw err;
        console.log('Arquivo ' + file + ' copiado com sucesso!');
    });
}

function processLineByLine() {
    try {
      const rl = readline.createInterface({
        input: fs.createReadStream(basedir + '/ids.txt'),
        crlfDelay: Infinity
      });
  
      rl.on('line', (line) => {
        console.log(`Line from file: ${line}`);
        arquivos.push(line)
      });
  
      events.once(rl, 'close');
  
      console.log('Reading file line by line with readline done.');
      const used = process.memoryUsage().heapUsed / 1024 / 1024;
      console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
    } catch (err) {
      console.error(err);
    }
  };

