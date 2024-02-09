# Agreena Test

This project consists of testing the **Swagger PetStore** API endpoints, as specified in the test description.

---

## Project Setup & Execution

Please go through the following steps to start the project.

### 1. Pre-Requirements
The project was created on **`MacOS`** having following javascript runtime system and browser version.

- Node.js `v18.13.0`
- npm `v8.19.3`
- Cypress `v10.11.0`
- Electron `v106`


### 2. Initialisation

You need to run `npm i` in root directory of the folder to install all the required libraries for the project. 


### 3. Execution

The project is configured against the endpoints provided by, `https://petstore.swagger.io/v2`.

Please run `npm run cy:open` in root directory to start the cypress project. This will open the Cypress control panel in **Electron**. From here you can click on any of the test to start the execution of that test. You can also run `npx cypress open --e2e`, if you want to use another browser.

---