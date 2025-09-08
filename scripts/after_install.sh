#!/bin/bash
echo 'run after_install.sh: ' >> /home/ec2-user/Rarity-Api/deploy.log

echo 'cd /home/ec2-user/Rarity-Api' >> /home/ec2-user/Rarity-Api/deploy.log
cd /home/ec2-user/Rarity-Api >> /home/ec2-user/Rarity-Api/deploy.log

echo 'bun install' >> /home/ec2-user/Rarity-Api/deploy.log 
bun install >> /home/ec2-user/Rarity-Api/deploy.log

cd cd /home/ec2-user/Rarity-Api/client >> /home/ec2-user/Rarity-Api/deploy.log
bun install >> /home/ec2-user/Rarity-Api/deploy.log


