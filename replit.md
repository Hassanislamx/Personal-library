# Personal Library - Replit Setup

## Overview
This is a Personal Library web application built with Express.js that allows users to manage books and comments. It was imported from a FreeCodeCamp boilerplate project and configured to run in the Replit environment.

## Recent Changes (September 23, 2025)
- Configured server to run on port 5000 with 0.0.0.0 binding for Replit compatibility
- Implemented complete API functionality with in-memory storage for books and comments
- Set up Express workflow for development
- Configured deployment settings for autoscale deployment
- All API endpoints tested and working correctly

## Project Architecture
- **Backend**: Express.js server with RESTful API
- **Frontend**: HTML/CSS/JavaScript with jQuery
- **Storage**: In-memory storage (can be upgraded to database if needed)
- **Port**: 5000 (frontend accessible via Replit's proxy)

## API Endpoints
- GET /api/books - List all books
- POST /api/books - Add new book
- DELETE /api/books - Delete all books
- GET /api/books/:id - Get specific book with comments
- POST /api/books/:id - Add comment to book
- DELETE /api/books/:id - Delete specific book

## Setup
- Run `npm start` to start the development server
- Application accessible via Replit's web preview on port 5000
- Deployment configured for autoscale target

## Dependencies
- express, body-parser, cors, dotenv (server)
- chai, chai-http, mocha, zombie (testing)
- jQuery (frontend)