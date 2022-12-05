var Gpio = require('pigpio').Gpio; //include pigpio to interact with the GPIO
var right_IN1	= new Gpio(24, {mode: Gpio.OUTPUT});
var right_IN2 = new Gpio(4, {mode: Gpio.OUTPUT});
var right_pwm = new Gpio(19, {mode: Gpio.OUTPUT});
var left_IN1  = new Gpio(17, {mode: Gpio.OUTPUT});	
var left_IN2 = new Gpio(22, {mode: Gpio.OUTPUT});
var left_pwm = new Gpio(18, {mode: Gpio.OUTPUT});

//This functions are derived based on a particular robot, 
// they should be changed as per the robot configuration

	function robotForward(pwm){
		// the right wheel of robot moves slowly than the left, we compensate it by adding 10
		var pwm_right = pwm +10;
		right_IN1.digitalWrite(1);
		right_IN2.digitalWrite(0);
		right_pwm.pwmWrite(pwm_right);
		left_IN1.digitalWrite(1);
		left_IN2.digitalWrite(0);
		left_pwm.pwmWrite(pwm);
	}
	function robotReverse(pwm){
		var pwm_right = pwm +10;
		right_IN1.digitalWrite(0);
		right_IN2.digitalWrite(1);
		right_pwm.pwmWrite(pwm_right);
		left_IN1.digitalWrite(0);
		left_IN2.digitalWrite(1);
		left_pwm.pwmWrite(pwm);		
	}	
	function robotStop(){
		right_IN1.digitalWrite(0);
		right_IN2.digitalWrite(0);
		right_pwm.pwmWrite(0);
		left_IN1.digitalWrite(0);
		left_IN2.digitalWrite(0);
		left_pwm.pwmWrite(0);	
	}	
		function robotLeft(pwm){
		right_IN1.digitalWrite(1);
		right_IN2.digitalWrite(0);
		right_pwm.pwmWrite(pwm);
		left_IN1.digitalWrite(0);
		left_IN2.digitalWrite(1);
		left_pwm.pwmWrite(pwm);	
	}	
		function robotRight(pwm){
		right_IN1.digitalWrite(0);
		right_IN2.digitalWrite(1);
		right_pwm.pwmWrite(pwm);
		left_IN1.digitalWrite(1);
		left_IN2.digitalWrite(0);
		left_pwm.pwmWrite(pwm);	
	}		

	module.exports.robotForward = robotForward
	module.exports.robotReverse = robotReverse
	module.exports.robotStop = robotStop
	module.exports.robotRight = robotRight
	module.exports.robotLeft = robotLeft