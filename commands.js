const fs = require("fs");

//write out data
function done(output){
  process.stdout.write(output);
  process.stdout.write('\nprompt >');
}

//where we will store our commands
function evaluateCmd(userInput){
  //parses the user input to undestand which command was typed
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];

  switch (command){
    case "echo":
      //we will add the functionality of echo next within the object commandLibrary
      commandLibrary.echo(userInputArray.slice(1).join(" "));
      break;
    case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "head":
      commandLibrary.head(userInputArray.slice(1));
      break;
    case "tail":
      commandLibrary.tail(userInputArray.slice(1));
      break;
    default:
      commandLibrary.errorHandeler(userInputArray.join(" "));
  }
}

const commandLibrary = {
  "echo": function (userInput){
    done(userInput);
  },
   "cat": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            done(data);
        });
    },
    "head": function(fullPath){
      const fileName = fullPath[0];
      fs.readFile(fileName, (err,data) =>{
        if (err) throw err;
        done(data.split("\n").slice(0,5).join("\n"));
      });
    },
    "tail": function(fullPath) {
  const fileName = fullPath[0];
  fs.readFile(fileName, (err, data) => {
    if (err) throw err;
    done(data.split("\n").slice(-4).join("\n"));
  });
},
   "errorHandeler": (userInput) => {
     done("command not found");
   }


};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
