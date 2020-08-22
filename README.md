# SmitchProject
Smitch Backend assignment

## Pre-Requisites
- Node.js should be installed on your system
- MongoDB should be installed on your system

## How to install?
- Download the code as a zip file or clone this repository.
- Go into folder **SmitchProject**
- run the command `npm start`
- this will make your server start at port 3000

## How to use?
These steps will guide you about how to use this project:

First install a Rest client to use all the functionalities of this project.

Recommended : Advanced Rest Client or Postman.

#### 1. User Signup:
- link : `http://localhost:3000/users/signup`
- Json : `{ "email" : "abc@xyz.com", "password" : "1234567"}`
- It will generate a **token** in response, please save it as it will be used further.

#### 2. User login:
- link : `http://localhost:3000/users/login`
- Json : `{ "email" : "abc@xyz.com", "password" : "1234567"}`
- It will generate a **token** in response, please save it as it will be used further.

#### 3. Device Creation:
- link : `http://localhost:3000/device/create`
- Json : `{ "name" : "deviceName", "devType" : "AA", "token": "Token that got generated during signup or Login."}`

#### 4. Device Updation:
- link : `http://localhost:3000/device/edit`
- Json : `{ "name" : "deviceName", "devType" : "BB", "token": "Token that got generated during signup or Login."}`

#### 5. Devices reading:
- link : `http://localhost:3000/device/read`
- Json : `{"token": "Token that got generated during signup or Login."}`

#### 6. Device Deletion:
- link : `http://localhost:3000/device/delete`
- Json : `{ "name" : "deviceName", "token": "Token that got generated during signup or Login."}`

#### 7. Device ON/OFF:
- link : `http://localhost:3000/device/currentState`
- Json : `{ "name" : "deviceName", "token": "Token that got generated during signup or Login."}`

#### 8. Device sharing:
- link : `http://localhost:3000/device/share`
- Json : `{ "name" : "deviceName", "email" : "User email with whom you want to share your device", "token": "Token that got generated during signup or Login."}`

**_To Check results in MongoDB use database `dbusers` in it see the collections with name `users` and `devices`_**
