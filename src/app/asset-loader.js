/* eslint-disable */
const fs = require('fs');
const path = require('path');
/* eslint-enable */

var Assets = {};

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory());
}

function loadAssets() {
  console.log('Assets.base.tileRegistry');
  let dirs = [];
  dirs = getDirectories(path.join(__dirname, 'assets/'));

  if (dirs.indexOf('base') == -1) {
    throw 'BASE ASSETS NOT FOUND!';
  }

  for (var i = 0; i < dirs.length; i++) {
    Assets[dirs[i]] = {
      tileRegistry: JSON.parse(fs.readFileSync(path.join(__dirname, 'assets/' + dirs[i] + '/tile-registry.json')).toString())
    };
  }

  console.log(Assets.base.tileRegistry);
}

/* eslint-disable */
module.exports = {
  loadAssets: loadAssets
};