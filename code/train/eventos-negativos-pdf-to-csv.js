const { exec } = require("child_process");

const cmd = `./process/process-pdf.sh "working2050.pdf" "./train/false-corpus/false.csv"`

exec(cmd, (error, stdout, stderr) => {
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
});
