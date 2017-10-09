[![Build Status](https://travis-ci.org/jack982/angular-white-paper.svg?branch=master)](https://travis-ci.org/jack982/angular-white-paper)

# Angular White Paper
An AngularJS Project template to speed up the bootstrap of your next Angular project with Browserify, SASS, Gulp and Karma.


## Installation

- git clone https://github.com/jack982/angular-white-paper myApp
- cd myApp
- npm install
- gulp

That's it! Now visit [http://localhost:8080](http://localhost:8080) and enjoy.

## What's in the box

A demo app that

  - uses Browserify to build the client code from the `src` to the `build` folder
  - uses **angular-ui-router** for the routing
  - uses **angular-translate** for pain-free i18n stuffs
  - uses **dotenv** to generate an Angular Module containing all your env variables as constants
  - uses **SASS** as pre processor
  - uses a **.jshintrc**
  - uses **Karma+Jasmine** for unit-testing
  - uses **Gulp** as build tool that does:
  	- sass conversion
  	- browserify-ing all the things
  	- jshinting your beautiful code
    - Karma unit testing your code
