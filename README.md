# BS-Homework

## What's it all about?
This assignment is all about testing three simple endpoints with Playwright + Typescript, which are containerized
with Docker. Everything should be running on a CI and there should be a report on the test run available. 

### Build a Simple API
#### Develop a REST API with three endpoints:
- POST /create/withdrawal – Creates a withdrawal transaction for a given asset.
- POST /create/deposit – Creates a deposit transaction for a given asset.
- GET /balance – Retrieves the current account balance for a given asset and UserId

### Write Automation Tests
- Implement automated tests to validate the API's behavior using Playwright with TypeScript.
- Add to Docker
### Containerize the API and the test suite using Docker.
### Build & Run Tests in a CI/CD Pipeline
### Set up a CI/CD pipeline to:
- Build and Run the automated tests
- Provide a report on the testrun

### How is this project structured?
 - app.js: the file that contains the code for the three endpoints
 - package.json, package-lock.json, playwright.config.ts: project configuration files
 - Dockerfile, Dockerfile.playwright, docker-compose.yml: Files needed for containerization
 - tests folder: all the tests are stored here
 - .github/workflows: ci.yml file needed for CI

### Prerequisites
 - Node v22
 - Docker for Desktop with Docker Compose
 - IDE of your choice

### How to run tests locally
You can run tests locally in two ways. 
1. Directly with Playwright command: `npx Playwright test`

(In this case you need to start the app with command: `node app.js`, otherwise it will not work.)

2. Or you can run the app and tests with docker compose by running the command:
`docker compose up --build`  

(in this case do not run the app with command `node app.js`, otherwise you will get an error that the port is already in use)

### Continuous integration
When you create a branch and push the changes to the repo, GHA CI will automatically be started and it will run the tests
by invoking docker compose. 

### Reports
Still work in progress. Currently there is no pretty report of test run. 
