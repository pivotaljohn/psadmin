"use strict";

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var AuthorActions = require('./components/authors/authorActions');

AuthorActions.init();

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.getElementById('app'));
});
