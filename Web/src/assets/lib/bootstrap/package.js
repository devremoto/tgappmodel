// package metadata file for Meteor.js

/* jshint strict:false */
/* global Package:true */

Package.describe({
  name: 'twbs:bootstrap',  // http://atmospherejs.com/twbs/bootstrap
  summary: 'The most popular front-end framework for developing responsive, mobile first projects on the web.',
  version: '3.3.7',
  git: 'https://github.com/twbs/bootstrap.git'
});

Package.onUse(function (api) {
  Api.versionsFrom('METEOR@1.0');
  Api.use('jquery', 'client');
  var assets = [
    'dist/fonts/glyphicons-halflings-regular.eot',
    'dist/fonts/glyphicons-halflings-regular.svg',
    'dist/fonts/glyphicons-halflings-regular.ttf',
    'dist/fonts/glyphicons-halflings-regular.woff',
    'dist/fonts/glyphicons-halflings-regular.woff2'
  ];
  if (Api.addAssets) {
    Api.addAssets(assets, 'client');
  } else {
    Api.addFiles(assets, 'client', { isAsset: true });
  }
  Api.addFiles([
    'dist/css/bootstrap.css',
    'dist/js/bootstrap.js'
  ], 'client');
});
