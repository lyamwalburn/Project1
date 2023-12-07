# Getting Started 

### `git clone https://github.com/lyamwalburn/Project1.git` - clone the repo to your device

When starting project for the first time run,
### `npm i` - to install dependancies

# Starting the application

### `npx json-server --watch data\db.json --port 8081` - runs the json-server for mock backend
### `npm start` - runs the react app

# Estate-Agent

Application for a mock estate agents website with CRUD operations the main features of the applicaiton are as follows.

    -Create Sellers, Buyers and Properties
    -Update Sellers, Buyers and Properties
    -Delete Sellers and Buyers
    -Create bookings for each property
    -Delete bookings for property
    -Search for properties based on given options


# Database Routes

###    BASE `http://localhost:8081` - fetches all data from json server
###    SELLERS: `http://localhost:8081/seller` - fetches data on sellers provide a `/:id` for a specific seller
###    BUYERS: `http://localhost:8081/buyer` - fetches all buyers provide a `/:id` for a specific buyer
###    PROPERTY: `http://localhost:8081/property` - fetches all properties provide a `/:id` for a specific property
###    BOOKING: `http://localhost:8081/booking` - fetches all bookigns provide a `/:id` for a specific booking


# Project Kanaban 

![alt text](https://github.com/lyamwalburn/Project1/tree/develop/estate-agent/src/img/project1-trello.png?)
