var http = require('http').createServer(handler); //import http server, and create server with function handler()
var fs = require('fs'); //import filesystem module
var io = require('socket.io')(http) //import socket.io module and pass the http object (server)

// All the robot movement related functions are provided in robotcontrol.js file
// Here we create an object called roco of this class to access those functions
var roco	= require('./robotControl.js')
// We create an object of the class sr04, calling this will give the ultrasonic distance
var sr04 = require('./sr04.js');
//const { StillCamera } = require('pi-camera-connect');
//const stillCamera = new StillCamera();
//The defualt moving and turning speeds of robot are defined here
// The moving speed can be changed by user using the '+' & '-' buttons
var pwm	= 120;
var pwm_turn = 110;
var distance;
const {spawn} = require("child_process");
var reverseFlag = 0


http.listen(8080); //listen to port 8080

// we spawn this python file to capture images from the pi camera
const python = spawn('python3', ['capture_images.py']);

function handler (req, res) { //create server
  fs.readFile(__dirname + '/public/robot.html', function(err, data) { //read file index.html in public folder
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
      return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
    res.write(data); //write data from index.html
    return res.end();
  });
}

io.sockets.on('connection', function (socket) {// WebSocket Connection

  console.log('connected');

  var forward = 0;
  var reverse = 0; 
  var left	  = 0;
  var right	  = 0;

	socket.on('forward', function(data) { //get forward switch status from client
    forward = data;
	
	// if switch is pressed then move robot forward
	if (data == 1){
		roco.robotForward(pwm);
	}
	// else stop
	else{
		roco.robotStop();
	}
  });	
  
	socket.on('reverse', function(data) { 
    reverse = data;
	
	if (data == 1){
		roco.robotReverse(pwm);
		reverseFlag = 1;
	}
	
	else{
		roco.robotStop();
		reverseFlag = 0;
	}	
  });
  
	socket.on('left', function(data) { 
		if (data == 1){
			roco.robotLeft(pwm_turn);
		}
	
		else{
			roco.robotStop();
		}	
	});
  
    socket.on('right', function(data) { 
    left = data;
		
	if (data == 1){
		roco.robotRight(pwm_turn);
	}
	
	else{
		roco.robotStop();
	}	
  });

	socket.on('plus', function(data) { // get status of plus button
// if the '+' button is pressed and speed is within allowable range then increment speed
	if (data == 1 && pwm < 245){   
	pwm = pwm + 5;
	socket.emit("speed", pwm)
	}
  });
  
	socket.on('minus', function(data) { 
	if (data == 1 && pwm > 0){
	pwm = pwm - 5;
	socket.emit("speed", pwm)
	}
  }); 
  
	function giveDistance(){
		distance = sr04(); //check distance using ultrasonic sensor
		socket.emit("distance", distance); // send distance to client
		// Stop the robot if there is an obstacle within 20 cm
		//The robot is only allowed to move if revese button is pressed by the user at this point
		if (distance <= 20 && distance > 1 && reverseFlag == 0){
			console.log('stopped')
			roco.robotStop();
			socket.emit("speed", 0)
		}
		
	}
	// the stillcamera function is not used as it takes too long to deliver image and the images size is large

	// function stillCamera1(){
	// 	stillCamera.takeImage().then(data => {
	// 	socket.emit('image', "data:image/jpg;base64,"+ data.toString("base64"));
	// 	//socket.emit( 'image', { image: true, buffer: image1});
	// });
	// }

function sendImage(){
	// The two lines below gives the size of image
	var stats = fs.statSync("image1.jpg");
	var size = stats.size;
	// the python script called capture_images.py captures and saves images alternately as image1.jpg and image2.jpg
	// When an image is being overwritten its size is nearly 0 , we use this to recognize which image is ready to use
	// We then send that image to client
	if (size > 50){
		fs.readFile('image1.jpg', function(err, data){
		socket.emit('image', "data:image/jpg;base64,"+ data.toString("base64"));
		});
	}
	else {
		fs.readFile('image2.jpg', function(err, data){
		socket.emit('image', "data:image/jpg;base64,"+ data.toString("base64"));
		});	
	
	}
}

// repeat give distance and sendimage after every 0.1 sec
setInterval(giveDistance, 100);
setInterval(sendImage, 100);
//setInterval(stillCamera1, 1500);

});

process.on('SIGINT', function () { //on ctrl+c
  process.exit(); //exit completely
});