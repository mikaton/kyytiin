# Kyytiin

## Nopea setup

### Tietokanta

Asenna MariaDB:n uusin versio ympäristöösi, configuroi mieleiseksisi. 

#### Node

Asenna [NodeJS LTS](https://nodejs.org/en/). 

### Muut

Asenna GIT jos ei jo asennettu

Tämän jälkeen kloonaa projekti GITistä ja aja `npm install`.  

### .env

Luo tiedosto nimeltä .env joka sisältää seuraavat rivit. Täytä vastaamaan omaa lokaalia ympäristöäsi. Mailerin passun saa Mikalta ':D'
+ DB_USER=
+ DB_PASSWORD=
+ DB_DATABASE=
+ DB_HOST=
+ DB_DIALECT=
+ PORT=3000
+ JWT_SECRET=
+ MAILER_USER=kyytiinapp.noreply@gmail.com
+ MAILER_PASSWORD=
+ MAILER_SERVICE_PROVIDER=Gmail

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `node server.js` or `nodemon server.js` for a dev webserver. If using the nodemon variant, the app will automatically reload if you change any of the source files.
## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run-script build` to build the project for production. The build artifacts will be stored in the `dist/` directory. 

Use `npm run-script shitbuild` to build the project for testing use. This version uses the local enviroment. The build artifacts will be stored in the `dist/` directory. 
## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

