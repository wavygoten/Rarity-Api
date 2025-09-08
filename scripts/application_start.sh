#!/bin/bash

echo 'run application_start.sh: ' >> /home/ec2-user/Rarity-Api/deploy.log
# nodejs-app is the same name as stored in pm2 process
echo 'pm2 restart nodejs-app' >> /home/ec2-user/Rarity-Api/deploy.log
sudo pm2 restart traitsurfer-client >> /home/ec2-user/Rarity-Api/deploy.log
sudo pm2 restart rarity-api >> /home/ec2-user/Rarity-Api/deploy.log
