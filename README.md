# Todo app
Simple todo tracker app.

## Introduction
Training project to practice frontend, backend and database development.  
Goal is to have a portfolio project that is growing in features over time.  

No tutorials were used, only documentations of technologies.

## Table of contents
* [Current features](#current-features)
* [Technologies](#technologies)
* [Setup](#setup)

## Current features
Tracks todos based on logged in user.

#### To do:
* Change design to be more appealing.
* Add a calendar to visualise when todos were completed.

## Technologies
* JavaScript
* TypeScript
* React
* Node.js
* Express.js
* MongoDB
* Mongoose
* TailwindCSS

## Setup
To run this project, please request login credentials to the database (mongodb).    
That should be entered inside the quotes of the 'public.env' file, backend folder.  
Then install and run it locally using npm.  

Project uses an npm package 'concurrently' and a custom script to run both frontend and backend in a single terminal window.

```
$ npm install
$ npm run dev
```
