## Instructions
cd server  
composer install  
  
nano .env  
DATABASE_URL="mysql://mysqluser:mysqlpassword@127.0.0.1:3306/sfapi?serverVersion=5.7"  
php bin/console doctrine:schema:update --force  
  
php bin/console doctrine:fixtures:load  
php -S 127.0.0.1:8001 -t public  
  
## Dans un nouvel onglet
cd ../client  
npm install  
npm start  





