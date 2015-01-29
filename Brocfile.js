/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

var compileSass = require('broccoli-sass');
var mergeTrees = require('broccoli-merge-trees');

var sassSources = [
  'app/styles'
]

var appCss = compileSass( sassSources , 'app.scss', 'assets/app.css');
var appAndCustomDependencies = mergeTrees([app.toTree(),appCss], {
  overwrite: true
});
// EXPORT ALL THE THINGS!
module.exports = appAndCustomDependencies;