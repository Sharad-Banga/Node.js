
const fs = require("fs");

const {Command} = require("commander");
const { timingSafeEqual } = require("crypto");
const program = new Command();

let taskbar = [];
let index = 0;
let tt = './todo.json';
if (fs.existsSync(tt)) {
  const data = fs.readFileSync(tt, 'utf-8');
  taskbar = JSON.parse(data);
  index = taskbar.length ? taskbar[taskbar.length - 1].id + 1 : 0;  // Set the next index based on the last task's ID
}
program
  .name("todo-cli")
  .description('here we are going to add update')
  .version('0.8.0');

program.command('add')
  .description('adding value')
  .argument('<task>','task to add')
  .action((task)=>{
      taskbar.push({id:taskbar.length,taski:task , done:false});
      console.log(`Added : ${task}`);
      // console.log(taskbar[index]);
       saveKro();
       index++;
});

program.command('show')
  .description('printt')
  .action(()=>{
    // if (taskbar.length === 0) {
    //   console.log("No tasks available.");
    // } else {
    //   taskbar.forEach(({ id, taski, done }) => {
    //     console.log(`${id}. [${done ? "X" : " "}] ${taski}`);
    //   });
    // }

    const data = fs.readFileSync(tt,'utf-8');
    console.log(JSON.parse(data));
    
});



program.command('delete')
  .description('delete hoga')
  .argument('<id>','id of task to delete')
  .action((id)=>{

      id = parseInt(id);
      taskbar.splice(id,1);
      saveKro();
  });
// function saveKro(){
//   fs.writeFileSync(tt,JSON.stringify(taskbar));
// }
function saveKro() {
  fs.writeFileSync(tt, JSON.stringify(taskbar, null, 2)); // Pretty-print the JSON
}
program.parse();