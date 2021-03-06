// This allows us to compile es2015 and react JSX code on the fly.
// Anything that is required in after this point will be automatically compiled!
require('babel-register')({
  presets: ['es2015', 'react'],
});

require('./js/enzyme.js');
require('./js/redis');
require('./js/socketio');
require('./js/supertest');
