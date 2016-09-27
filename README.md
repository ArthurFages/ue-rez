# REZ P3 - The app you need

This project is a web application developped with NodeJS, Bower, Firebase and AngularJS. It is proposed for Arts et Métiers students in Paris, living in the school residence. It allows users to have news feed, every day life in paris tips, but also to interact with the students association.


## How to contribute

To get you started you can simply clone this repository and install the dependencies:

### Prerequisites

This app use a number of node.js tools to initialize and test ue-rez. You must have node.js and its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
angular-seed changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/index.html`.


## Development 

This app is still under development. What remaining to do is :
* configure administration authentication
* fill database with "real" information

## Components used

### AngularJS

You can find all informations about AngularJS at : https://angularjs.org/.

### Firebase

You can find all informations about Firebase at : https://firebase.google.com/docs/web/setup
This app is currently hosted at : https://ue-rez.firebaseapp.com/

## Contact

For more information on this project, please contact arthur.fages@gmail.com

