# Tiny URL Inscale
 
A user service application replacing an arbitrary length URL address with a short one..<br/>

## Introduction

In this project I implemented the backend of the familiar app - tiny url.<br/>
In order to maximize the ability of each service i use the microservice methodology and use Docker to run the images on containers.<br/>

The microservices descriptiens:<br/>

Api module - The only server that is exposed to the world.<br/>
On local enviroment in host: `localhost:3001`<br/>
On production enviroment In  host: `ec2-3-127-150-52.eu-central-1.compute.amazonaws.com:80`<br/>

User Service module - server that expose post and get http methods.<br/>
post: create new user and insert it to mySql database.<br/>
get: get the user properties from mySql database.<br/>

Url service module - server that expose post and get http methods.<br/>
post: create new short url from given long url, and insert them in to mySql database.<br/>
get: get Url from givan short url, resive the data from mySql database.<br/>

Authentication module - server that used for sign up and log in flows, and validation user Token.<br/>

Email consumer module - microservice that use to consume data from SQS.
i.e. user email, in order to send "sign up welcome email" for the new user.<br/>

Deploy service module - server that listening on port:3456 for http post request wich send from Github-Action.
It compite the CI/CD flow, while i pushed to the github repo using `ci.yml` file to build the images and push them
in to docker-hub. while the server get post request he pull the images from docker-hub and run all the containers
together using docker-compose with the correct enviroment virobles for deploying. 

## Dependencies

In this project I used Docker to run the images on containers, so make sure you have a version of docker installed on your computer.<br/>
Use this link [Docker](https://docs.docker.com/get-docker/) to install Docker.<br/>

In order to manage all the microservices together we will use Docker Compose. <br/>
It is a tool for running multi-container applications on Docker, defined in `docker-compose.yml` file.<br/>
Use this link [Docker Compose](https://docs.docker.com/compose/install/) to install Docker Compose.<br/>

Run the following MakeFile Scripts to run the project localy:<br/>

## installation

run: `make install_dependencies`  <br/>

will ruh the folowing npm commands:<br/>
npm i -g recursive-install - Takes the tree files and checks for package.json in every folder and runs npm in every folder.<br/>
npm-recursive-install --skip-root - Skip the root package.json install.<br/>
npm install -g typescript - Installation typescript globally on the computer with `tsc` command.<br/>

## instructions

run: `make build_and_deploy`  <br/>

will run the following scripts:<br/>
1) sh build.sh - run script for each microservic.  <br/>
    * first, transcompil each source code from typescript to javascript, `tsc`.<br/>
    * second, build the images from the source code using the Dockerfile, i.e. `docker build -t amiradar/tiny-url.api .`<br/>
2) docker-compose up<br/>
    * look for `docker-compose.yml` and run the images on containers and manage them together, and wait for http reqest on localhost, port 3001: `http://localhost:3001` <br/>
   

## Api Documentations:

There are 4 main flows to the project.<br/>
1) sign up<br/>
2) log in<br/>
3) create url<br/>
4) get public/ private - url <br/>


For each flow there is an http request which execute the API.<br/>

In order to make the http request you can use the Postman app or vsCode extension and check `request.rest`.<br/>

### Sign up flow:

![image](https://user-images.githubusercontent.com/44618095/110481045-cf656580-80ef-11eb-884f-b71bfb273639.png)

--- 

### Log in flow:

![image](https://user-images.githubusercontent.com/44618095/110477145-7c89af00-80eb-11eb-8792-6959a2fc3c7b.png)

---

### Create new url flow:

![image](https://user-images.githubusercontent.com/44618095/110480053-b9a37080-80ee-11eb-9703-97bce641d366.png)

---

### Get public url flow:

![image](https://user-images.githubusercontent.com/44618095/110488270-fecba080-80f6-11eb-9b69-add3ca38ec59.png)

---

### Get private url flow:

![image](https://user-images.githubusercontent.com/44618095/110485742-a2678180-80f4-11eb-84e4-e2b43cdcb874.png)

---

## Testing:
You can unitest the modules of the project and spyies methods by `Jest` framework. <br/>
I create mokes and stubs by `Sinon` library, in order to stub the database module, httpClient module, and more.<br/>

For testing the modues pick module (UrlService, UserService, Authentication) go to his sorce code and run: <br/>
`npm test`<br/>

this command will run the `Jest` testing framework.<br/>

