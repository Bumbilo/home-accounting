# HomeAccounting


## Table of Contents

* [Download](#download)
* [Project structure](#structure)
* [Back-end](#back-end)
   * [Technology stack](#be-technology-stack)
   * [Development server](#dev-server)
* [Front-end](#font-end)
   * [Technology stack](#be-technology-stack)



### Download 
<a name="download"></a>
Clone project from git:
```sh
https://github.com/Bumbilo/home-accounting.git
```

### Project structure
<a name="structure"></a>
Project contains two sub-projects for back-end and front-end sources. Front-end sub-project contains two modules for website and administration panel sources.
```sh
angular-project/
|----design        // Folder with design project
|----e2e           // Tests files
|----node_modules  // Source libraries
|----src/          // This is the root folder, and it contains all the project files
|     |--app/      // This folder contains the Angular code files
|     |--asset/
|     |--enviroments/
|     |--index.html
|     |--main.ts
|     |--polyfills.ts
|     |--styles.sass
|     |--test.ts
|     |--tsconfig.app.json
|     |--tsconfig.spec.json
|     |--typings.d.ts
|----.angular-cli.json
|----.editorconfig
|----.gitignore
|----karma.conf.js
|----package.json   // This file used by NPM for its configuration file
|----package-lock.json
|----protractor.conf.js
|----README.md
|----tsconfig.json
|----tslint.json
```

## Back-end
<a name="back-end"></a>

### (Back-end) Technology stack
<a name="be-technology-stack"></a>

| Category  | Technology    |
| --------- | ------------- | 
| Language  | Node.js       |
| Framework | Express       |
| Database  | MongoDB       |
| Testing   | Mocha, Zombie |


## Front-end
<a name="front-end"></a>

### (Front-end) Technology stack
<a name="fe-technology-stack"></a>

| Category  | Technology                           |
| --------- | ------------------------------------ |
| Language  | JavaScript, TypeScript               |
| Framework | AngularJS 2                          |
| Libraries |                                	     |
| Testing   | Karma                                |
| Building  | ngCLI                                |
| Server    | Webpack-dev-server, http-server      |

## Development server
<a name="dev-server"></a>
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.4.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
