# Module-18-NoSQL-Challenge-Social-Network-API

## Description

This is a proof of concept for an API that a social media platform could use
to manage users, posts, and comments. (Here referred to as users, thoughts, and reactions).

[A video demonstration of the api functionality can be found here.](https://drive.google.com/file/d/1zvQyVeeEt5qTCfEXnldd_T00yJyhwifT/view?usp=sharing)

## Installation

- Download the source code
- Navigate to root
- Run ```npm install```

## Usage

- Navigate to root
- Run ```node server.js```
- Start making requests via Insomnia or your preferred method. 

## Technologies Used
- Javascript
- Node.js
- Express.js
- MongoDB
- Mongoose
- Day.js


## Lessons Learned

- Changes to arrays within Mongoose documents need to be saved or the database won't update accordingly. 
- Testing something like this, where you're constantly referencing the _ids that are created
when files are added to the DB is like pulling teeth. 
- Even if you define an ObjectId key in your schema, Mongoose will still create an _id field and treat that
as the one, true ID. 
