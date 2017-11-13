# ELECTRON ANGULAR 4 BOILERPLATE
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()


## Dependencies
* nodejs: [https://nodejs.org/](https://nodejs.org/en/)
* electron: [https://electron.atom.io/](https://electron.atom.io/)
* angular4: [https://angular.io/](https://angular.io/)
* typescript: [https://webpack.github.io/](https://webpack.github.io/)
* lodash: [https://lodash.com/](https://lodash.com/)
* sass: [http://sass-lang.com/](http://sass-lang.com/)
* webpack: [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
* karma: [https://karma-runner.github.io](https://karma-runner.github.io/1.0/index.html)


## Installation
- install typescript globally `npm install -g typescript`
- install karma-cli globally `npm install -g karma-cli`
- install npm dependencies by running `npm install`


## Creating blueprints
- component : `npm run generate:component -- name-of-component`
- directive : `npm run generate:directive -- name-of-directive`
- pipe : `npm run generate:pipe -- name-of-pipe`
- service : `npm run generate:service -- name-of-service`


## How to Use
- run `npm start` it will listen to default http://localhost:8181
- run `npm run start:electron` it will start on electron application


## Testing
- run `npm test`
- run `npm run lint`


## Building Production
- run `npm run build`


## Building Package
- run `npm run package:linux`   -> for linux
- run `npm run package:win`     -> for windows
- run `npm run package:mac`     -> for mac


## Building Installers
- run `npm run create:installer-win`     -> for windows
- run `npm run create:installer-mac`     -> for mac