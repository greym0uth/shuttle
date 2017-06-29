/* eslint-disable */
const fs = require('fs');
const path = require('path');
const assetsFolder = path.join(__dirname, 'assets/');
/* eslint-enable */

var Assets = {};

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory());
}

function loadAssets() {
  let dirs = [];
  dirs = getDirectories(assetsFolder);

  if (dirs.indexOf('base') == -1) {
    throw 'BASE ASSETS NOT FOUND!';
  }

  var mods = walkFoldersOfPath(assetsFolder);

  console.log(mods);

  for (var i = 0; i < dirs.length; i++) {
    let assetdirs = getDirectories(path.join(assetsFolder, dirs[i] + '/'));
    Assets[dirs[i]] = {};
    Assets[dirs[i]].manifest = JSON.parse(fs.readFileSync(path.join(assetsFolder, dirs[i] + '/manifest.json')).toString());
  }

  //console.log(Assets.base.manifest);
}

function walkFoldersOfPath(folder){
  let assetObject = {};
  let dirs = getDirectories(folder);
  for(let i = 0; i < dirs.length; i++){
    assetObject[dirs[i]] = Object();
    assetObject[dirs[i]] = walkFoldersOfPath(path.join(folder, dirs[i] + '/'));
  }
  return assetObject;
}

/* eslint-disable */
module.exports = {
  loadAssets: loadAssets
};
