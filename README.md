# Civil Loan
## A Loan application website

A full stack web application which uses REST API to establish RESTful services. The application is basically a CRUD application where 
user can create their profiles, read the required data from database, update the data if needed and delete their profile or loan application.

## Services
* The application can receive a loan request from user and store it in a database
* It provides sign-up and login features for the users to manage their loan requests and profile
* It provides a internal EMI calculator to check the EMI amount before applying for a loan

## Tech Stack
* Front end - ReactJS, Bootstrap
* Back end - ExpressJS
* Database - MongoDB

## Installation Steps
* Clone or Extract the raw file of the repository
* Create a MongoDB collection and name it as 'civil-loan'
* Open a terminal and change the directory to the folder in which the repository is located and type the following commands
* `cd server`
* `npm run start`
* Open another terminal and type the following commands
* `cd client`
* `npm run start`
* At localhost:3000 the React Application is served.
  
## Known issues
* update feature is not developed
* All the data is stored only in a local database

The above issues are solved and a better version will be contributed soon.
