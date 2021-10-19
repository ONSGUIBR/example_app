# example_app

This example app is built using the following tech stacks:
- **Front-End:** EJS (basically html) with bootstrap, css for styling.
- **Back-End:** Express
- **Database:** MongoDB

## Getting Started

First you need to clone this repo in your machine using the following command 

```
git clone https://github.com/ONSGUIBR/example_app.git
cd example_app
```

Next, we want to install dependencies.

```
npm install
```

And to run this app

```
npm start dev
```

## Walkthrough (Folders)

- models: This is where the database schema is located
- node_models: No need to worry about this, this folder is where all the package we installed using "npm install"
- params: The link to the database.
- public: Where all the images, stylesheets and scripts are located
    - images: images
    - stylesheets: css
    - scripts: ajax scripts
- routes: This is where most of the backend codes is located
    - api: No need to worry about this folder
    - web: This is where we do most of the back-end stuff (update database and link routing)
- views: Front-end files (EJS)
- app.js: This is the main js file where we initialize the web app
- package.json: List of all the packages used to build this web app
