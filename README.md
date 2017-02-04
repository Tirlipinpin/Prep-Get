# Prep-Get
It's a simple apt-get with client and server.
Client in Python and server with Node.JS.

### Project
Started 31/01/17 !

### How To install server
```shell
> su
Password: ***********
> apt-get install -y curl
> curl -sL https://deb.nodesource.com/setup_7.x | su -c "bash -"
> apt-get install -y git nodejs mysql-server
MySQL password : root
Confirm password : root
> git clone https://github.com/Steve-Nzr/Prep-Get.git
Username for 'https://github.com': **********
Password for 'https://**********@github.com': ***************
> cd Prep-Get/Server
> mysql -u root -p
Enter password: root
> CREATE DATABASE prep_get;
> exit
> mysql -u root -p prep_get < config/db.sql
Enter password: root
> npm install && npm start
> exit
```
