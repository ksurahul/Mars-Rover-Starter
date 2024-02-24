const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // test 7 - create new rover object with postion value - expect default values returned
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(1337); //passes 1337 as rover postion 

    expect(rover.position).toEqual(1337);
    expect(rover.mode).toBe('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });

  //test 8
  it("response returned by receiveMessage contains the name of the message", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message', commands); //passes in message
    let rover = new Rover(1337);    
    let response = rover.receiveMessage(message);

    expect(response.message).toBe('Test message');
  });

  //test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(1337);    
    let response = rover.receiveMessage(message);

    expect(response.results.length).toEqual(commands.length)    
  });

  //test 10
  it("responds correctly to the status check command", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message', commands);
    let rover = new Rover(1337);    
    let response = rover.receiveMessage(message);

    expect(response.results[0].roverStatus.mode).toBe('NORMAL');
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
    expect(response.results[0].roverStatus.position).toEqual(1337);
  });

  //test 11
  it("responds correctly to the mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test message', commands);
    let rover = new Rover(1337);    
    let response = rover.receiveMessage(message);

    expect(response.results[0].completed).toBe(true);
    expect(rover.mode).toBe("LOW_POWER")
  });

  //test 12
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 7313)];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(1337);    
    let response = rover.receiveMessage(message);

    expect(response.results[1].completed).toBe(false);
    expect(rover.position).toEqual(1337);
  });

  //test 13
  it("responds with the position for the move command", function() {
    let commands = [new Command('MOVE', 7313)];
    let message = new Message('Test message', commands);
    let rover = new Rover(1337);    
    let response = rover.receiveMessage(message);

    expect(rover.position).toEqual(7313);
  });

});
