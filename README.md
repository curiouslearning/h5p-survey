#  H5P Survey

The `H5P Survey 1.0` is fork of our [`LearningAssessment 1.0`](https://github.com/OER-Dev/oer-h5p-dev/tree/dev/packages/LearningAssessment). It removes the answer checking, allowing use of the content type as a simple "pick 1 of X" form survey.

## Changes to the content type
* Changed references to "Learning Assessment" and "Quiz" to "Survey" to improve readability
* Removed Scoring and right/wrong feedback functionality

To load the icons we use [React](https://reactjs.org/) and its `render` function to render it into the container we want. React isn't used for anything other than this. This might seem a bit over the top at the moment but the long term goal is to replace more content with React components. More over it helps handle animations and SVG content in an easier way.

## Development
To run the library in development mode run the following commands from the library root:
* `npm install`
* `npm run dev`

Note that for the dev script here to work the [`dev`](../../dev/README.md) server needs to be running as well.

## Production
There are three different scripts used when building the library's production build. Remember to install the dependencies before running them with `npm install`.
* `npm run build-src`
    * Builds the frontend code and copies it into `H5P.Survey/`
* `npm run build-h5p`
    * Packages all the content of `H5P.Survey/` into a `.h5p` file named `survey` and puts it into the `dist/` folder. This file can be used to install the production build on any site that supports H5P content.
* `npm run build`
    * Runs both of the above scripts in sequence.

## xAPI events/coverage
* Answered question - triggered when
* Completed full quiz
* Interacted with question option - interacted with one of the answer options of a question.
* Interacted with "Success" or "Failed" button in endscreen.

## Prerequisites
Node >=v.14.7.x
npm >=v.6.14.x
WINDOWS ONLY: 7zip
Admin access to dev and production Wordpress environments.

## Generating a Production or Staging Build
Clone the repo from: https://github.com/curiouslearning/h5p-survey.git
From the top level directory run npm install
Run npm run build-src to build the source using Webpack
Run npm run windows-build-h5p to build an h5p file

## Uploading a Build to Production or Staging
Sign into the production/staging site’s wp-admin page
On the admin toolbar on the left hand side, select H5P Content > LIbraries
On the subsequent page, in the Upload LIbraries widget, select the “Choose File” radio button
Use the “Upload” button to upload and update the library on the server.

