class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

   receiveMessage(message) {
      let response = {
         message: message.name,
         results: []
         };
         
         //loop through the commands given from message class
         for(let command of message.commands) {   
          
          //if the command type is move and not in low power mode, update the postion
          if(command.commandType === 'MOVE' && this.mode != 'LOW_POWER') {
              response.results.push({completed: true});
              this.position = command.value;
          } 
          //if command type is move and in low power, nothing should happen
          else if(command.commandType === 'MOVE' && this.mode === 'LOW_POWER') {
              response.results.push({completed: false});
          } 
          //check current status of rover - will return class properties back in NEW object called roverStatus
          else if(command.commandType === 'STATUS_CHECK') {
              response.results.push({
                  completed: true,
                  roverStatus: {
                      mode: this.mode, 
                      generatorWatts: this.generatorWatts, 
                      position: this.position
                  }
              });
          }
          //if command type is mode change, change the mode to whatever is passed in
          else if(command.commandType === 'MODE_CHANGE') {
              response.results.push({completed: true});
              this.mode = command.value;
          }
      }
      return response;
      }
   }

module.exports = Rover;