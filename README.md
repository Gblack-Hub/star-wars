# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

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

The application has two pages:

1. Login Page
2. Dashboard / Search Page

### Login Page

The Login page requires the `name` and `birth year` of any Star Wars character as it's login credentials.
Once a user logs in, their login status is saved to the local storage to prevent subsequent login on every visit to the application. The user can however choose to logout on the search page.

You can make use of any of the listed credentials below to login to the application:

1.  Name: Luke Skywalker
    Birth Year: 19BBY

2.  Name: Luke Skywalker  
    Birth Year: 19BBY

### Dashboard / Search Page

This page contains a search box where users can search for any star wars character name or any planets. All search results will be displayed below the search box and if available, more data will be fetched as a user scrolls to the bottom of the page.

There is a "logout" button at the top right corner of the page. This function removes a user's logged in status from the local storage and directs them back to the login page.

## Tools and Good Practices implemented

1.  React-Router 6 was used for page routing purposes.

2.  Redux was used for state management. I prefer the use of React-Redux over context API because of its performance and scaling advantages.

3.  I used the Intersection Observer to handle infinite scrolling feature, instead of making use of a third party library.

4.  I made use of CSS module because it helps to avoid namespace collision, random CSS class generations, etc.

5.  I created a custom autocomplete component rather than using a third party library.

6.  I avoid using anonymous function throughout the application and opted for named functions instead, this helps in memory management because it prevents the allocation of new memory each time a component is re-rendered.

7.  The Application is responsive and fits the mobile, tablet, desktop and larger devices perfectly.
