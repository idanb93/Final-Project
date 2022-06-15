# Link

https://pi-guard.herokuapp.com/

# Synopsis

In this project I built a full-stack application - Management System for Security Teams to scan their code repositories for sensitive information(access token, api keys, passwords)
configuration errors, and poor code practices. I used Github API to get the content of the files in the repositories, parsed it from Base-64 and searched for specific patterns using Regex.

I used JavaScript, Node.js, Express.js, JWT to handle users sessions, React.js, Redux.js, PostgreSQL. The entire application is deployed on Heroku.

## Goals

- learn how to interact with an external API (Github).
- learn how to architect the server-side the right way (Router --> Business Logic --> Data Access Layer --> Data Type) so it will be easier to add features and grow the project.
- learn about the pros of using a front-end framework(React), Divide into small components, Components hierarchy, States, Props, Hooks. 

## Motivation

During the project I experimented with the following:

- Experienced in building a scalable server-side code with express router.
- Experinced with React, Components, States, Hooks.
- Experinced with a state management Redux, Connecting the different components to the store and updating the store.
