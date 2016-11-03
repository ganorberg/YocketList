'use strict';

// This allows us to compile es2015 and react JSX code on the fly.
// Anything that is required in after this point will be automatically compiled!
require('babel-register')({
  presets: ['es2015', 'airbnb', 'react'],
  plugins: ["transform-class-properties"]
});
require('isomorphic-fetch');
require('./js/enzyme');
// require('./js/redis');
// require('./js/socketio');
// require('./js/supertest');

// Pulled from Airbnb example to use jsdom headless browser
const jsdom = require('jsdom').jsdom;
const exposedProperties = ['window', 'navigator', 'document'];
global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
// global.window = document.parentWindow;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
  exposedProperties.push(property);
  global[property] = document.defaultView[property];
  }
});
global.navigator = {
  userAgent: 'node.js'
};