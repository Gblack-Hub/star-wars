# Getting Started with SWAPI Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
YARN or NPM is required to serve this project in development.

## SET UP INSTRUCTIONS

1. Clone or download this repository.
2. Inside the root folder of the downloaded/cloned project, run `yarn`. This will install all the needed dependencies for the project to run in development.
3. Run `yarn start` to start the project.

## Other Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## PROJECT IMPLEMENTATION DETAILS

This is a simple searching application that makes use of the SWAPI resource (​https://swapi.co/​) to display information about all Star Wars related content.

The application has three pages:

1. Login Page
2. Search Page
3. Search Results Page

### Login Page

The Login page requires the `name` and `birth year` of any Star Wars character as it's login credentials.
Once a user logs in, their login status is saved to the local storage to prevent subsequent login on every visit to the application. The user can however choose to logout on the search page.

You can make use of any of the listed credentials below to login to the application:

1.  Name: Luke Skywalker  
    Birth Year: 19BBY
2.  Name: C-3PO  
    Birth Year: 112BBY
3.  Name: R2-D2
    Birth Year: 33BBY
4.  Name: Darth Vader
    Birth Year: 41.9BBY
5.  Name: Leia Organa
    Birth Year: 19BBY
6.  Name: Owen Lars
    Birth Year: 52BBY
7.  Name: Beru Whitesun lars
    Birth Year: 47BBY
8.  Name: R5-D4
    Birth Year: unknown
9.  Name: Biggs Darklighter
    Birth Year: 24BBY
10. Name: Obi-Wan Kenobi
    Birth Year: 57BBY
11. Name: Obi-Wan Kenobi
    Birth Year: 57BBY

### Search Page

This page contains a search box where users can search for any star wars character name or any planets.

There is a "logout" button at the top right corner of the page. This function removes a user's logged in status from the local storage and directs them back to the login page.

### Search Results Page

This page contains the results of the search term inputted in the search screen and if available, more data will be fetched as a user scrolls to the bottom of the page.

## Tools and Good Practices implemented

1.  React-Router 6 was used for page routing purposes.

2.  Redux was used for state management. I prefer the use of React-Redux over context API because of its performance and scaling advantages.

3.  I used the Intersection Observer to handle infinite scrolling feature, instead of making use of a third party library so to reduce bundle size.

4.  I made use of CSS module because it helps to avoid namespace collision, random CSS class generations, etc.

5.  I created a custom autocomplete component rather than using a third party library to also reduce bundle size.

6.  Adequate form validation on the frontend is implemented to avoid unnecessary request to the server.

7.  I avoided using anonymous function throughout the application and opted for named functions instead, this helps in memory management because it prevents the allocation of new memory each time a component is re-rendered.

8.  The Application is responsive and fits the mobile, tablet, desktop and larger devices perfectly.
