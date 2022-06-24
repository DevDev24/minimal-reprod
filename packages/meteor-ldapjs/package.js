Package.describe({
  name: 'typ:ldapjs',
  version: '0.7.4',
  summary: 'Meteor package wrapper for the ldapjs Npm module https://www.npmjs.com/package/ldapjs',
  git: 'https://github.com/typ90/meteor-ldapjs',
  documentation: 'README.md'
});

Npm.depends({
  ldapjs: "2.3.1", 
});

Package.onUse(function (api) {

  api.addFiles([
    'lib/ldapjs.js',
  ], ['server']);
  
  api.export([
    'MeteorWrapperLdapjs'
  ]);
});