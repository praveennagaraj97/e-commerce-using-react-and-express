# Lexa

[![Node|React|Apollo|MongoDB|Express](https://i.imgur.com/EaBcbef.jpg)]()

[Lexa live](https://lexa.netlify.app/)

Lexa is an E-Commerce based C2C web application built using nodejs and reactjs

- BE - ExpressJS, GraphQL
- FE - React-Redux, Apollo
- Storage and deployement - GCP, EC2

# New features

- This application doesn't make unnecessary api calls. The application catches the most re-occuring requests and serves the re-occured requests from store , without making a new api call! .To reduce the load balance of store the application uses queue system to store the data - by popping out old ones, when the set limit reaches .
- For the user authentication - the application makes use of ES6 generators(redux-saga) to handle the validation process by not requesting api for simple auth checks !.
- The application is designed with non - fatty action-creators , all the actions that are dispatched throughout the application are just plain object with no async logic inside them(which makes the action triggering delayed)!.
- The application is also fully-responsive , the styles for the application are manually coded with the help of sass. The app has different designs for - phones, iPad and desktops.

And also:

- The api is available in both graphQL and REST version.
- The api is documented with postman App
- The api documention can be accessed via this repo under [docs](https://github.com/praveenNagaraj97-au7/Lexa/tree/master/Docs/API) section where each endpoint is explained with examaple I/O which helps in building frontend.

  - [✔] collection https://www.getpostman.com/collections/36831846ccaff2ca5659.

  > The GraphQL version of the application is deployed on EC2 with nginx proxy .
  > The Restful version is deployed on google app engine and heroku.

### Tech

This application uses a number of open source projects /packages to work properly:

- [ReactJS] - JS library to build interactive elements on website!
- [Redux] - To maintain state of application.
- [Apollo] - For graphql implementation
- [Redux-saga] - To handle async data fetching, access browser cache and side effects.
- [React-Query] - New hook to handle data fetching for protected routes (replica of gql-query)
- [Redux-persist] - To maintain state of application even after refresh(Note: the state is encrypted even though user data is not persisted).
- [Redux-form] - To handle forms data.
- [Node js] - evented I/O for the backend
- [Express Js] - fast node.js network app framework
- [GCP] - To store data objects / files.
- [MongoDB] - To store data of the application.
- [Axios] - To handle fetching XHR and HTTP requests.
- [Babel] - to compile es6 to es5.
- [SendGrid] - for mailing service.
- [JWT] for secured auth tokens.

### Installation

Lexa requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ yarn
$ yarn start-dev
```

For production environments...

```sh
$ yarn build
$ yarn start
```

### Todos

- Write Tests
- Add Light Mode

## License

MIT

**Free Software, Hell Yeah!**
