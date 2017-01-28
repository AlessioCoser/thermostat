BASEDIR='/var/node/default/'

mkdir -p ${BASEDIR}log
chmod -R g+r /etc/letsencrypt/live/
chown -R pi /etc/letsencrypt/live/
chmod -R g+r /etc/letsencrypt/archive/
chown -R pi /etc/letsencrypt/archive/
chmod -R a+rw ${BASEDIR}log
chmod a+x ${BASEDIR}bin/nodeForever

su - pi -c "forever restart production"
