const Gpio = require('pigpio').Gpio;
// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
const MICROSECDONDS_PER_CM = 1e6/34321;
const trigger = new Gpio(25, {mode: Gpio.OUTPUT});
const echo = new Gpio(27, {mode: Gpio.INPUT, alert: true});
trigger.digitalWrite(0); 
var distance =0;


function sr04() {
const watchHCSR04 = () => {
  let startTick;

  echo.on('alert', (level, tick) => {
    if (level == 1) {
      startTick = tick;
    } else {
      const endTick = tick;
      const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
      distance = diff / 2 / MICROSECDONDS_PER_CM
    }
  });
};

watchHCSR04();

//setInterval(() => {
trigger.trigger(10, 1); // Set trigger high for 10 microseconds
//}, 1000);

return distance;
}
module.exports = sr04