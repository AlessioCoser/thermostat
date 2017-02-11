BASEDIR='/var/node/default/'

cd ${BASEDIR}
npm install -y

mkdir -p ${BASEDIR}log
chmod -R g+r /etc/letsencrypt/live/
chown -R pi /etc/letsencrypt/live/
chmod -R g+r /etc/letsencrypt/archive/
chown -R pi /etc/letsencrypt/archive/
chmod -R a+rw ${BASEDIR}log
chmod a+x ${BASEDIR}bin/nodeForever
chown pi:pi ${BASEDIR}public/js/bundle.js

su - pi -c "cd ${BASEDIR} && npm run webpack -- --progress -p"

su - pi -c "forever restart production"
