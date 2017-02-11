# Raspberry Thermostat
Just a simple thermostat with Raspberry PI

## Get my_server_domain
register to no-ip.com and configure your router to point to the raspberry pi

## letsencrypt certificate

1. raspbian source.list
```
deb http://mirrordirector.raspbian.org/raspbian/ jessie main contrib non-free rpi
# Uncomment line below then 'apt-get update' to enable 'apt-get source'
deb-src http://archive.raspbian.org/raspbian/ jessie main contrib non-free rpi
deb http://ftp.debian.org/debian jessie-backports main
deb http://apt.adafruit.com/raspbian/ jessie main
```
2. sudo apt-get update
3. sudo apt-get install certbot -t jessie-backports
4. node /var/node/default/cert.js
5. sudo certbot certonly --webroot -w /var/node/default/public -d [my_server_domain]
6. sudo certbot renew --dry-run
7. `ln -s /etc/letsencrypt/live/[my_server_domain] /etc/letsencrypt/live/default`

## configure sensor
https://thepihut.com/blogs/raspberry-pi-tutorials/18095732-sensors-temperature-with-the-1-wire-interface-and-the-ds18b20

    sudo vi /boot/config.txt

Look to see whether there is a line that has dtoverlay=w1-gpio in it.  If not, add the following to the end of the file:

    dtoverlay=w1-gpio

### set correct timezone and other options on raspberry pi

    sudo raspi-config

## Install latest NodeJS
http://thisdavej.com/beginners-guide-to-installing-node-js-on-a-raspberry-pi/#install-node
