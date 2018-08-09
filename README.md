# HK Rain
# Angular2 Web application - application with ExpressJS, MongoDB, Gulp and Typescript

## Introduction

This is a web based application for forcasting the weather in Hong Kong.


## [http://www.hkrain.com/](http://www.hkrain.com/)

## System Architecture

## Front end
![Angular2 with typescript](https://www.etatvasoft.com/blog/wp-content/uploads/2017/09/angular4blog-image.png)

Front end: Angular 4 with typescript


## Back end

![node.js](https://upload.wikimedia.org/wikipedia/commons/7/7e/Node.js_logo_2015.svg)

Back end: node.js + express.js with restful web service

![MongoDB](https://upload.wikimedia.org/wikipedia/en/thumb/4/45/MongoDB-Logo.svg/527px-MongoDB-Logo.svg.png)

Database: MongoDB

## Prerequisites

Use unix as a server platform.
Install Ubuntu Server 16.04.1 LTS for server running.

1. Version of Node v6.9.1 to be installed.
2. Version of MongoDB v3.4 to be installed on default port 27017.

Install node.js
```
// install node.js
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get update
```
Install npm
```
// install npm
sudo apt-get install npm
sudo apt-get update
```
Install MongoDB
```
// install mongoDB
sudo apt install mongodb-server
sudo mkdir -p /data/db
```
## Install packages

```
    npm install          <= install all the npm Dependencies listed in package.json
    npm run build        <= build and compile 
    npm run deploy       <= start the Nodemon and watch for changes.
```

## Directory Structure

```
    HK Rain
    ├── node_modules
    ├── client                  <= Angular 2
    │    ├── app
    │    │    ├── Components
    │    │    │    ├── calculateWeather
    │    │    │    │    ├── calculateWeather.component.css
    │    │    │    │    ├── calculateWeather.component.html
    │    │    │    │    ├── calculateWeather.component.ts
    │    │    │    ├── weatherForecast
    │    │    │    │    ├── weatherForecast-detail.component.css
    │    │    │    │    ├── weatherForecast-detail.component.html
    │    │    │    │    ├── weatherForecast-detail.component.ts    
    │    │    │    ├── ...
    │    │    │    │    ├── ...
    │    │    ├── models
    │    │    │    ├── ResultWeather.ts
    │    │    │    ├── Forecast.ts
    │    │    │    ├── ...
    │    │    ├── services
    │    │    │    ├── weather.service.ts            <= API service
    │    │    │    ├── forecast.service.ts           <= API service
    │    │    │    ├── ...
    │    │    ├── app.component.css
    │    │    ├── app.component.ts
    │    │    ├── app.html
    │    │    ├── app.module.ts
    │    │    ├── app.routing.ts
    │    │    ├── main.ts
    │    ├── typings
    │    ├── index.html
    │    │    ├── systemjs.config.js
    │    ├── tsconfig.json
    │    ├── typings.json
    ├── server
    │    ├── src
    │    │    ├── app
    │    │    │    ├── cron
    │    │    │    │    ├── Cron                  <= Cron job for getting the data from HKO
    │    │    │    ├── dataAccess
    │    │    │    │    ├── schemas
    │    │    │    │    │    ├── WeatherSchema.ts    <= Weather Schema for MongoDB
    │    │    │    │    │    ├── ...
    │    │    │    │    ├── DataAccess.ts         <= Connection with MongoDB
    │    │    │    ├── model
    │    │    │    │    ├── interfaces
    │    │    │    │    │    ├── WeatherModel.ts
    │    │    │    │    │    ├── ...
    │    │    │    │    ├── WeatherModel.ts
    │    │    │    │    ├── ...
    │    │    │    ├── repository
    │    │    │    │    ├── interfaces
    │    │    │    │    │    ├── Read.ts
    │    │    │    │    │    ├── Write.ts
    │    │    │    │    ├── WeatherRepository.ts
    │    │    │    │    ├── ForecastRepository.ts
    │    │    │    │    ├── ...
    │    │    ├── config
    │    │    │    ├── constants
    │    │    │    │    ├── constants.ts         <= Constants - mongodb connection string.
    │    │    │    ├── routes
    │    │    │    │    ├── WeatherRoutes.ts     <= Weather API Routes like get,post,put,delete
    │    │    │    │    ├── Routes.ts            <= fetching all appliction routes here
    │    │    │    │    ├── ...            
    │    │    ├── controller
    │    │    │    ├── interfaces
    │    │    │    │    ├── ReadController.ts
    │    │    │    │    ├── WriteController.ts
    │    │    │    ├── WeatherController.ts         <= Base controller
    │    │    │    ├── ForecastController.ts
    │    │    │    ├── ...
    │    │    ├── server.ts
    │    ├── typings
    │    ├── tsconfig.json
    │    ├── typings.json
    ├── gulpfile.ts                              <= gulp tasks : clean, build, compile, run.
    ├── LICENSE
    ├── package.json
    ├── README.md
    ├── tsconfig.json
    ├── tslint.json
```


## Api Document (from MongoDB)

```
1. getAllWeather    http://localhost:3000/api/getAllWeather          
2. getForecast      http://localhost:3000/api/getForecast     
3. ...  

```


## License

MIT
