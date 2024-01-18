# Getting Started 

### `git clone https://github.com/lyamwalburn/Project1.git` - clone the repo to your device

When starting project for the first time run,
### `npm i` - to install dependancies

# Starting the application

### `npx json-server data\db.json --port 8081` - runs the json-server for mock backend
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

![Alt text](https://github.com/lyamwalburn/Project1/tree/develop/estate-agent/src/img/project1-trello.png?)

# Planning

The project scope was broken down by the provided user stories which detailed the required funcationailty and a few stretch goals. From this I broke each part down into smaller steps as can be seen in the above kanban and worked through the higher priority tasks to reach a MVP state. This ensured that I could work on small iterative steps and still have a backlog of work should time allow.

This was coupled with a short daily standup with Toby where we discussed where we had got to on the previous day, any blockers and worked to help each other resolve these and then highlight what we intended to work on for the day. This was useful to help organise my thoughts for the day and keep the project on track.

# Challenges

As React is a new framework for myself I struggled to begin with to structure components in a way that was reuseable. This resulted in some chunks of time being spent on refactoring, when I found parts of the codebase that were identical or similar enough to turn into a single generic component such as the Usertable and UserForm for registering updating and creating both buyers and sellers. In future I think it would be wise to spend more time during the initial planning phase to highlight what aspects may be similar enough to have on single component that can be used in multiple places rather than revisiting to refactor.

The bookings system has also caused issues and while it currently works in its current state I do not feel that the logic has been coded in the best way. This was a stretch goal that I started later on in the weeks development and where I to repeat the project or a similar project I would take mroe time or move the more complex feature into the next sprint so it could have more focus from the begining in the initial plan as various other tasks got pushed to the side in favour of trying to simplify the code for this strech goal. Although having the project break and need to find a resolution definatley helped improve my understanding of both react and how I could improve my workflow moving forward.


# Future development 

Moving forward there are still several features I would have liked to add to this application such as 

- different property sale types such as rented properties
- locations for the properties on googlemaps or similar
- location filtering for properties to be foudn in an area
- image upload for property creation
- multiple images for each property with a pinned image for the card
- user logins and accounts so different estate agents could manage their own sellers/ buyers
- css tweaks and polish such as animations and a less bootstrap style
- clear up tech debt within the booking system as highlighted in the challanges
- disabled inputs when only viewing a sellers/ buyers information


The main lessons to take away from this project moving forward would be to plan out components and logic in a reuseable way from the begining rather than needing to refactor once completed. Time management on more complex features near the end of the sprint as I feel the booking system lead to a get it working by any means approach rather than the best way of creating it.




