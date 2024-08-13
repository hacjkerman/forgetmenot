# Forgetmenot

### *A Todo App for Procrastinators who like a bit of fun*

## 📄 Description
A task tracking web application that provides email and phone notifications (soon to be developed) to remind users of crucial to-dos.


## ⚙️ Requirements
Ensure you have the following software:
* git
* Node.js (v18 or later)
nvm is recommended to easily manage and install versions of node
* Docker and Docker-compose


## 🎮 Running Forgetmenot locally
Setup
Clone the repository using the commmand: git clone https://github.com/hacjkerman/forgetmenot.git

Running the app with Docker
cd into the project root directory
Run docker-compose up --build. The auth server should be accesible at localhost:4000. The todo server should be accessible at localhost:8080.

For everything to run smoothly, first follow the instructions listed out in .env.example files in authServer, frontend, and todoServer. 
Once completed, change the names of .env.example to .env and run

Then, to run the frontend locally
cd into the frontend directory
run npm install
then run npm run start.
The frontend should be accessible at localhost:3000.



## ⚖️ License

**forgetmenot** is generously distributed under the *[MIT](https://opensource.org/licenses/MIT)*.
