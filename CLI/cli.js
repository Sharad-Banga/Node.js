const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .name('counter')
  .description('CLI to do file based tasks')
  .version('0.8.0');

program.command('count') //Defines a new CLI command named count
  .description('Count the number of lines in a file')//description of what the count command does.
  .argument('<file>', 'file to count')//argument required #file path here
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const lines = data.split('\n').length;
        console.log(`There are ${lines} lines in ${file}`);
      }
    });
  });

 // console.log("hohoho : ",process.argv[2]);
  
program.parse(); //it reads argv and send it to their location