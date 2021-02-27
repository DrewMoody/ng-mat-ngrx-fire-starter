# NgMatNgrxFireStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.1.

## Setup

Convert Firebase credentials to your own.
1.) Set up your Firebase project. Go to the [Firebase Console](https://console.firebase.google.com/), click add project, follow prompts
2.) Select project as web type.
3.) Add Cloud Firestore or Realtime Database. This demo project uses Cloud Firestore. From Project overview, click "Cloud Firestore" from the menu on the left, then click "getting started" and follow prompts.
4.) Enable authentication. This project was created to allow allow only Google sign in, but your needs may differ.
5.) Return to project overview tab. Click the project, then click settings. Scroll down until you see the firebaseConfig object. Copy the contents of this object, then go to the `environment/` file configs and replace the `firebase` property of the config with your app's config.

## Considerations/Resources

[angular-cli-ghpages](https://www.npmjs.com/package/angular-cli-ghpages) can be used for quick and easy deployment to GitHub Pages.
[AngularFireAnalytics (already imported to app module)](https://github.com/angular/angularfire/blob/a26676c69790b9a236dbc08504db705f983bd8fc/docs/analytics/getting-started.md)

---

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
