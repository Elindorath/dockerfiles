#!/usr/bin/env node

'use strict';

var fs = require('fs');
var path = require('path');
// var parser = require('docker-file-parser');
var parser = require('./dockerfile-parser.js');

if (!process.argv[2]) {
  console.log('error: missing dockerfile path');
  console.log('usage: ./dockerfile2prod path');
  process.exit(1);
}

var dockerfilePath = path.resolve(__dirname, process.argv[2], 'Dockerfile');

var dockerfile = fs.readFileSync(dockerfilePath, {
  encoding: 'utf-8',
});

var commands = parser.parse(dockerfile, {
  includeComments: false,
});
