# Kanbasic
![Home Page](https://raw.githubusercontent.com/vncsreis/kanbasic/89764ce3886dc3197d16de21930f0e600bf8b46a/media/home.png)

A basic kanban board app. Manage multiple projects, with tasks on "to do", "doing" and "done". 

This app was built using React, Chakra UI, and Jest + React Testing Library for tests.

Animations that weren't provided by Chakra were made with CSS keyframes.


## How it works

All projects are saved on the browser's local storage.

Upon loading, it reads all entries that start with *"kanbasic-"*, and saves them on the application state. The projects on state are accessible through the menu.


Whenever a change to a project is made, it's saved on the browser's storage. No changes are lost when closing the app, or refreshing the page.

From there, just create the tasks for the project, and start working on them!

![Project Page](https://raw.githubusercontent.com/vncsreis/kanbasic/89764ce3886dc3197d16de21930f0e600bf8b46a/media/project.png)

## How to install

Clone the project - or download the source code - install the dependencies, and start the application.

```
git clone https://github.com/vncsreis/kanbasic.git
cd kanbasic

npm install
npm start
```
