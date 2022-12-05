# website-controlled-robot

## General Description
This project focuses on controlling a robot remotely. A GUI is developed using HTML, node.js and CSS to provide buttons and a live video to be able to control the robot. The final outcome of the project looks as follows

https://user-images.githubusercontent.com/67382565/205706977-3247769d-ffae-4ec0-a7e8-25202fe1506b.mp4

## Steps taken to implement project

1. Create a class which controls the robot movements
2. Create a class which reads the data of ultrasonic sensor
3. Create a class which captures images from camera
4. Create a server using node.js and client using HTML
5. Install socket.io and get the server and client connected
6. Add buttons to move and turn the robot.
7. Add buttons to increase and decrease the robot speed
8. Display the distance and speed of the robot
9. Display the video
10. Code such that the user should be able to operate the robot using PC as well as mobile
11. Implement function to avoid robot collision in case the user does not release the 'forward' button when robot is about to crash.
   
## Files
* **RobotControl.js:-** Provides functions to control robot movements, this file should be modified as per the hardware.
* **sr04.js:-** provides a function to read the data from ultrasonic sensor sr04
* **capture_image.py:-** captures images from camera and stores alternately as image1.jpg and image2.jpg
* **/public/robot.html:-** This file contains the GUI and the functionality to communicate with the server.
* **robot.js:-** This file contains the main program, it uses the above mentioned files to create a server, communicate with the client and move the robot.

## Dependencies
* Node.js 18.12.1 LTS
* Python 3.10.4
* Node.js Packages: pigpio, File system, socket.io, child process 
* Python packages: PiCamera
  
## Hardware used

| Hardware   | Model    |
| --------  | ----------- |
| Controller | Raspberry Pi 3B |
| Camera    |  IMX219PQ |
|Voltage Regulator | L78|
|Motor Driver | LM1085|

<img src="https://user-images.githubusercontent.com/67382565/205725548-d4a39d1b-7bde-4eed-89fe-93642a073fbf.jpg" width="500" height="250" />
<img src="https://user-images.githubusercontent.com/67382565/205725902-9d5c12e7-4d52-4a96-b56e-17b78267b75c.jpg" width="500" height="400" />


