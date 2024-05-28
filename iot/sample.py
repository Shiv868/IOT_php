import serial
import requests

arduino_port = 'COM6' 

ser = serial.Serial(arduino_port, 9600, timeout=2)

while True:
    line = ser.readline().decode('utf-8').strip()
    print("Received data:", line)

    if ':' in line and ',' in line:
        temperature = line.split(',')[0].split(':')[1]
        humidity = line.split(',')[1].split(':')[1]
    elif 'Humidity:' in line and 'Temperature:' in line:
        humidity = line.split('Humidity:')[1].split('%')[0].strip()
        temperature = line.split('Temperature:')[1].split('*C')[0].strip()
    else:
        print("Unexpected data format. Skipping...")
        continue

    url = 'http://localhost/iot/index.php' 
    data = {'temperature': temperature, 'humidity': humidity}
    response = requests.post(url, data=data)

    print("Server response:", response.text)
