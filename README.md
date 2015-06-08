<p align="center">
  <img src="https://raw.githubusercontent.com/larsonjj/generator-pistacheo/master/docs/images/logo.png" />
</p>

# Pistacheo Generator [![Build Status](https://secure.travis-ci.org/larsonjj/generator-pistacheo.png?branch=master)](https://travis-ci.org/larsonjj/generator-pistacheo) [![NPM version](https://badge.fury.io/js/generator-pistacheo.png)](http://badge.fury.io/js/generator-pistacheo) [![Coverage Status](https://coveralls.io/repos/larsonjj/generator-pistacheo/badge.png)](https://coveralls.io/r/larsonjj/generator-pistacheo)

A Yeoman generator that scaffolds out Express API and Server applications.

# Table of Contents

- [What can I create with Pistacheo?](#what-can-i-create-with-pistacheo)
- [Getting Started](#getting-started)
- [Features](#features)
- [Grunt Workflow](#grunt-workflow)
- [Sub-Generators](#sub-generators)
- [Testing](#testing)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Release History](#release-history)
- [License](#license)

## What can I create with Pistacheo?
- Build out [Express](http://expressjs.com/) server applications using [Jade](http://jade-lang.com/) or [Swig](http://paularmstrong.github.io/swig/) templates.
- Create an [Express](http://expressjs.com/) API server application.

Check out the [features](#features) section to see everything this generator has to offer.

## Getting Started
This generator utilizes [Yeoman](http://yeoman.io/) and [Grunt](http://gruntjs.com/) to Scaffold out projects, automate tasks, and manage front-end dependencies respectively. If this is your first time here, it is recommended you [read about these tools](http://yeoman.io/learning/index.html) before proceeding.

### Installation
There are a few dependencies that this project relies on:

#### Node.js
Check to see if you already have Node installed. Do this by bringing up a terminal/command prompt and type `node -v`. If the response shows a version at or above `v0.12.x`, you are all set and can proceed to installing Yeoman, Grunt, and Bower. If you see an error and/or your version is too low, navigate to the [Node.js](http://nodejs.org/) website and install Node from there.

#### Yeoman, Grunt, & Bower
Once you have Node installed, make sure you have these tools by opening up a terminal/command prompt and entering following commands:

| Command  | Response
|---------- |:---------:
| `yo -v`  | at or above `v1.2.1`
| `grunt -V` | `grunt-cli` at or above `v0.1.10`

If you get any errors and/or you're version(s) are too low, you should run `npm install -g yo grunt-cli`. This will install both tools and update them to their latest versions.

#### Pistacheo
Now that you have all the needed dependencies, you can install this generator with the following command: `npm install -g generator-pistacheo`

That completes installation! So at this point you should have all the needed tools to start working Pistacheo.

### Usage
When starting a new project, you will want to: open up a terminal/command prompt, make a new directory, and navigate into it.

```
mkdir my-new-project && cd $_
```

then, run the Pistacheo generator.

```
yo pistacheo
```

Optionally, you can skip the automated installation of npm and bower packages by passing in `--skip-install`. The main reason to use this is if you have spotty/no internet connection, but would still like to generate your project.

```
yo pistacheo --skip-install
```

Follow all the prompts and choose what suits you most for the project you would like to create. When you finish with all of the prompts, your project scaffold will be created and all dependencies will be installed.

***NOTE: If you used the `--skip-install` option, no dependencies will have been installed. You will need to run `npm install && bower install` in your project's root directory in order to get started running automated tasks***

Now you can run:

- `grunt` for testing and building a production version of your site.
- `grunt serve` for previewing your site/app on a development server.
- `grunt serve:dist` for previewing a production version of your site/app.

You can learn more about what tasks are available in the [grunt tasks](#grunt-workflow) section.

> IMPORTANT: SVN users should choose the 'SVN' version control option when running the generator. Then be sure to run the `svn-init.sh` (Linux, OSX) or `svn-init.bat` (Window) script in order to correctly setup ignores for your project. These scripts will be located in the root of your project folder. It is recommended that you do this before committing any code.

Congratulations! You should now have successfully created a Pistacheo project and are ready to start building out your site/app.


## Features

### Included in every project
- Built in preview server with LiveReload
- [.editorconfig](http://editorconfig.org/) for consistent coding styles within text editors
- Automated build process that includes: compilation of preprocessors (Jade, Sass, etc), minification of CSS and HTML, uglification of Javascript, optimization of images, and processing of [usemin blocks](Usemin blocks)
- [Sourcemaps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) for JavaScript and Stylesheets (Except Stylus. [Waiting on PR](https://github.com/gruntjs/grunt-contrib-stylus/pull/121))
- JavaScript Linting with [ESLint](http://eslint.org//)

### Available Options

- Project/Site naming
- Default ignores for [Git](http://git-scm.com/) or [SVN](http://subversion.apache.org/)
- Stylesheets with [Less](http://lesscss.org/), [Sass](http://sass-lang.com/) (via [node-sass](https://github.com/andrew/node-sass)), or [Stylus](http://learnboost.github.io/stylus/)
- Modular JavaScript with [RequireJS](http://requirejs.org/) or [Browserify](http://browserify.org/). Can also just use Vanilla JS.
- JavaScript unit testing with [Jasmine](http://jasmine.github.io/) or [Mocha](http://visionmedia.github.io/mocha/) + [Chai](http://chaijs.com/)
- Test running with [Karma](http://karma-runner.github.io/0.12/index.html)


### Express Server Options

- Database support for:
  - [MySQL](http://www.mysql.com/), [PostgreSQL](http://www.postgresql.org/) using [Sequelize](http://sequelizejs.com/)
  - [MongoDB](http://www.mongodb.org/) using [Mongoose](http://mongoosejs.com/)
- Cookie Session Storage with [express-session](https://github.com/expressjs/session)
- Security with Paypal's [Lusca](https://github.com/krakenjs/lusca) module
- Jade, Swig server-side template rendering

## Grunt Workflow

### `grunt`
Runs both [`grunt test`](#grunt-test) and [`grunt build`](#grunt-build).

### `grunt serve`
Starts up a development server that watches files and automatically reloads them to the browser when a change is detected.

**Extra Task Target(s)**

|Tasks| Description
|---------|-------
|grunt serve:dist| runs [`grunt build`](#grunt-build) and starts up a server that loads the optimized files

***NOTE: you can add the `--allow-remote` option to any of these commands to allow remote devices on the same network to view your site/app***

### `grunt build`
Builds out an optimized site through compilation of preprocessors (Jade, Sass, etc), minification of CSS and HTML, uglification of Javascript, optimization of images, and processing of [usemin blocks](Usemin blocks). All files created from this task are put in the `{project root}/dist/` folder.

### `grunt test`
Runs ESLint and Karma to lint and run JavaScript tests, respectively.

**Extra Task Target(s)**

|Tasks| Description
|---------|-------
|grunt test:watch| runs [`grunt test`](#grunt-test), but also watches test files and auto runs tests when changes are detected.

***NOTE: you can add the `--allow-remote` option to any of these commands to allow remote devices on the same network to view/run your tests***

## Sub-Generators

* [pistacheo:api](#api)
* [pistacheo:page](#page)

***Note: Generators need to be run from the root directory of your app.***

### React

Creates React Component File.

Example:

```
yo pistacheo:react mycomponent
? Where would you like to create this react component?: client/scripts/components
? Where would you like to create this react component's test?: test/spec/components
```

Produces:

```
client/scripts/components/mycomponent.{jsx,js}
test/spec/components/mycomponent.spec.js
```

***NOTE: `{jsx,js}` means that the file extension will match the template engine you chose: `JSX` or just plain `JS`***

## Testing
To run unit tests, you have a couple options:

- `npm test`: This will run all unit tests with Mocha and send the report to [coveralls.io](http://coveralls.io) to be processed. (Don't run this for local testing)
- `npm run localtest`: This is the same as `npm test` only it doesn't send anything to coveralls.io. (Use this for local testing)
- `npm run localtest-report`: This is the same as `npm run localtest`, but it also generates an HTML report of the current code coverage.

## Roadmap
Check out the [Roadmap](ROADMAP.md) to see what's coming down the development pipeline.

## Contributing

Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md).

* [Bug reports](CONTRIBUTING.md#bugs)
* [Feature requests](CONTRIBUTING.md#features)
* [Pull requests](CONTRIBUTING.md#pull-requests)

## Release History

See [Changelog](https://github.com/larsonjj/generator-pistacheo/blob/master/CHANGELOG.md)

## License

[MIT License](LICENSE.md) - &copy; Jake Larson
