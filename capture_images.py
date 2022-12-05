from picamera import PiCamera
import time, threading

camera = PiCamera()

time.sleep(0.5)

def imageCapture():
    camera.capture("image1.jpg", resize=(300, 200))
    camera.capture("image2.jpg", resize=(300, 200))
    threading.Timer(0.05,imageCapture).start()
    
imageCapture()
    
